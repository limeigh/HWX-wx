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
     addressDetailMore:"",
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

  selectAddress:function(e){
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
      addressDetailMore: e.detail.value
    })
  },

  submit:function(e){
    var that = this;
    //转换省市地区数据
    amapTool.regeocode.call(that,that.data.lng,that.data.lat,function(data){
        that.setData({
          province:data.province,
          city:(data.city.length>0)?data.city:data.province,
          area:data.district,
        })
        //转换省市地区数据
        httpTool.getCityInfo.call(that,that.data.province,that.data.city,that.data.area,function(data){
            that.setData({
              cityId:data.city_id,
              areaId:data.area_id
            })
            //提交地址
            httpTool.addAddress.call(that,that.data.gender,data.city_id,data.area_id,(that.data.addressDetail+that.data.addressDetailMore),that.data.name,that.data.lng,that.data.lat,that.data.address,that.data.address,function(data){
              // 缓存地址信息
              wx.setStorage({
                key:config.storageKeys.selectedAddress,
                data:{
                  contacts:that.data.name,
                  gender:that.data.gender,
                  address_desc:that.data.addressDetail+that.data.addressDetailMore,
                  cityId:that.data.cityId,
                  district:that.data.areaId,
                  address:that.data.addressDetail,
                  lng:that.data.lng,
                  lat:that.data.lat,
                }
              })
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