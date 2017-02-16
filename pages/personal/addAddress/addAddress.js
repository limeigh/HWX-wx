// pages/tianxiedizhi/tianxiedizhi.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  inputName:function(e){
    var that = this;
    var name = e.detail.value;
    that.setData({
        name: name
    })
    // httpTool.editName.call(that,name,function(data){
    //   that.setData({
    //     name: name
    //   })
    //   app.globalData.hwxUserInfo.RealName = name;
    //   app.setUserInfo(app.globalData.hwxUserInfo);
    // },function(msg){
    //   wx.showToast({
    //     content:msg
    //   })
    // })
  },
  selectAddress:function(e){
    console.log("li3333")
    wx.navigateTo({
       url: "../../personal/selectAddress/selectAddress?autoback=1",
      //  url: "../../personal/selectAddress/selectAddress?autoback=1",
     })
  },
  
})