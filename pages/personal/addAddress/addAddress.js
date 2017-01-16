Page({
  data:{
     name:"",
     gender:1,
     address:"新增地址",
     addressDetail:""
  },
  
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },

  selectGender:function(e){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      gender:e.detail.value,
    })
    console.log("gender =" + that.data.gender);
  },

  selectMap:function(e){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.chooseLocation({
      success: function(res){
        // success
        console.log("addr = " +JSON.stringify(res));
        that.setData({
          address:res.name,
          addressDetail:res.address
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  inputName: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  inputAddress: function(e) {
    this.setData({
      addressDetail: e.detail.value
    })
  },

  submit:function(e){
      var that = this;
      console.log("submit"+JSON.stringify(that.data)); 
      wx.showModal({
         title: JSON.stringify(that.data),
         duration: 2000
      })
  }
 
})