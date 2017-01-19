var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var app = getApp()

Page({
  data:{
    faultId:null,  
    type:1,        //维修type=1 保险type=2 默认1
    brandList:[],  //品牌名列表 {"Id": "24","BrandName": "苹果"}
    phoneList:[], //手机列表
    padList:[],  //平板列表
    selectedBrand:null,  //当前选中品牌
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    that.setData({
      faultId:options.faultId,
      type:options.type
    })

    this.loadBrandList();
  },

  loadBrandList:function(){
      var that = this;
      httpTool.getBrands.call(that,that.data.type,that.data.faultId,function(data){
          that.setData({
              brandList:data
          })
          //自动选中第一个
          if(that.data.brandList.length > 0){
              that.setData({
                  selectedBrand:that.data.brandList[0]
              })
              //加载对应的机型
              that.loadMouldList();
          }
      },function(msg){
          wx.showToast({
              content:msg
          })
      })
  },

  loadMouldList:function(){
      var that = this;
      console.log('loadMouldList'+JSON.stringify(that.data.selectedBrand));
      httpTool.getDevices.call(that,that.data.type,that.data.selectedBrand.Id,that.data.faultId,function(data){
          that.setData({
              phoneList:data["手机"],
              padList:data["平板"]
          })
      },function(msg){
          wx.showToast({
              content:msg
          })
      });
  },

  selectBrand:function(e){
      var that = this;
      var index = e.currentTarget.dataset.idx;
      var brand = that.data.brandList[index];
      that.setData({
          selectedBrand:brand
      })
      that.loadMouldList();
  },

  selectPhone:function(e){
      var index = e.currentTarget.dataset.idx;
      var phone = this.data.phoneList[index];
      this.saveSelectedDevice(phone);
  },

  selectPad:function(e){
      var index = e.currentTarget.dataset.idx;
      var pad = this.data.padList[index];
      this.saveSelectedDevice(pad);
  },

  saveSelectedDevice:function(data){
      wx.setStorageSync(config.storageKeys.selectedDevice, data);
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
      })
  }

})