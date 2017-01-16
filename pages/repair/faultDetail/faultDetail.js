var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var app = getApp()
Page({
  data: {
    faultId: null,
		mouldName: "default",
    mouldInfo: null,
    faultDetailList: [],
    commentList: [],
    repairMsg: null,
		showLoading: true,
	},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    that.setData({
      faultId:options.id
    })
    if (app.globalData.deviceInfo != null) {
      that.setData({
          mouldName:app.globalData.deviceInfo.model
      })
      httpTool.getDeviceInfo.call(that,app.globalData.deviceInfo.model,function(data){
               that.setData({
                  mouldInfo:data
               });
			         httpTool.getRepairMsg.call(that,that.data.mouldInfo.Id,that.data.faultId,that.data.mouldInfo.BrandId,   that.data.mouldInfo.Colors,that.data.mouldInfo.ProductId,"3x",that.data.mouldInfo.Name,function(){
                 that.setData({
                     repairMsg:data,
                     faultDetailList:data.applies.list
                 })
               });
			      },function(msg){

            })
    } else {
      app.getDeviceInfo(function(){
        that.setData({
          mouldName:app.globalData.deviceInfo.model
        })
        httpTool.getDeviceInfo.call(that,app.globalData.deviceInfo.model,
            function(data){
			          httpTool.getRepairMsg.call(that,that.data.mouldInfo.Id,that.data.faultId,that.data.mouldInfo.BrandId,   that.data.mouldInfo.Colors,that.data.mouldInfo.ProductId,"3x",that.data.mouldInfo.Name,function(){
                 that.setData({
                     repairMsg:data,
                     faultDetailList:data.applies.list
                 })
               });
			      },function(msg){
              //
			      })
        })
    }
  },

  selectPlan :function(e){
      console.log("selectPlan");
      var data = e.currentTarget.dataset;
  },

  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      desc: '自定义分享描述',
      path: '/page/user?id=123'
    }
  }
})