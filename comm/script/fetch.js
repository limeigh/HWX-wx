var config = require('./config.js')
var message = require('../../component/message/message')

/**
 *  手机号验证码登录
 *  name:手机号
 *  password：验证码
 *  cb: 成功回调
 *  fail_cb：失败回调
 */
function doLoginWithPhone(name,password,cb,fail_cb){
    var that = this
    wx.request({
      url: config.apiList.doLogin,
      data: {
        name:name,
        password:password
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        if(res.data.code == config.apiCode.success){
           typeof cb == 'function' && cb(res.data.data)
        }else{
           typeof fail_cb == 'function' && fail_cb(res.data.mes)
        }
      },
      fail: function() {
        // fail
        typeof fail_cb == 'function' && fail_cb(config.strings.requestFail)
      },
      complete: function() {
        // complete
      }
    })
}

/**
 *  获取验证码
 *  telephone:手机号
 *  cb: 成功回调
 *  fail_cb：失败回调
 */
function getVerifyCode(telephone, cb, fail_cb){
    var that = this
    wx.request({
      url: config.apiList.sendCode,
      data: {
        telephone:telephone
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        if(res.data.code == config.apiCode.success){
           typeof cb == 'function' && cb(res.data.data)
        }else{
           typeof fail_cb == 'function' && fail_cb(res.data.mes)
        }
      },
      fail: function() {
        typeof fail_cb == 'function' && fail_cb(config.strings.requestFail)
      },
      complete: function() {
        // complete
      }
    })
}

/**
 *  获取故障大类列表
 *  cb: 成功回调
 *  fail_cb：失败回调
 */
function getAllFaults(cb, fail_cb){
   var that = this
   wx.request({
     url: config.apiList.faultList,
     data: {},
     method: 'GET', 
     header: {
       "Content-Type": "application/json,application/json"
     },
     success: function(res){
        if(res.data.code == config.apiCode.success){
           typeof cb == 'function' && cb(res.data.data)
        }else{
           typeof fail_cb == 'function' && fail_cb(res.data.mes)
        }
     },
     fail: function() {
       typeof fail_cb == 'function' && fail_cb(config.strings.requestFail)
     }
   })
}

/**
 *  获取本机型信息
 *  mould_name：本机型字符串
 *  cb: 成功回调
 *  fail_cb：失败回调
 */
function getDeviceInfo(mould_name, cb, fail_cb){
   var that = this
   mould_name = mould_name.replace(/\s+/g,"");//暂时滤去空格，，，todo
   wx.request({
     url: config.apiList.deviceInfo,
     data: {
       mouldName:mould_name
     },
     method: 'GET', 
     header: {
       "Content-Type": "application/json,application/json"
     },
     success: function(res){
        if(res.data.code == config.apiCode.success){
           typeof cb == 'function' && cb(res.data.data)
        }else{
           typeof fail_cb == 'function' && fail_cb(res.data.mes)
        }
     },
     fail: function() {
       typeof fail_cb == 'function' && fail_cb(config.strings.requestFail);
     }
   })
}

/**
 *  获取维修方案
 *  moudleid
 *  faulttype
 *  brandid
 *  colorid
 *  productid
 *  type
 *  name
 *  repairprice_colorid
 *  cb: 成功回调
 *  fail_cb：失败回调
 */
function getRepairMsg(moudleid, faulttype, brandid, colorid, productid,type,name,repairprice_colorid,cb, fail_cb){
   var that = this
   wx.request({
     url: config.apiList.repairMsg,
     data: {
       moudleid:moudleid,
       faulttype:faulttype,
       brandid:brandid,
       colorid:colorid,
       type:type,
       name:name,
       repairprice_colorid:repairprice_colorid
     },
     method: 'GET', 
     header: {
       "Content-Type": "application/json,application/json"
     },
     success: function(res){
       if(res.data.code == config.apiCode.success){
           typeof cb == 'function' && cb(res.data.data)
        }else{
           typeof fail_cb == 'function' && fail_cb(res.data.mes)
        }
     },
     fail: function() {
       typeof fail_cb == 'function' && fail_cb(config.strings.requestFail)
     }
   })
}

/**
 *  故障的评论
 *  faulty_id
 *  cb: 成功回调
 *  fail_cb：失败回调
 */
function getComment(faulty_id, type, page, cb, fail_cb){
   var that = this
   wx.request({
     url: config.apiList.faultComment,
     data: {
       faulty_id:faulty_id,
       type:type,
       p:page,
     },
     method: 'GET', 
     header: {
       "Content-Type": "application/json,application/json"
     },
     success: function(res){
       that.setData({
         repairMsg:res.data.data,
         faultDetailList:res.data.data.applies.list
       })
       typeof cb == 'function' && cb(res)
     },
     fail: function() {
       typeof fail_cb == 'function' && fail_cb()
     }
   })
}


module.exports = {
  getVerifyCode : getVerifyCode,
  doLoginWithPhone : doLoginWithPhone,
  getComment : getComment,
  getRepairMsg: getRepairMsg, 
  getDeviceInfo: getDeviceInfo,
  getAllFaults: getAllFaults,
}