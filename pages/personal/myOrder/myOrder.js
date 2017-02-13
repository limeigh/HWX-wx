var httpTool = require('../../../comm/script/fetch')
var config = require('../../../comm/script/config')
var util = require('../../../util/util')
var app = getApp()

Page({
  data:{
    orderList:[],
    currentPage: 0, //默认第一页
    currentCount:0,
    totalCount: 0,  //总数
    hasMore:true,

    repairStatusTitles:["订单已取消","订单处理中","订单已预约","工程师出发","维修完成","订单完成","维修中","门店维修中"],
  
    recycleStatusTitles:["订单处理中","已成功预约","工程师上门中","回收完成","订单已取消","订单状态未知"],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.loadOrderList();
  },
  
  loadOrderList:function(){
    var that = this;
    var nextPage = Number(that.data.currentPage) + 1;
    httpTool.getMyOrders.call(that,nextPage,0,true,function(data){
      
      for (var i=0;i<data.data.length;i++){
        if (data.data[i].type == '1') {
          console.log("mmm" + data.data[i].status);
          var status = data.data[i].status;
          data.data[i].key = that.data.repairStatusTitles[status]?that.data.repairStatusTitles[status]:"订单状态未知";
        }else if (data.data[i].type == '3') {
          data.data[i].key = that.data.recycleStatusTitles[status]?that.data.recycleStatusTitles[status]:"订单状态未知";
        }
        // data.data[0].key = that.setupOrderStatusTitle(data.data[i]);
      }

      that.setData({
        orderList:that.data.orderList.concat(data.data),
        currentPage:data.info.p,
        totalCount:data.info.sum
      })

      


      
      console.log('lisidi'+ that.data.orderList.length);
      // console.log('cur'+ that.data.currentCount);
      var count = Number(that.orderList.length);
      if(count==that.data.totalCount) {
        that.setData({
          hasMore:false
        })
      }else {
        that.setData({
          hasMore:true
        })
      }
    },function(msg){
      wx.showToast({
        content:msg
      })
    })
  },

  selectOrder:function(e){
    var that = this;
    var index = e.currentTarget.dataset.idx;
    var order = that.data.orderList[index];
    wx.navigateTo({
      url: '../../repair/orderDetail/orderDetail?id='+order.id,
    })
  },

  setupOrderStatusTitle:function(order){
    var status = order.status;
    if (order.type == '1') {
       order.statusTitle = this.data.repairStatusTitles[status]?this.data.statusTitles[status]:"订单状态未知";
    }else if (order.type == '2') {
      order.statusTitle = this.data.recycleStatusTitles[status]?this.data.statusTitles[status]:"订单状态未知";
    }else {
      order.statusTitle = '';
    }
    // //1.状态名称
    // order.statusTitle = this.data.statusTitles[status]?this.data.statusTitles[status]:"订单状态未知"; 
    // //2.状态描述
    // var statusDesc = order.statusTitle; //默认
    // switch(status){
    //   case 1: statusDesc = "请注意客服来电，与您进一步确认维修信息"; break;
    //   case 2: statusDesc = "预约上门时间为：" + util.getLocalTime(order.reserveTime); break;
    //   case 3: statusDesc = "工程师正在上门中，工程师" + order.rName +"（工号）已出发"; break;
    //   case 4: 
    //   case 5: 
    //       if(order.payStatus == 0){//未支付
    //           statusDesc = "设备已维修完成，等待您的确认支付";
    //       }else{ 
    //           statusDesc = "免费上门保修日期截至" + order.WarrantyPeriod;
    //       }
    //       break;
    // } 
    // order.statusDesc = statusDesc;
    // //3.状态图标
    // order.statusIcon = this.data.statusIcons[status]?this.data.statusIcons[status]:"/img/order_cancelled"; //?默认图标？
    
    //end 更新数据
    return order.statusTitle;
  }

})