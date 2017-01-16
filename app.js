var config = require('comm/script/config')
App({
  globalData: {
    userInfo: null,
    deviceInfo: null,
    hwxUserInfo: null
  },
  onLaunch: function() {
    // 获取用户信息
    this.getUserInfo();
    //设备信息
    this.getDeviceInfo();
    //初始化缓存
    this.initStorage();
  },

  getUserInfo:function(cb){
    var that = this
    wx.login({
      success: function () {
        console.log('login!');
        wx.getUserInfo({
          success: function (res) {
            console.log('userinfo = ' + res.userInfo.avatarUrl + res.userInfo.nickName);
            that.globalData.userInfo = res.userInfo;
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      }
    })
  },

  getCity: function(cb) {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log("getCity:"+JSON.stringify(res));
        var latitude = res.latitude
        var longitude = res.longitude
        //只有坐标坐标，如需用户准确位置，调用高德地理编码api转换之..
        typeof cb == "function" && cb(res);
      }
    })
  },
  
  //设备信息
  getDeviceInfo: function(cb){
     var that = this
     wx.getSystemInfo({
       success: function(res) {
         console.log("model =" + res.model);
         that.globalData.deviceInfo = res;
         typeof cb == "function" && cb(that.globalData.deviceInfo)
       }
     })

  },

  initStorage: function() {
    wx.getStorageInfo({
      success: function(res) {
        
      }
    })
  }
})