var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var app = getApp()

Page({
	data: {
		faultList: [],
	},

	onLoad: function() {
		//获取故障大类列表
		this.loadAllFaults();
	},

	onPullDownRefresh: function() {
		//获取故障大类列表
		this.loadAllFaults();
	},

    //获取故障大类列表
	loadAllFaults:function(){
		var that = this
		httpTool.getAllFaults.call(that,function(data){
                that.setData({
                    faultList: data,
                })
				wx.stopPullDownRefresh();
			},function(msg){
                wx.showToast({
                    title: msg,
                })
				wx.stopPullDownRefresh();
			});
	},
    
	//前往创建订单
	bindTapFault: function(e) {
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: "../faultDetail/faultDetail?id=" + data.id + "&name=" + data.Name
		})
		
	},	
})