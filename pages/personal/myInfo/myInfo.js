var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var app = getApp()

Page({
  data:{
    name:"",
    birthday:"",
    phone:"",
    gender:0,
    genderList:["未填写","男","女"]
  },
  
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.loadUserInfo();
  },

  loadUserInfo:function(){
    var hwxUserInfo = app.globalData.hwxUserInfo;
    if (hwxUserInfo != null) {
      this.setData({
          name: hwxUserInfo.RealName,
          birthday:hwxUserInfo.birthday,
          phone: hwxUserInfo.UserName
      })
    }
    //从微信取性别（hi维修没有这个字段）
    var userInfo = app.globalData.userInfo;
    if (userInfo!=null){
      this.setData({
        gender:userInfo.gender
      })
    }
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
    var that = this;
    var birthday = e.detail.value;
    httpTool.editBirthday.call(that,birthday,function(data){
      that.setData({
        birthday: e.detail.value
      })
      app.globalData.hwxUserInfo.birthday = birthday;
      app.setUserInfo(app.globalData.hwxUserInfo);
    },function(msg){
      wx.showToast({
        content:msg
      })
    })
  },

  logout:function(e){
    wx.clearStorage();
    httpTool.logout.call(this);
    wx.navigateBack();
  },



})