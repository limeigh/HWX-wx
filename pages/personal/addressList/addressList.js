Page({
  data:{

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },

  addAddress:function(e){
     wx.navigateTo({
			  url: "../addAddress/addAddress"
		 })
  }
})