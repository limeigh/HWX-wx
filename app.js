var config = require('comm/script/config')
App({
  globalData: {
    userInfo: null,//微信api个人信息model
    deviceInfo: null,//微信api机型信息
    hwxUserInfo: null,
    hwxDeviceInfo: null
  },

  onLaunch: function() {
    //获取用户信息
    this.getUserInfo();
    //设备信息
    this.getDeviceInfo();
    //初始化缓存
    this.initStorage();
  },

  /**
   * 获取用户信息(微信)
   * //{"nickName":"Lumberjack","avatarUrl":"http://wx.qlogo.cn/mmhead/Q3auHgzwzM4droRae0HaSx54QxmL7LK1YFLyNj2GnZF9T2AK7Utk7w/132",
   * "gender":2,"province":"Shanghai","city":""}
   */
  getUserInfo:function(cb){
    var that = this
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo;
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      }
    })
  },

  /**
   * 获取设备信息(微信)
   * //{"errMsg":"getSystemInfo:ok","model":"iPhone 6","pixelRatio":2,"windowWidth":375,"windowHeight":571,"system":"iOS 10.0.1",
   * "language":"zh_CN","version":"6.3.9","platform":"devtools"}
   */
  getDeviceInfo: function(cb){
     var that = this
     try{
       var res = wx.getSystemInfoSync();
       that.globalData.deviceInfo = res;
       typeof cb == "function" && cb(that.globalData.deviceInfo)
     }catch(e){
       console.log(JSON.stringify(e));
     }
  },
  
  
  /**
   * 获取用户当前地址坐标（可转换得到城市）
   */
  getCity: function(cb) {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        //只有坐标坐标，如需用户准确位置，调用高德地理编码api转换之..
        typeof cb == "function" && cb(res);
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