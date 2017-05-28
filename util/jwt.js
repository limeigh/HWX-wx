
var config = require('../comm/script/config')
var base64 = require('./base64.js')
var sha256 = require('./hmacsha256.js')
var app = getApp()

/**
 *  生成JWT的token
 */
function jwtToken(){
  if(app.globalData.hwxUserInfo == null){
      return null;
  }
  // console.log("user = " + JSON.stringify(app.globalData.hwxUserInfo));
  var header = {
    "typ": "JWT",
    "alg": "HS256"
  }
  var timeDiff = app.globalData.timeDifference; //时间差
  var timestamp = parseInt(new Date().getTime() / 1000);  //当前客户端时间
  var iat = Number(timestamp) + Number(timeDiff);
  var exp = Number(iat) + Number(60*10);
  var user = app.globalData.hwxUserInfo;
  var payload = {
    "sub":"userapp",
    "iat":iat,
    "exp":exp,
    "username":user.UserName?user.UserName:"",
    "iss":"hiweixiu",
    "userid":user.Id?user.Id:""
  }
  var jwtHeader = base64.base64encode(JSON.stringify(header));
  var jwtPayload = base64.base64encode(JSON.stringify(payload));
  var jwtHash = sha256.b64_hmac_sha256(config.jwtKey,jwtHeader+"."+jwtPayload);
  var token = jwtHeader+"."+jwtPayload+"."+jwtHash;

  // console.log("jwtHeader:"+JSON.stringify(header)+"\njwtPayload:"+JSON.stringify(payload)+"\nhash:"+jwtHash);
  return token;
}

module.exports = {
    jwtToken:jwtToken
} 

// var test = {
//         "typ": "JWT",
//        "alg": "HS256"
//     }
//   //   var test = {
//   //       exp : 1484726601,
// 	// username : "13600887234",
// 	// iss : "hiweixiu",
// 	// userid : "804",
// 	// sub : "userapp",
// 	// iat : 1484726001
//   //   }
//     var result = base64.base64encode(JSON.stringify(test));
//     console.log("result "+ result + " test "+ JSON.stringify(test));
//     var hash = sha256.b64_hmac_sha256("mipvssjx7sqebrszg2pjprdf9syseecu","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0ODQ3Mjk5NTQsInVzZXJuYW1lIjoiMTM2MDA4ODcyMzQiLCJpc3MiOiJoaXdlaXhpdSIsInVzZXJpZCI6IjgwNCIsInN1YiI6InVzZXJhcHAiLCJpYXQiOjE0ODQ3MjkzNTR9");
//     console.log("hash = "+hash);