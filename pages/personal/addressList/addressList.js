var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var app = getApp()

Page({
  data:{
    addressList:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    //获取地址列表
    that.loadAddressList();
  },

  //获取地址列表
  loadAddressList:function(){
    var that = this;
    httpTool.getAddressList(function(data){
      that.setData({
        addressList:data
      })
    },function(msg){
      wx.showToast({
        title: '获取地址列表失败',
        content: msg,
        duration: 2000
      });
    })
  },

  addAddress:function(e){
     wx.navigateTo({
			  url: "../addAddress/addAddress"
		 })
  }
})