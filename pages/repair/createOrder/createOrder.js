var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var app = getApp()
Page({
  data: {
		faultList: [],
		hasMore: false,
		showLoading: true,
		start: 0,
		bannerList: config.bannerList
	},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var fault_id = options.id;    
  }
})