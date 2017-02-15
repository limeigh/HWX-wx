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
		phone:"",
    code:"",
    selectedAddress:null,//{"id":38652,"uid":804,"contacts":"damocs","gender":1,"province":310000,"province_name":"上海市","city":310100,"city_name":"上海市","district":310112,"district_name":"闵行区","address":"上海市闵行区看看啦啦\n","address_desc":"看看啦啦\n","address_name":"江柳路200弄","lng":"121.498381","lat":"31.102194","cookie_code":"de1018fd504ca92e5c81d0f880e882e6","create_at":1484651895,"update_at":1484651895,"isdel":0,"selected":true}
    date:"",
    time:"",
    totalPrice:0,//总金额
    remark:"",
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
        plan:selectedPlan,
        totalPrice:Number(selectedPlan.Price)+Number(selectedPlan.brand_home_visit_fee)+Number(selectedPlan.brand_manual_fee)
      })
    }catch(e){
    }
    //设置默认时间
    var nowDate = new Date();
    this.setData({
      date: nowDate.getFullYear()+'-'+nowDate.getMonth()+'-'+nowDate.getDate(),
      time: nowDate.getHours()+':' + nowDate.getMinutes()
    })
  },

  onShow:function(){
    //自动获取地址，手机号等信息
    this.loadUserData();
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
          phone:"",
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
    this.setData({
      phone: e.detail.value
    })
  },

  inputCode:function(e){
    this.setData({
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
    this.setData({
      remark: e.detail.value
    })
  },
       
  selectAddress:function(){
     wx.navigateTo({
      //  url: "../../personal/addressList/addressList?autoback=1",
       url: "../../personal/addAddress/addAddress?autoback=1",
     })
  },

  sendCode:function(e){
     var that = this;
     httpTool.getVerifyCode.call(that,that.data.phone,function(){
       wx.showToast({
        title: '已发送' + that.data.phone,
      })
     },function(msg){
       wx.showToast({
        title: msg,
       })
     }) 
  },

  submit:function(){
    var that = this;
    if (app.globalData.hwxUserInfo != null) {
      //已登录用户，直接提交
      this.createOrder();
    }else{
      //否则先去登录
      httpTool.doLoginWithPhone.call(that,that.data.phone,that.data.code,function(data){
        app.setUserInfo(data);//缓存登录状态
        that.createOrder();//提交订单
      },function(msg){
        wx.showToast({
          content:msg
        })
      });
    }
  },

  createOrder:function(){
    var that = this;
    var timeString = that.data.date + " " + that.data.time;
    var reserveTime = Date.parse(new Date(timeString)) / 1000; //时间戳
    httpTool.createOrder.call(that,that.data.plan.Id,that.data.mouldId,that.data.colorId,that.data.phone,that.data.selectedAddress.contacts,that.data.selectedAddress.city,that.data.selectedAddress.district,that.data.selectedAddress.address,reserveTime,that.data.remark,that.data.selectedAddress.lng,that.data.selectedAddress.lat,that.data.couponId,that.data.protectFlag,function(data){
      wx.showToast({
        content:"下单成功,订单："+data
      })
      that.goToOrderDetail(data);
    },function(msg){
      wx.showToast({
        content:msg
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