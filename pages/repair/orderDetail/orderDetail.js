var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var util = require('../../../util/util')
var amap = require('../../../libs/amap-wx.js')
var app = getApp()

Page({
  data:{
    orderId:null,
    order:null,
    map:{
      lat:0, //地图中心点的lat
      lng:0, //地图中心点的lng
      workerMarker:{
        id:0, //用户位置
        iconPath: "/img/loc_marker.png",//要切图，，，
        latitude: 0,
        longitude: 0,
      },
      userMarker:{
        id:1, //工程师位置
        iconPath: "/img/loc_marker.png",//要切图，，，
        latitude: 0,
        longitude: 0,
      }
    },
    statusTitles:["订单已取消","订单处理中","订单已预约","工程师出发","维修完成","订单完成","维修中","门店维修中"],
    statusIcons:["/img/order_cancelled.png","/img/order_created.png","/img/order_assigned.png","/img/order_setoff.png","/img/order_unpaid.png","/img/order_done.png","/img/order_setoff.png","/img/order_setoff.png"]
  },
  
  //{"code":200,"data":{"id":"395720","uName":"damocs","uMobile":"13600887234","address":"上海市闵行区看看啦啦\n","brand_warranty_status":"0","color":"黑/白/金","BrandName":"苹果","MouldName":"iPhone6","RepairType":"更换总成对换(质保180天)旧屏收回","brand_home_visit_fee":"0.00","brand_manual_fee":"0.00","rp_id":"47","FaultType":"屏幕","FaultTypeDetail":"外屏碎（显示正常）","WarrantyPeriod":"","warranty":"180","createTime":"1484810681","reserveTime":"2147483647","ReserveVisitTime":2147487247,"RepairNumber":"","TotalAccount":"3249.00","repairprice":"3249.00","status":0,"payStatus":0,"is_comment":0,"area":"上海","remark":"lalal","city":"310100","selfRemark":"","RepairPerson":"","visit_at":"0","ProductName":"手机","FinishTime":null,"payTime":null,"allowExtraPrice":"0","extraPrice":"0.00","is_fixed":"未知","is_miss":"未知","is_wet":"未知","is_deformed":"未知","is_recycle":"未知","is_used":"未知","is_normal":"未知","coupon":0,"moudleid":31,"brandid":24,"r_price":"","rName":"","rMobile":"","FaultTypeId":"34","ProductId":"15","img":"https://pic.hiweixiu.com/images/uploadImg/modelImg/20160415/20160415101853_31560.png","colorsId":"23",
  //"receipt_data":{"receipt_status":0,"receipt_msg":"未申请","receipt_view":0},"WarrantyPeriodMsg":"本订单由Hi维修和中国人保提供售后保障服务。维修完成后针对故障点质保180天。","show_pay":false,"show_weixin_pay":true,"show_alipay_pay":true,"show_cmbpay_pay":true,"detail_url":"https://m.hiweixiu.com/embedded/show-fault-detail?fid=34","time":"2147483647"}}

  onLoad:function(options){
    this.setData({
      orderId:options.id,
    })
  },

  onShow:function(){
    //获取订单详情
    this.getOrderDetail();
  },
  
  //获取订单详情
  getOrderDetail:function(){
    var that = this;
    httpTool.getOrderDetail.call(that,that.data.orderId,function(data){
      //生成页面展示相关数据
      that.processOrderData(data);
      //更新工程师/用户位置
      that.updateLocations(data.status,data.RepairPerson);
    },function(msg){
      wx.showToast({
        title:msg
      })
    });
  },

  //更新工程师/用户位置
  updateLocations:function(status,workerId){
    if(status != 3){ return;} //不是已出发状态状态，则无需展示地图位置
    this.updateMyLocation();
    this.updateWorkerLocation(workerId);
  },

  //更新用户位置
  updateMyLocation:function(){
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
      //   that.setData({
      //     workerLoc:{
      //       lng:data.longitude,
      //       lat:data.latitude,
      //       markers: [{
      //       iconPath: "/img/loc_marker.png",
      //       longitude: data.longitude,
      //       latitude: data.latitude,
      //     }],
      //   }
      // })
      }
    })
  },
  
  //工程师位置
  updateWorkerLocation:function(workerId){
    var that = this;
    httpTool.getWorkerLocation.call(that,workerId,function(data){
      // that.setData({
      //   workerLoc:{
      //     lng:data.longitude,
      //     lat:data.latitude,
      //     markers: [{
      //       iconPath: "/img/loc_marker.png",
      //       longitude: data.longitude,
      //       latitude: data.latitude,
      //     }],
      //   }
      // })
    },function(msg){
      wx.showToast({
        title:msg
      })
    });
  },

  //生成UI展示数据
  processOrderData:function(order){
    var status = order.status;
    //1.状态名称
    order.statusTitle = this.data.statusTitles[status]?this.data.statusTitles[status]:"订单状态未知"; 
    //2.状态描述
    var statusDesc = order.statusTitle; //默认
    switch(status){
      case 1: statusDesc = "请注意客服来电，与您进一步确认维修信息"; break;
      case 2: statusDesc = "预约上门时间为：" + util.getLocalTime(order.reserveTime); break;
      case 3: statusDesc = "工程师正在上门中，工程师" + order.rName +"（工号）已出发"; break;
      case 4: 
      case 5: 
          if(order.payStatus == 0){//未支付
              statusDesc = "设备已维修完成，等待您的确认支付";
          }else{ 
              statusDesc = "免费上门保修日期截至" + order.WarrantyPeriod;
          }
          break;
    } 
    order.statusDesc = statusDesc;
    //3.状态图标
    order.statusIcon = this.data.statusIcons[status]?this.data.statusIcons[status]:"/img/order_cancelled"; //?默认图标？
    
    //end 更新数据
    this.setData({
      order:order
    })
  }

})