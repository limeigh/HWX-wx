/*
备注
baseUrl：用户端userapi域名
jwtKey: userapi的jwt哈希加密key
apiList：各接口路径
apiCodef：接口返回code约定
stringList：通用字符串，提示语等等
*/
var baseUrl = "https://userapi.hiweixiu.com/";
module.exports = {
    jwtKey:"mipvssjx7sqebrszg2pjprdf9syseecu",
    storageKeys:{
        timeDifference:"kTimeDifference", //JWT客户端与服务器的时间差
        currentDevice:"kCurrentDevice",//当前设备信息（hi维修数据）
        currentUser:"kCurrentUser",//当前登录用户信息（hi维修数据）
        //页面间传值
        selectedAddress:"kSelectedAddress",//当前选择的地址（地址列表页面->下单页面）
        selectedDevice:"kSelectedDevice",//创建订单订单->当前选择机型
        selectedPlan:"kSelectedPlan",//创建订单->当前选择维修方案
    },
    apiList: {
        faultList: baseUrl + 'fault/mould-fault',   //首页故障列表
        deviceInfo: baseUrl + 'moiblemould/getids', 
        getColors: baseUrl + 'colors/get-colors',
        warrantyOption: baseUrl + 'moiblemould/get-warranty-option-by-mid',
        repairMsg: baseUrl + 'repairprice/get-repair-msg',
        faultComment: baseUrl + 'comment/new-get-y-comments',
        sendCode: baseUrl + 'hiuser/verificate-code',
        doLogin: baseUrl + 'hiuser/login',
        addressList: baseUrl + 'user/look-address',
        addAddress: baseUrl + 'user/add-address',
        cityInfo: baseUrl + 'region/is-open-city',
        createOrder: baseUrl + 'order/new-create-order',
        orderDetail: baseUrl + 'order/detail',
        workerLocation: baseUrl + 'order/get-engineer-position',
        brandList: baseUrl + 'moiblemould/get-brand-list',
        mouldList: baseUrl + 'moiblemould/get-mould-list-by-bid',
        orderList: baseUrl + 'order/listnew',
        editName: baseUrl + 'user/edit-name',
        editBirthday: baseUrl + 'user/edit-birthday',
        logout: baseUrl + 'hiuser/logout'
    },
    apiCode:{
        success:200,
        fail:403,
        unauthorized:401,
    },
    strings:{
        requestFail:"请求失败"
    },
    amap:{
        mapKey:"bdf11297e5ab22f3fca852062e0a94f3",//小程序sdkkey
        key:"ad6c2c7a01c2fec89289b2234b841584",
        regeocode:"http://restapi.amap.com/v3/geocode/regeo",

    }
}