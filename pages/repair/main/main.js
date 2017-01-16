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

	onLoad: function() {
		var that = this
		wx.showNavigationBarLoading()
		app.getCity(function(){
			wx.hideNavigationBarLoading()
			httpTool.getAllFaults.call(that,function(data){
                that.setData({
                    faultList: that.data.faultList.concat(data),
                    showLoading: false
                })
			},function(mes){
                that.setData({
                    showLoading: false
                })
                message.show.call(that,{
                    content: mes,
                    icon: 'offline',
                    duration: 3000
                })
                wx.stopPullDownRefresh()
			});
		})
	},

	onPullDownRefresh: function() {
		var that = this
		that.setData({
			faultList: [],
		    hasMore: false,
			showLoading: true,
			start: 0
		})
		this.onLoad()
	},

	addOrder: function(e) {
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: "../faultDetail/faultDetail?id=" + data.id
		})
	},	
})