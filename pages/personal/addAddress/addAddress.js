var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var amapTool = require('../../../comm/script/amap')
var app = getApp()

Page({
  data:{
     name:"",
     gender:1,//男1女2
     address:"新增地址",
     addressDetail:"",
     lat:0,
     lng:0,
     province:"",
     city:"",
     cityId:"",
     area:"",
     areaId:"",
  },
  
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },

  selectGender:function(e){
    var that = this;
    that.setData({
      gender:e.detail.value,
    })
  },

  selectMap:function(e){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.chooseLocation({
      success: function(res){
        // success
        // {"name":"黄浦区人民大道上海市政府上海市委","address":"上海市黄浦区人民大道200号人民大道","latitude":31.230416,"longitude":121.473701,"errMsg":"chooseLocation:ok"}
        that.setData({
          address:res.name,
          addressDetail:res.address,
          lat:res.latitude,
          lng:res.longitude
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
    //转换城市地区数据
    amapTool.regeocode.call(that,this.data.lng,this.data.lat,function(data){
        that.setData({
          province:data.province,
          city:(data.city.length>0)?data.city:data.province,
          area:data.district,
        })
        //转换城市地区数据
        httpTool.getCityInfo.call(that,that.data.province,that.data.city,that.data.area,function(data){
            that.setData({
              cityId:data.city_id,
              areaId:data.area_id
            })
            //提交地址
            httpTool.addAddress.call(that,that.data.gender,data.city_id,data.area_id,that.data.addressDetail,that.data.name,that.data.lng,that.data.lat,that.data.address,that.data.address,function(data){
              //返回
              wx.navigateBack();
            },function(msg){
                wx.showToast({
                  title:msg
                })
            }) 
        },function(msg){
            wx.showToast({
              title:msg
            })
        });
    },function(msg){
        wx.showToast({
          title:msg
        })
    });
  }
})