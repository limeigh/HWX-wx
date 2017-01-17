var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var app = getApp()

Page({
  data:{

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },


  loadAddressList:function(){
    var that = this;
    httpTool.getAddressList(function(data){

    },function(msg){

    })
  },

  addAddress:function(e){
     wx.navigateTo({
			  url: "../addAddress/addAddress"
		 })
  }
})