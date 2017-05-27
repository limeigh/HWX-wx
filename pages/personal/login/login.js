var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var app = getApp()

Page({
  data:{
    phone:"",
    code:"",
    phoneImgUrl:"",
    codeImgUrl:"",
    getAuthCodeTextColor:"",
    codeId:true,
    second:""
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      phoneImgUrl:"../../../../img/17020409.png",
      codeImgUrl:"../../../../img/17020410.png",
      getAuthCodeTextColor:"#999",
      loginBackgroundColor:"#ccc"
    })
  },

  inputPhone:function(e){
    var that = this;
    this.setData({
      phone: e.detail.value
    })
    if (e.detail.value) {
      this.setData({
        phoneImgUrl:"../../../../img/17020409-2.png",
        getAuthCodeTextColor:"#ff5000",
      })
    }else {
       this.setData({
        phoneImgUrl:"../../../../img/17020409.png",
        getAuthCodeTextColor:"#999",
      })
    }
  },

  inputCode:function(e){
    this.setData({
      code: e.detail.value
    })

    if (e.detail.value) {
      this.setData({
        codeImgUrl:"../../../../img/17020410.png",
        loginBackgroundColor:"#ff5000",
      })
    }else {
       this.setData({
        codeImgUrl:"../../../../img/17020410.png",
        loginBackgroundColor:"#ccc",
      })
    }
  },

  sendCode:function(e){
     var that = this;
     if (!that.bindCheckMobile(that.data.phone)) { 
      return 
    };
     httpTool.getVerifyCode.call(that,that.data.phone,function(){
      wx.showToast({
        title: '已发送' + that.data.phone,
      })
      that.setData({
        codeId:false
      })
      that.daojishi();
     },function(){
       wx.showToast({
        title: '发送失败',
        duration: 1000
       })
     }) 
  },

  daojishi:function(){
    var that=this
    var s=60
    var timer =setInterval(function(){
      if(s<=0){
        that.setData({
          codeId:true
        })
        clearInterval(timer)
        return false
      }
      s -= 1
      that.setData({
        second:s
      })
    },1000)
  },

  submit:function(e){
    var that = this;
    if (!that.bindCheckMobile(that.data.phone)) { 
      return 
    };
    console.log("submit " + that.data.phone + that.data.code);
    httpTool.doLoginWithPhone.call(that,that.data.phone,that.data.code,function(data){
       app.setUserInfo(data);
       //设置时间差
        app.setTimeDifference(-10)
       wx.showToast({
         title: '登录成功',
         icon: 'success',
         duration: 2000
       });
       wx.navigateBack({
         delta: 1, // 回退前 delta(默认为1) 页面
         success: function(res){
           // success
         },
         fail: function() {
           // fail
         },
         complete: function() {
           // complete
         }
       });
    },function(msg){
          wx.showToast({
            title: '登录失败'+msg,
            duration: 1000
          })
    })
  },

  bindCheckMobile:function(mobile) {
    if (!mobile.match(/^1[3-9][0-9]\d{8}$/)) {
      wx.showToast({
            title: '手机号格式不正确',
            duration: 1000
      })
      return false;
    }
    return true;
  },

  goToUserTerms:function(e){
    console.log("hahah888");
  }
})

