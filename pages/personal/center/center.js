var config = require('../../../comm/script/config')
var app = getApp();
Page({
  data:{
    skin: ''
  },
  onLoad:function(cb){
    var that = this
    console.log('user = ' + app.globalData.userInfo);
    // 检测是否存在用户信息
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
    typeof cb == 'function' && cb()
  },

  onShow:function(){
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function(res){
        if (res.data == "") {
          that.setData({
            skin: config.skinList[0].imgUrl
          })
        } else {
          that.setData({
            skin: res.data
          })
        }
      }
    })
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

  login:function(e){
    wx.navigateTo({
			url: "../login/login"
		});
  }

})