/*
备注
网络请求userapi
*/

var config = require('./config.js')
var jwt = require('../../util/jwt.js');


/********************************************* userapi ******************************************************/

/**
 *  手机号验证码登录
 *  name:手机号
 *  password：验证码
 *  cb: 成功回调
 *  fail_cb：失败回调
 */
function doLoginWithPhone(name,password,cb,fail_cb){
    var data = {
        name:name,
        password:password
      }
    request(config.apiList.doLogin, data, 'GET', cb, fail_cb);
}

/**
 *  获取验证码
 *  telephone:手机号
 *  cb: 成功回调
 *  fail_cb：失败回调
 */
function getVerifyCode(telephone, cb, fail_cb){
    var data = {
        telephone:telephone
      }
    request(config.apiList.sendCode, data, 'GET', cb, fail_cb);
}

/**
 *  获取故障大类列表
 *  cb: 成功回调
 *  fail_cb：失败回调
 */
function getAllFaults(cb, fail_cb){
   var that = this
   var data = {};
   request(config.apiList.faultList, data, 'GET', cb, fail_cb);
}

/**
 *  获取本机型信息
 *  mould_name：本机型字符串
 *  cb: 成功回调
 *  fail_cb：失败回调
 */
function getDeviceInfo(mould_name, cb, fail_cb){
   mould_name = mould_name.replace(/\s+/g,"");//暂时滤去空格，，，todo
   var data = {
     mouldName:mould_name
   }
   request(config.apiList.deviceInfo, data, 'GET', cb, fail_cb);
}

/**
 * 机型之品牌列表
 * 维修type=1 保险type=2
 */
function getBrands(type,fault_id,cb,fail_cb){
  var data = {
    type:type,
    fault_id:fault_id
  }
  request(config.apiList.brandList, data, 'GET', cb, fail_cb);
}

/**
 * 机型列表
 * 维修type=1 保险type=2
 * bid：品牌id 来自getBrands方法
 */
function getDevices(type, bid, fault_id, cb, fail_cb){
  var data = {
    type:type,
    fault_id:fault_id,
    bid:bid
  }
  request(config.apiList.mouldList, data, 'GET', cb, fail_cb);
}

/**
 *  获取某机型+故障对应的颜色
 *  fault_id：故障id
 *  mould_id: 机型id
 *  cb: 成功回调
 *  fail_cb：失败回调
 */
function getColors(fault_id,mould_id,cb,fail_cb){
  var data = {
      fault_id:fault_id,
      mould_id:mould_id
    };
  request(config.apiList.getColors, data, 'GET', cb, fail_cb);
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
   var data = {
       moudleid:moudleid,
       faulttype:faulttype,
       brandid:brandid,
       colorid:colorid,
       productid:productid,
       type:type,
       name:name,
       repairprice_colorid:repairprice_colorid
   }
   request(config.apiList.repairMsg, data, 'GET', cb, fail_cb);
}

/**
 *  故障的评论
 *  faulty_id
 *  cb: 成功回调
 *  fail_cb：失败回调
 */
function getFaultComment(faulty_id, type, page, cb, fail_cb){
   var data = {
       faulty_id:faulty_id,
       type:type,
       p:page,
   }
   request(config.apiList.faultComment, data, 'GET', cb, fail_cb);
}

/**
 *  获取地址列表
 */
function getAddressList(cb,fail_cb){
   var data = {}
   request(config.apiList.addressList, data, 'GET', cb, fail_cb);
}

/**
 * 创建订单
 */
function createOrder(planid,moudleid,color,mobile,name,cityid,areaid,address,reservetime,remark,lng,lat,coupon_id,protect_flag,cb,fail_cb){
  var data = {
    planid:planid,
    moudleid:moudleid,
    color:color,
    mobile:mobile,
    name:name,
    cityid:cityid,
    areaid:areaid,
    address:address,
    reservetime:reservetime,
    remark:remark,
    lng:lng,
    lat:lat,
    coupon_id:coupon_id,
    protect_flag:protect_flag
  }
  request(config.apiList.createOrder, data, 'GET', cb, fail_cb);
}

/**
 * 订单详情
 * id：订单号
 */
function getOrderDetail(id,cb,fail_cb){
  var data = {
    id:id
  }
  request(config.apiList.orderDetail, data, 'GET', cb, fail_cb);
}

/**
 *  订单列表
 *  page 页码
 *  search_type 0:全部订单, 1:维修订单, 2:保险订单, 3:回收订单
 *  is_show_shr 是否显示回收订单
 */
function getMyOrders(page,search_type,is_show_shr,cb,fail_cb){
  var data = {
    p:page,
    search_type:search_type,
    is_show_shr:is_show_shr
  }
  request(config.apiList.orderList, data, 'GET', cb, fail_cb);
}




/********************************************* base method ******************************************************/

/**
 *  http请求基础方法 
 *  url:接口路径
 *  data:参数map
 *  method: OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
 *  cb:成功回调
 *  
 */
function request(url,data,method,cb,fail_cb){
    var that = this
    var header = {};
    if(jwt.jwtToken()){ //如果存在token（用户已登录）
      header = {
        "Content-Type": "application/json,application/json",
        "Access-token": jwt.jwtToken()
      }
    }else{//未登录 
       header = {
         "Content-Type": "application/json,application/json"
       }
    }
    wx.request({
      url: url,
      data: data,
      method: method, 
      header: header,
      success: function(res){
        if(res.data.code == config.apiCode.success){
          //请求成功，回调数据
           typeof cb == 'function' && cb(res.data.data)
        }else if(res.data.code == config.apiCode.unauthorized){
          //无权限，直接跳往登录页面
           typeof fail_cb == 'function' && fail_cb(res.data.mes);
           wx.redirectTo({
             url: '../../pages/personal/login/login',
             success: function(res){
               // success
             },
             fail: function() {
               // fail
             },
             complete: function() {
               // complete
             }
           })
        }else{
           //请求失败
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


module.exports = {
  request:request,
  getVerifyCode : getVerifyCode,
  doLoginWithPhone : doLoginWithPhone,
  getFaultComment : getFaultComment,
  getBrands:getBrands,
  getDevices : getDevices,
  getColors: getColors,
  getRepairMsg: getRepairMsg, 
  getDeviceInfo: getDeviceInfo,
  getAllFaults: getAllFaults,
  getAddressList: getAddressList,
  createOrder:createOrder,
  getOrderDetail:getOrderDetail,
  getMyOrders:getMyOrders
}