var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var app = getApp()

Page({
  data:{
    page:1,
    orderList:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.loadOrderList();
  },
  
  loadOrderList:function(){
    var that = this;
    httpTool.getMyOrders.call(that,that.data.page,0,true,function(data){
      that.setData({
        orderList:data
      })
    },function(msg){
      wx.showToast({
        content:msg
      })
    })
  },

  selectOrder:function(e){
    var that = this;
    var index = e.currentTarget.dataset.idx;
    var order = that.data.orderList[index];
    wx.navigateTo({
      url: '../../repair/orderDetail/orderDetail?id='+order.id,
    })
  }

})