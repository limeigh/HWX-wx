/*
备注
baseUrl：用户端userapi域名
apiList：各接口路径
apiCodef：接口返回code约定
stringList：通用字符串，提示语等等
*/
var baseUrl = "https://userapi.hiweixiu.com/";
module.exports = {
    apiList: {
        faultList: baseUrl + 'fault/mould-fault',
        deviceInfo: baseUrl + 'moiblemould/getids',
        getColors: baseUrl + 'colors/get-colors',
        repairMsg: baseUrl + 'repairprice/get-repair-msg',
        faultComment: baseUrl + 'comment/new-get-y-comments',
        sendCode: baseUrl + 'hiuser/verificate-code',
        doLogin: baseUrl + 'hiuser/login',
        addressList: baseUrl + 'user/look-address',
    },
    apiCode:{
        success:200,
        fail:403,
        unauthorized:401,
    },
    strings:{
        requestFail:"请求失败"
    },
    bannerList: [
        {type:'banner', id: '', imgUrl: 'https://pic.hiweixiu.com/images/userapi/mould-fault/FreeFilm1.png?v=20161104'},
    ],
}