var config = require('./config.js')


/**
 *  逆地理信息编码
 *  http://restapi.amap.com/v3/geocode/regeo?output=xml&location=116.310003,39.991957&key=<用户的key>&radius=1000&extensions=all 
 */
function regeocode(lng,lat,cb,fail_cb){
    wx.request({
      url: config.amap.regeocode,
      data: {
          output:'json',
          location:lng+","+lat,
          key:config.amap.key
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
         "Content-Type": "application/json,application/json"
      },
      success: function(res){
        // success
        if(res.data.status == "1"){
            var component = res.data.regeocode.addressComponent;//province,city,district
            typeof cb == 'function' && cb(component)
        }
      },
      fail: function() {
        // fail
        typeof fail_cb == 'function' && fail_cb(config.strings.requestFail);
      },
      complete: function() {
        // complete
      }
    })
}

module.exports = {
    regeocode:regeocode
}
