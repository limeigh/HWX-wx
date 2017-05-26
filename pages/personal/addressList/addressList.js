var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var app = getApp()

Page({
  data:{
    backOnSelected:false,//选择地址后是否需要自动返回
    addressList:[],
    selectedAddress:null,//当前选中地址{"id":38652,"uid":804,"contacts":"damocs","gender":1,"province":310000,"province_name":"上海市","city":310100,"city_name":"上海市","district":310112,"district_name":"闵行区","address":"上海市闵行区看看啦啦\n","address_desc":"看看啦啦\n","address_name":"江柳路200弄","lng":"121.498381","lat":"31.102194","cookie_code":"de1018fd504ca92e5c81d0f880e882e6","create_at":1484651895,"update_at":1484651895,"isdel":0,"selected":true}
  },
  
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var backOnSelected = options.autoback;
    this.setData({
      backOnSelected:backOnSelected
    })
  },

  onShow:function(){
    //获取地址列表
    this.loadAddressList();
  },

  //获取地址列表
  loadAddressList:function(){
    var that = this;
    httpTool.getAddressList(function(data){
      that.setData({
        addressList:data
      })
      //遍历找到当前选中项
      for(var addr in that.data.addressList){
        if(addr.selected == true){
          that.setData({
            selectedAddress:addr
          })
          wx.setStorageSync(config.storageKeys.selectedAddress, addr);
          break;
        }
      }
    },function(msg){
      wx.showToast({
        title: '获取地址列表失败',
        content: msg,
        duration: 2000
      });
    })
  },

  selectAddress:function(e){
    var index = e.currentTarget.dataset.idx;
    var selectedAddress = this.data.addressList[index];
    if(this.data.selectedAddress!=null){
      this.data.selectedAddress.selected = false;
    }
    selectedAddress.selected = true;
    this.setData({
      selectedAddress:selectedAddress
    })
    //缓存选中的地址
    wx.setStorageSync(config.storageKeys.selectedAddress, selectedAddress);
    //返回前一页
    if(this.data.backOnSelected == true){
      wx.navigateBack();
    }
  },

  addAddress:function(e){
     wx.navigateTo({
			  url: "../addAddress/addAddress"
		 })
  }
})