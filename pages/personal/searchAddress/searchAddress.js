// pages/sosuodizhi/sosuodizhi.js
var QQMapWX = require('../../../comm/script/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data:{
    addressList: [],
    keyword: ""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    //     wx.redirectTo({
//   url: 'test?id=1'
// })
    qqmapsdk = new QQMapWX({
          key: 'ZOGBZ-3PBW5-2WNID-QSSNY-UKPD5-FPF25'
    });
    this.searchAddress();
  },
  
  searchAddress:function(keyword) {
    var that = this;
    console.log("地址"+that.data.keyword);
    qqmapsdk.getSuggestion({
            keyword: that.data.keyword,
            // location:{
            //   latitude: that.data.latitude,
            //   longitude: that.data.longitude
            // },
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
                // console.log("vvF"+res);
            },
        complete: function (res) {
            // console.log("vvC"+res);
        }
    });
  },
  setKeyword:function(e){
    var that = this;
    that.setData({
      keyword:e.detail.value
    })
  }
})