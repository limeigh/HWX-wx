var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var app = getApp()

Page({
  data:{
    phone:"",
    code:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },

  inputPhone:function(e){
    var that = this;
    console.log("inputPhone"+e.detail.value);
    this.setData({
      phone: e.detail.value
    })
  },

  inputCode:function(e){
    console.log("inputCode"+e.detail.value);
    this.setData({
      code: e.detail.value
    })
  },

  sendCode:function(e){
     var that = this;
     console.log("sendCode " + that.data.phone + that.data.code);
     httpTool.getVerifyCode.call(that,that.data.phone,function(){
       wx.showToast({
        title: '已发送'+that.data.phone,
        icon: 'success',
        duration: 2000
      })
     },function(){
       wx.showToast({
        title: '发送失败',
        duration: 100
       })
     }) 
  },

  submit:function(e){
    var that = this;
    console.log("submit " + that.data.phone + that.data.code);
    httpTool.doLoginWithPhone.call(that,that.data.phone,that.data.code,function(data){
       app.globalData.hwxUserInfo = data;
       wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })
    },function(msg){
          wx.showToast({
            title: '登录失败'+msg,
            duration: 1000
          })
    })
  }
})