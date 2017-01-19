var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var app = getApp()

Page({
  data:{
    orderId:null,
    orderDetail:null
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    that.setData({
      orderId:options.id,
    })
    //获取订单详情
    that.getOrderDetail();
  },

  getOrderDetail:function(){
    var that = this;
    httpTool.getOrderDetail.call(that,that.data.orderId,function(data){
      that.setData({
        orderDetail:data
      })
    },function(msg){
      wx.showToast({
        content:msg
      })
    });
  }

})