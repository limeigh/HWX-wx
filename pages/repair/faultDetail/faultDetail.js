var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var app = getApp()

Page({
  data: {
    //下单流程
    faultId: null,  //故障id
    faultName: null, //故障大类名
    colorList:[],//颜色选项
    planList: [],//普通(保外)维修方案选项
    protectPlanList:[],//保内维修方案选项
    optionList:[],//保内保外选项
    mouldName: null, //设备名称
    markInfo: null, //故障说明
    mouldInfo: null, //已选设备(hi维修数据)
    selectedColor: null, //已选颜色
    selectedPlan: null, //已选方案
    selectedOption:null, //已选保障状态
    //详情+评论
    detailUrl: null, //详情链接
    commentList: [],//评论列表
    currentPage: 1, //默认第一页
    totalPages: 1,  //总页数
	},

  onLoad:function(options){
    this.setData({
      faultId:options.id,
      faultName:options.name
    })
    //获取用户评论
    this.getComment();
  },

  onShow:function(){
    try{
      //先检查缓存里是否有已选机型
      var selectedDevice = wx.getStorageSync(config.storageKeys.selectedDevice);
      if(selectedDevice != null && selectedDevice!=""){
        this.setData({
          mouldInfo:selectedDevice,
          mouldName:selectedDevice.MouldName,
        })
        this.onDeviceSelected();
      }else{
        //如无缓存已选机型，且当前机型为空，则获取本机设备数据
        if(this.data.mouldInfo == null || this.data.mouldName == null){
          this.getDeviceInfo();//获取设备信息(hi维修数据)
        }
      }
    }catch(e){
      console.log(e);
    }
  },
  
  //获取本机机型信息
  getDeviceInfo:function(){
    var that = this
    if (app.globalData.deviceInfo != null) {//若微信获取的model不为空，获取机型数据
      if(app.globalData.hwxDeviceInfo != null){//如果有缓存的hi维修机型数据，直接返回缓存
          this.setData({
            mouldInfo:app.globalData.hwxDeviceInfo,
            mouldName:app.globalData.deviceInfo.model
          })
          that.onDeviceSelected();
      }else{
        //没有hi维修机型数据缓存，则请求接口
        httpTool.getDeviceInfo(app.globalData.deviceInfo.model,function(data){
          that.setData({
            mouldInfo:data,
            mouldName:app.globalData.deviceInfo.model
          })
          app.setDeviceInfo(data);//缓存本机hi维修数据
          that.onDeviceSelected();
        },function(msg){
          wx.showToast({
            title: msg,
          });
        });
      }
    } else {
      //否则直接提示手动选择
      wx.showToast({
        title: '获取本机机型失败，请手动选择',
      });
    }
  },
  
  //切换机型时，需要重置的数据
  onDeviceSelected:function(){
    console.log("onDeviceSelected");
    this.setData({
      colorList:[],
      planList: [],
      protectPlanList:[],
      optionList:[],
      selectedColor: null, 
      selectedPlan: null, 
      selectedOption:null, 
    })
    this.getColors();//重新获取颜色
    this.getOptions();//重新获取选项
  },
  
  //获取颜色选项
  getColors:function(){
    var that = this
    httpTool.getColors.call(that,that.data.faultId,that.data.mouldInfo.Id,function(data){
        that.setData({
          colorList:data
        })
        if(data.length > 0){
          that.setData({
            selectedColor:data[0]
          })
          that.getRepairMsg();//直接请求维修方案
        }
    },function(msg){
        wx.showModal({
          title: "获取颜色选项失败，点击重试",
          content: msg,
          showCancel: false,
          confirmText: "重试",
          success: function(res) {
            if (res.confirm) {
              that.getColors();
            }
          }
        })
    });
  },
  
  //获取保内外选项
  getOptions:function(){
    var that = this;
    httpTool.getWarrantyOption.call(that,that.data.mouldInfo.Id,function(data){
      that.setData({
        optionList:data
      })
      //默认选中第一个
      if(that.data.optionList.length > 0){
        that.setData({
          selectedOption:that.data.optionList[0], //Id=1 保外， Id=2 保内
        })
      }
    },function(msg){
      wx.showModal({
          title: "获取保修选项失败，点击重试",
          content: msg,
          showCancel: false,
          confirmText: "重试",
          success: function(res) {
            if (res.confirm) {
              that.getOptions();
            }
          }
        })
     })
  },

  //获取维修方案 
  getRepairMsg:function(){
    var that = this
    httpTool.getRepairMsg.call(that,that.data.mouldInfo.Id,that.data.faultId,that.data.mouldInfo.BrandId,that.data.selectedColor.ColorId,that.data.mouldInfo.ProductId,"3x",that.data.faultName,that.data.selectedColor.ColorId,function(data){
      that.setData({
        planList:data.repair,
        protectPlanList:data.honai_repair,
        markInfo:data.mark_info,
        detailUrl:data.detail_url
      })
      if(data.repair.length > 0){
        that.setData({
          selectedPlan:data.repair[0] //默认选中第一个方案
        });
      }
  },function(msg){
    wx.showModal({
      title: "获取维修方案失败，点击重试",
      content: msg,
      showCancel: false,
      confirmText: "重试",
      success: function(res) {
        if (res.confirm) {
          that.getRepairMsg();
        }
      }
    })
  });
  },

  //获取评论列表
  getComment:function(){
    var that = this
    httpTool.getFaultComment.call(that,that.data.faultId,"all",that.data.currentPage,function(data){
      if(that.data.currentPage <= 1){//如果是刷新,要先将原列表清空
        that.setData({
          commentList:[]
        }) 
      }
      that.setData({
         commentList:that.data.commentList.concat(data.list),
         currentPage:data.info.p,
         totalPages:data.info.total_page
      })
    },function(msg){
       wx.showToast({
          title: '获取评论失败',
          content: msg,
          duration: 2000
       });
    })
  },
  
  selectColor: function(e){
    var that = this
    var index = e.currentTarget.dataset.idx;
    var color = that.data.colorList[index];
    that.setData({
      selectedColor:color,
    });
    //重新获取维修方案
    that.getRepairMsg();
  },

  selectOption:function(e){
    var index = e.currentTarget.dataset.idx;
    var option = this.data.optionList[index];
    this.setData({
      selectedOption:option,
      selectedPlan:null
    });
    //切换保/内外对应的维修方案列表
    if(option.Id == 2){//保内
      if(this.data.protectPlanList.length > 0){
        this.setData({
          selectedPlan:this.data.protectPlanList[0],
        });
      } 
    }else{//保外
      if(this.data.planList.length > 0){
        this.setData({
          selectedPlan:this.data.planList[0],
        });
      }
    }
  },
  
  selectPlan :function(e){
    var index = e.currentTarget.dataset.idx;
    var option = this.data.selectedOption;
    if(option!= null && option.Id == 2){//保内
      var plan = this.data.protectPlanList[index];
      this.setData({
        selectedPlan:plan,
      });
    }else{//保外
      var plan = this.data.planList[index];
      this.setData({
        selectedPlan:plan,
      });
    }
  },

  chooseDevice:function(e){
    wx.navigateTo({
      url: '../chooseDevice/chooseDevice?faultId='+this.data.faultId+'&type=1',
    })
  },

  createOrder:function(e){
    //传递维修方案
    wx.setStorageSync(config.storageKeys.selectedPlan, this.data.selectedPlan);
    wx.navigateTo({
      url: '../createOrder/createOrder?mouldId='+this.data.mouldInfo.Id+'&mouldName='+this.data.mouldName+'&color='+this.data.selectedColor.ColorId
    })
  },

  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      desc: '自定义分享描述',
      path: '/page/user?id=123'
    }
  }
})