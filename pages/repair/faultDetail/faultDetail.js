var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var app = getApp()
Page({
  data: {
    colorList:[],//颜色选项
    planList: [],//方案选项
    detailUrl: null, //详情链接
    commentList: [],//评论列表
    currentPage: 1, //默认第一页
    totalPages: 1,  //总页数
    faultId: null,  //故障id
    mouldName: null, //设备名称
    markInfo: null,//故障说明
    mouldInfo: null, //已选设备
    selectedColor: null, //已选颜色
    selectedPlan: null, //已选方案
	},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    that.setData({
      faultId:options.id
    })
    
    //获取设备信息(hi维修数据)
    that.getDeviceInfo();
    
    //获取用户评论
    that.getComment(that.currentPage);
  },
  
  //获取机型信息
  getDeviceInfo:function(){
    var that = this
    if (app.globalData.deviceInfo != null) {
      //若微信获取的model不为空，请求hiweixiu机型数据
      httpTool.getDeviceInfo(app.globalData.deviceInfo.model,function(data){
        that.setData({
          mouldInfo:data,
          mouldName:app.globalData.deviceInfo.model
        })
        that.getColors();//获取机型成功，获取颜色选项
      },function(msg){
        wx.showToast({
          title: '获取本机机型失败，请手动选择',
          content: msg,
          duration: 2000
        });
      });
    } else {
      //否则直接提示手动选择
      wx.showToast({
        title: '获取本机机型失败，请手动选择',
        duration: 2000
      });
    }
  },
  
  //获取颜色选项
  getColors:function(){
    var that = this
    httpTool.getColors.call(that,that.data.faultId,that.data.mouldInfo.Id,function(data){
        that.setData({
          colorList:data
        })
        if(data.length == 1){
          that.setData({
            selectedColor:data[0]
          })
          that.getRepairMsg();//如果只有一个颜色，请求维修方案
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

  //获取维修方案 
  getRepairMsg:function(){
    var that = this
    httpTool.getRepairMsg.call(that,that.data.mouldInfo.Id,that.data.faultId,that.data.mouldInfo.BrandId,that.data.selectedColor.ColorId,that.data.mouldInfo.ProductId,"3x",that.data.mouldInfo.Name,that.data.selectedColor.ColorId,function(data){
                 that.setData({
                     planList:data.repair,
                     markInfo:data.mark_info,
                     detailUrl:data.detail_url
                 })
			      },function(msg){
                 wx.showModal({
                   title: "获取维修方案失败，点击重试",
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

  //获取评论列表
  getComment:function(page){
    var that = this
    httpTool.getFaultComment.call(that,that.data.faultId,"all",page,function(data){
      that.setData({
         commentList:data.list,
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

  selectPlan :function(e){
    var that = this
    var index = e.currentTarget.dataset.idx;
    var plan = that.data.planList[index];
    that.setData({
      selectedPlan:plan,
    });
  },

  createOrder:function(e){
    var that = this
    wx.navigateTo({
      url: '../createOrder/createOrder?plan='+that.data.selectedPlan.Id+'&mould='+that.data.mouldInfo.Id+'&color='+that.data.selectedColor.ColorId
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