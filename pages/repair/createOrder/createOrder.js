var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var app = getApp()
Page({
  data: {
    planId:null,//维修方案id
    mouldId:null,//机型id
    colorId:null,//颜色id
		phone:null,
    name:null,
    cityId:null,
    areaId:null,
    address:null,
    reserveTime:null,
    remark:null,
    lng:null,
    lat:null,
    couponId:null,
    protectFlag:null,
	},

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      planId:options.plan,
      mouldId:options.mould,
      colorId:options.color,
    }) 
    
    //对已登录的用户，自动获取地址，手机号等信息
    that.loadUserData();
  }



})