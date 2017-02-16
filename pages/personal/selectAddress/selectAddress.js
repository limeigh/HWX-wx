var QQMapWX = require('../../../comm/script/qqmap-wx-jssdk.js');
var qqmapsdk;
var markersData = [];
Page({
  data: {
    markers: [],
    latitude: "",
    longitude: "", 
    addressList: []   
  },
  
  onLoad: function() {
    this.mapCtx = wx.createMapContext('myMap');
    var that = this;
    qqmapsdk = new QQMapWX({
      key: 'ZOGBZ-3PBW5-2WNID-QSSNY-UKPD5-FPF25'
    });
    
    this.getLngLat();
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({
            longitude: res.longitude,
            latitude: res.latitude
          })
      }
    })
  },
  getLngLat:function(){
    console.log("ZOU了");
    
      var that = this;
      this.mapCtx = wx.createMapContext("map");
      this.mapCtx.getCenterLocation({
      success: function(res){
        that.setData({
            longitude: res.longitude,
            latitude: res.latitude,
            markers:[{
                id: 0,
                iconPath: "../../../../img/yhpj_dqwz.png",
                longitude: res.longitude,
                latitude: res.latitude,
                width: 18,
                height: 28
            }]
          })
        // var keyword = "全部";
        that.searchAddress();
      },
      fail: function(info){
        wx.showModal({title:info.errMsg})
      }
    })
  },
  regionchange:function(e) {
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置
    console.log("变了");
    this.getLngLat();
    
      // if(e.type == 'end'){
      //     this.getLngLat()
      // }
    },
  
  searchAddress:function() {
    var that = this;
    qqmapsdk.search({
            keyword: "酒店",
            location:{
              latitude: that.data.latitude,
              longitude: that.data.longitude
            },
            success: function (res) {
                console.log("vvS"+res.data);
                
                that.setData({
                  addressList:res.data,
                  // currentPage:data.info.p,
                  // totalCount:data.info.sum
                })
                console.log("vvcount"+that.data.addressList.length);
            },
            fail: function (res) {
                console.log("vvF"+res);
            },
        complete: function (res) {
            console.log("vvC"+res);
        }
    });
  }

})