// pages/gerenxinxi/gerenxinxi.js
var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var app = getApp()

Page({
  data:{
    name:"",
    birthday:"",
    phone:"",
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.loadUserInfo();
  },

  loadUserInfo:function(){
    var that = this;
    var hwxUserInfo = app.globalData.hwxUserInfo;
    var birthdayFormat = that.formatDate1(hwxUserInfo.birthday);
    // var birthdayFormat = publicFun.dataCode(hwxUserInfo.birthday);
    if (hwxUserInfo != null) {
      that.setData({
          name: hwxUserInfo.RealName,
          birthday:birthdayFormat,
          phone: hwxUserInfo.UserName
      })
    }
  },
  
  logout:function(e){
    wx.clearStorage();
    httpTool.logout.call(that);
    wx.navigateBack();
  },

  formatDate1: function(timestamp) {
    var date = new Date(timestamp * 1000);
    return date.getFullYear()+"-" + date.getMonth()+1 + "-" + date.getDate();
  },
  
  inputName:function(e){
    var that = this;
    var name = e.detail.value;
    httpTool.editName.call(that,name,function(data){
      that.setData({
        name: name
      })
      app.globalData.hwxUserInfo.RealName = name;
      app.setUserInfo(app.globalData.hwxUserInfo);
    },function(msg){
      wx.showToast({
        content:msg
      })
    })
  },
  inputBirthday:function(e){
      this.setData({
          birthday: e.detail.value
       })
      // var that = this;
      // var birthday = e.detail.value;
      // httpTool.editBirthday.call(that,birthday,function(data){
      //   that.setData({
      //     birthday: e.detail.value
      //   })
      //   app.globalData.hwxUserInfo.birthday = birthday;
      //   app.setUserInfo(app.globalData.hwxUserInfo);
      // },function(msg){
      //   wx.showToast({
      //     content:msg
      //   })
      // })
    },
})