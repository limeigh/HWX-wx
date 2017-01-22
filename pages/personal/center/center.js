var config = require('../../../comm/script/config')
var app = getApp();

Page({
  data:{
    hwxUserInfo:null,
    hwxUserInfo:null,
    hasLogin:false
  },

  onLoad:function(){
    
  },

  onShow:function(){
    //更新用户信息
    this.updateUserInfo();
  },

  updateUserInfo:function(){
    // 检测用户信息信息，登录状态
    if (app.globalData.hwxUserInfo != null) {
      this.setData({
          userInfo: app.globalData.userInfo,
          hwxUserInfo: app.globalData.hwxUserInfo,
          hasLogin:true
      })
    } else{
      this.setData({
          userInfo: app.globalData.userInfo,
          hwxUserInfo: null,
          hasLogin:false
      })
    }
  },
  
  myOrder: function(e) {
    if(this.data.hasLogin){
      wx.navigateTo({
			  url: "../myOrders/myOrders"
		  })
    }
  },

  addressManage: function(e) {
    if(this.data.hasLogin){
      wx.navigateTo({
			  url: "../addressList/addressList"
		  })
    }
  },

  callPhone: function(e) {
    wx.makePhoneCall({
      phoneNumber: '4000171010',
    });
  },

  editInfo: function(e){
    if(this.data.hasLogin){
      wx.navigateTo({
			  url: "../myInfo/myInfo"
		  });
    }
  },

  login:function(e){
    wx.navigateTo({
			url: "../login/login"
		});
  }
})