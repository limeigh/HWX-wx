var amapFile = require('../../../comm/script/amap-wx.js');
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {}
  },
  onLoad: function() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key:'fb1469e4083fd8ef79a6de45b37db90d'});
    myAmapFun.getRegeo({
      iconPath: "../../../../img/marker.png",
      iconWidth: 22,
      iconHeight: 32,
      success: function(data){
        console.log("l1 "+data);
        that.setData({
          markers: data
        });
        that.setData({
          latitude: data[0].latitude
        });
        that.setData({
          longitude: data[0].longitude
        });
        that.setData({
          textData: {
            name: data[0].name,
            desc: data[0].desc
          }
        })
      },
      fail: function(info){
        wx.showModal({title:info.errMsg})
      }
    })
  }
})