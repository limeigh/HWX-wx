var config = require('../../../comm/script/config')
var app = getApp();
Page({
  data:{
    skin: ''
  },
  onLoad:function(){
    var that = this
  },

  onShow:function(){
    this.updateUserInfo();
  },
  onPullDownRefresh: function() {
    this.onLoad(function(){
      wx.stopPullDownRefresh()
    })
  },

  addressManage: function(e) {
    wx.navigateTo({
			url: "../addressList/addressList"
		})
  },

  updateUserInfo:function(){
    // 检测是否存在用户信息
    var that = this;
    if (app.globalData.userInfo != null) {
      that.setData({
          userInfo: app.globalData.userInfo
      })
    } else {
      app.getUserInfo(function(){
        that.setData({
          userInfo: app.globalData.userInfo
        })
      })
    }
  },
  
  myOrder: function(e) {
    console.log("myorder");
    // var data = e.currentTarget.dataset
		wx.navigateTo({
			url: "../myOrders/myOrders"
		})
  },

  callPhone: function(e) {
    wx.makePhoneCall({
      phoneNumber: '4000171010',
      success: function(res) {
        console.log("callPhone"+res);
      }
    });
  },

  editInfo: function(e){
    wx.navigateTo({
			url: "../myInfo/myInfo"
		});
  },

  login:function(e){
    wx.navigateTo({
			url: "../login/login"
		});
  }

})