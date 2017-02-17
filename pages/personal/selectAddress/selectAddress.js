var QQMapWX = require('../../../comm/script/qqmap-wx-jssdk.js');
var qqmapsdk;
var markersData = [];
Page({
  data: {
    markers: [],
    currentId: '0',
    latitude: "",
    longitude: "", 
    addressList: [],
    section: [
            {name : '全部',id : '0'},{name : '写字楼',id : '1'},
            {name : '小区',id : '2'},{name : '学校',id : '3'},
        ]
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

    this.getLngLat();
    
      // if(e.type == 'end'){
      //     this.getLngLat()
      // }
    },
  
  searchAddress:function() {
    var that = this;
    qqmapsdk.search({
            keyword: that.data.section[that.data.currentId].name,
            location:{
              latitude: that.data.latitude,
              longitude: that.data.longitude
            },
            page_size:20,
            success: function (res) {
                // console.log("vvS"+res.data);
                
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
  },
  handleTap: function(e){

        console.log(e);
        let id = e.currentTarget.id;

        if(id){
            this.setData({ currentId: id })
            this.onLoad();
        }
  },
  goToSearchAddress:function(e){
    console.log("aaaaaa");
     wx.navigateTo({
      //  url: "../../personal/liandong/liandong?autoback=1",
       url: "../../personal/searchAddress/searchAddress",
    })
  }
  


})