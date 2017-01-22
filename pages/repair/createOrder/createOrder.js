var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var app = getApp()

Page({
  data: {
    mouldId:null,//机型id
    mouldName:null,//机型名称
    colorId:null,//颜色id
    plan:null,//维修方案数据
    hasLogin:false,//用户是否已登录
		phone:null,
    code:null,
    selectedAddress:null,//{"id":38652,"uid":804,"contacts":"damocs","gender":1,"province":310000,"province_name":"上海市","city":310100,"city_name":"上海市","district":310112,"district_name":"闵行区","address":"上海市闵行区看看啦啦\n","address_desc":"看看啦啦\n","address_name":"江柳路200弄","lng":"121.498381","lat":"31.102194","cookie_code":"de1018fd504ca92e5c81d0f880e882e6","create_at":1484651895,"update_at":1484651895,"isdel":0,"selected":true}
    date:'',
    time:'',
    remark:null,
    couponId:null,
    protectFlag:null,
	},

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      mouldId:options.mouldId,
      mouldName:options.mouldName,
      colorId:options.color,
    }) 
    //获取选择的维修方案
    try{
      var selectedPlan = wx.getStorageSync(config.storageKeys.selectedPlan);
      this.setData({
        plan:selectedPlan
      })
    }catch(e){
    }
  },

  onShow:function(){
    var that = this;
    //自动获取地址，手机号等信息
    that.loadUserData();
  },
  
  loadUserData:function(){
    var that = this;
    if (app.globalData.hwxUserInfo != null) {//已登录的用户
       that.setData({
         phone:app.globalData.hwxUserInfo.UserName,
         hasLogin:true
       })
    }else{
       that.setData({
          phone:null,
          hasLogin:false
        })
    }
     //获取当前选择的地址
     try{
      var selectedAddress = wx.getStorageSync(config.storageKeys.selectedAddress);
      if(selectedAddress != null && selectedAddress!=""){
        that.setData({
          selectedAddress:selectedAddress        
        })
      }
     }catch(e){
     }
  },

  inputPhone:function(e){
    var that = this;
    that.setData({
      phone: e.detail.value
    })
  },

  inputCode:function(e){
    var that = this;
    that.setData({
      code: e.detail.value
    })
  },

  bindDateChange:function(e){
    this.setData({
      date: e.detail.value
    })
  },

  bindTimeChange:function(e){
    this.setData({
      time: e.detail.value
    })
  },

  inputDetail:function(e){
    var that = this;
    that.setData({
      remark: e.detail.value
    })
  },
       
  selectAddress:function(){
     wx.navigateTo({
       url: "../../personal/addressList/addressList?autoback=1",
     })
  },

  submit:function(){
    var that = this;
    if (app.globalData.hwxUserInfo != null) {
      //已登录用户，直接提交
      that.createOrder();
    }else{
      //否则先去登录
      httpTool.doLoginWithPhone.call(that,that.data.phone,that.data.code,function(data){
        app.setUserInfo(data);//缓存登录状态
        that.createOrder();//提交订单
      },function(msg){
        wx.showToast({
          content:"请求失败,"+msg
        })
      });
    }
  },

  createOrder:function(){
    var that = this;
    var timeString = that.data.date + " " + that.data.time;
    var reserveTime = Date.parse(new Date(timeString));
    httpTool.createOrder.call(that,that.data.plan.Id,that.data.mouldId,that.data.colorId,that.data.phone,that.data.selectedAddress.contacts,that.data.selectedAddress.city,that.data.selectedAddress.district,that.data.selectedAddress.address,reserveTime,that.data.remark,that.data.selectedAddress.lng,that.data.selectedAddress.lat,that.data.couponId,that.data.protectFlag,function(data){
      wx.showToast({
        content:"下单成功,订单："+data
      })
      that.goToOrderDetail(data);
    },function(msg){
      wx.showToast({
        content:"请求失败,"+msg
      })
    })
  },

  //前往订单详情页面
  goToOrderDetail:function(id){
    wx.redirectTo({
      url: "../orderDetail/orderDetail?id="+id,
    })
  }

})