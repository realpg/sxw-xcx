//测试标识
var TESTMODE = false;
//服务器地址
var SERVER_URL = "http://xcx.hzmuji.com";
var DEBUG_URL = "http://localhost/sxw-master/public";
var SERVER_URL = (TESTMODE) ? DEBUG_URL : SERVER_URL;


///接口调用相关方法///////////////////////////////////////////

//进行接口调用的基本方法
function wxRequest(url, param, method, successCallback, errorCallback) {
  const App = getApp();
  console.log("wxRequest url:" + JSON.stringify(url) + " param:" + JSON.stringify(param));
  if (judgeIsAnyNullStr(param.code) && judgeIsAnyNullStr(param.openId)) {


    if (!App) {
      setTimeout(function() {
        wxRequest(url, param, method, successCallback, errorCallback);
      }, 200)
      return;
    }
    if (judgeIsAnyNullStr(App.globalData.userInfo)) {
      setTimeout(function() {
        wxRequest(url, param, method, successCallback, errorCallback);
      }, 200)
      return;
    } else if (judgeIsAnyNullStr(App.globalData.userInfo._token)) {
      setTimeout(function() {
        wxRequest(url, param, method, successCallback, errorCallback);
      }, 200)
      return;
    }
  }


  if (!judgeIsAnyNullStr(App.globalData.userInfo)) {
    //user_id未设置
    if (judgeIsAnyNullStr(param.userid)) {
      param.userid = App.globalData.userInfo.userid;
    }
    param._token = App.globalData.userInfo._token;
  }
  //  showLoading();
  var time_start = new Date().getTime();
  // console.log("param：" + JSON.stringify(param))
  wx.request({
    url: url,
    data: param,
    header: {
      "content-Type": "application/json"
    },
    // header: { 'content-type': 'application/x-www-form-urlencoded' },
    method: method,
    success: function(ret) {
      var time_end = new Date().getTime();
      console.log("请求时间", time_end - time_start);
      if (ret.data.result)
        successCallback(ret.data.ret);
      else {
        if (ret.data.code == '102') {
          setTimeout(function() {
            wxRequest(url, param, method, successCallback, errorCallback);
          }, 500)
        } else wx.showToast({
          title: ret.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    },
    fail: function(err) {
      // console.log("wxRequest fail:" + JSON.stringify(err))

    },
    complete: function(ret) {
      console.log("ret:" + JSON.stringify(ret))
      setTimeout(function() {
        // hideLoading()
      }, 2000)
    }
  });
}

function getImgRealUrl(key_v) {
  return "http://dsyy.isart.me/" + key_v;
}

//获取用户的OpenId
function getOpenId(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/getOpenid', param, "GET", successCallback, errorCallback);
}

//登录
function login(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/user/login', param, "POST", successCallback, errorCallback);
}

//登录
function test(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/test', param, "GET", successCallback, errorCallback);
}

function getByConditions(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/buy/getByCondition', param, "GET", successCallback, errorCallback);
}

function getAllList(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/info/getList', param, "GET", successCallback, errorCallback);
}

function getSellList(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sell/getList', param, "GET", successCallback, errorCallback);
}

function getFJMYList(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/fjmy/getList', param, "GET", successCallback, errorCallback);
}

function getBuyList(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/buy/getList', param, "GET", successCallback, errorCallback);
}

function sellEdit_get(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sell/edit', param, "GET", successCallback, errorCallback);
}

function sellEdit_post(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sell/edit', param, "POST", successCallback, errorCallback);
}

//求购
function buyEdit_get(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/buy/edit', param, "GET", successCallback, errorCallback);
}

function buyEdit_post(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/buy/edit', param, "POST", successCallback, errorCallback);
}

//纺机贸易
function fjmyEdit_get(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/fjmy/edit', param, "GET", successCallback, errorCallback);
}

function fjmyEdit_post(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/fjmy/edit', param, "POST", successCallback, errorCallback);
}

function getBanner(param, successCallback, errorCallback) {
  param.pid = "1";
  wxRequest(SERVER_URL + '/api/ad/getByPid', param, "GET", successCallback, errorCallback);
}

function getSystemKeyValue(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/system/getKeyValue', param, "GET", successCallback, errorCallback);
}

function editInfo_get(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/member/editInfo', param, "GET", successCallback, errorCallback);
}

//签到
function signIn(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/member/clockin', param, "POST", successCallback, errorCallback);
}

//签到历史
function signInList(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/member/clockin/history', param, "GET", successCallback, errorCallback);
}

//名片
function visitingCard(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/businesscard', param, "GET", successCallback, errorCallback);
}

//根据userid获取名片信息
function visitingCardInfo(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/businesscard/getByUserid', param, "GET", successCallback, errorCallback);
}

function editInfo_post(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/member/editInfo', param, "POST", successCallback, errorCallback);
}

//邀请
function getBuyInvited(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/user/invited', param, "GET", successCallback, errorCallback);
}

//广告位
function GetAdvertising(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/ad/selling', param, "GET", successCallback, errorCallback);
}

//指定广告位列表
function GetAdvertisingInfo(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/ad/getByPid', param, "GET", successCallback, errorCallback);
}

//VIP广告位
function GetAdvertisingVIP(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/vip/selling', param, "GET", successCallback, errorCallback);
}

//资讯列表
function InfoList(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/article/getList', param, "GET", successCallback, errorCallback);
}
//根据条件获取资讯列表
function InfoListByCondition(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/article/getByCondition', param, "GET", successCallback, errorCallback);
}

//获取分类列表
function setClassify(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/category/getByMid', param, "GET", successCallback, errorCallback);
}

//种类
function varietyList(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/businesscard/getYWLB', param, "GET", successCallback, errorCallback);
}

//种类名片列表
function reclassifyCard(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/businesscard/getByYWLB', param, "GET", successCallback, errorCallback);
}

//日排行
function todayranking(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/ranking', param, "GET", successCallback, errorCallback);
}

//根据itemid获取资讯详情
function setInfo(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/article/getById', param, "GET", successCallback, errorCallback);
}

//供应
function supplyByUserid(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sell/getByCondition', param, "GET", successCallback, errorCallback);
}

//求购
function PurchaseByUserid(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/buy/getByCondition', param, "GET", successCallback, errorCallback);
}

//纺织贸易
function tradeByUserid(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/fjmy/getByCondition', param, "GET", successCallback, errorCallback);
}

//供应信息详情
function sellInfoDetails(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sell/getById', param, "GET", successCallback, errorCallback);
}

//求购信息详情
function buyInfoDetails(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/buy/getById', param, "GET", successCallback, errorCallback);
}

//求购信息详情
function tradeInfoDetails(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/fjmy/getById', param, "GET", successCallback, errorCallback);
}

//发送留言
function leaveWord(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/comment', param, "POST", successCallback, errorCallback);
}

//收藏
function enshrine(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/favorite', param, "POST", successCallback, errorCallback);
}

//购买vip
function payVIP(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/vip/buy', param, "POST", successCallback, errorCallback);
}

//购买指定广告位
function payAssign(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/ad/buy', param, "POST", successCallback, errorCallback);
}


//供应信息详情
function SupplySearch(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sell/search', param, "POST", successCallback, errorCallback);
}

//求购信息详情
function BuySearch(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/buy/search', param, "POST", successCallback, errorCallback);
}

//纺机信息详情
function FrameSearch(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/fjmy/search', param, "POST", successCallback, errorCallback);
}

//我的发布_供应
function sellList_mine(param, successCallback, errorCallback) {
  param.conditions = JSON.stringify({
    key: ["userid"],
    value: [getApp().globalData.userInfo.userid]
  })
  wxRequest(SERVER_URL + '/api/sell/getByCondition', param, "GET", successCallback, errorCallback);
}
//我的发布_求购
function buyList_mine(param, successCallback, errorCallback) {
  param.conditions = JSON.stringify({
    key: ["userid"],
    value: [getApp().globalData.userInfo.userid]
  })
  wxRequest(SERVER_URL + '/api/buy/getByCondition', param, "GET", successCallback, errorCallback);
}
//我的发布_纺机
function fjmyList_mine(param, successCallback, errorCallback) {
  param.conditions = JSON.stringify({
    key: ["userid"],
    value: [getApp().globalData.userInfo.userid]
  })
  wxRequest(SERVER_URL + '/api/fjmy/getByCondition', param, "GET", successCallback, errorCallback);
}
//获取广告位首页推荐
function homepage_recommend(param, successCallback, errorCallback) {
  param.pid = "2";
  wxRequest(SERVER_URL + '/api/ad/getByPid', param, "GET", successCallback, errorCallback);
}
//获取广告位名片推荐
function card_recommend(param, successCallback, errorCallback) {
  param.pid = "3";
  wxRequest(SERVER_URL + '/api/ad/getByPid', param, "GET", successCallback, errorCallback);
}
//获取验证码
function sendVertifyCode(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/member/sendVertifyCode', param, "POST", successCallback, errorCallback);
}
//点赞
function setLike(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/agree', param, "POST", successCallback, errorCallback);
}
//我的收藏
function myFavorite(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/myFavorite', param, "GET", successCallback, errorCallback);
}
//我的消息
function myMessage(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/member/message', param, "GET", successCallback, errorCallback);
}


function uploadImage(param, successCallback, errorCallback) {
  wx.uploadFile({
    url: SERVER_URL + '/api/uploadImage',
    filePath: param.file,
    name: 'file',
    formData: {
      userid: getApp().globalData.userInfo.userid,
      _token: getApp().globalData.userInfo._token
    },
    success: function(ret) {
      // console.log("ret:" + JSON.stringify(ret))
      if (typeof(ret.data) == "string") {
        // console.log(typeof (ret.data))
        ret.data = JSON.parse(ret.data);
      }

      if (ret.data.result)
        successCallback(ret.data.ret);
      else {
        // console.log(ret);
        wx.showToast({
          title: ret.data.message ? ret.data.message : "未知错误",
          icon: 'none',
          duration: 2000
        })
      }
    },
    fail: function(err) {
      // console.log("wxRequest fail:" + JSON.stringify(err))

    },
    complete: function() {
      // hideLoading()
    }
  })
}

const formatNumber = function(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//判断是否有空字符串
function judgeIsAnyNullStr() {
  if (arguments.length > 0) {
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i] == null || arguments[i] == "" || arguments[i] == undefined || arguments[i] == "undefined" || arguments[i] == "未设置") {
        return true;
      }
    }
  }
  return false;
}


//展示toast
function showToast(msg, img) {
  // console.log(img);
  if (judgeIsAnyNullStr(img)) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 1500,
    })
  } else {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 1500,
      image: img
    })
  }
}

//展示modal
function showModal(title, content, confirmCallBack, cancelCallBack) {
  wx.showModal({
    title: title,
    content: content,
    success: function(res) {
      if (res.confirm) {
        console.log('用户点击确定')
        confirmCallBack(res)
      } else if (res.cancel) {
        console.log('用户点击取消')
        cancelCallBack(res)
      }
    }
  })
}

//错误modal
function showErrorModal(msg) {
  wx.showModal({
    title: '调用失败',
    content: msg,
    success: function(res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}

//展示loadding
function showLoading(msg) {
  if (!wx.canIUse('showLoading')) {
    return;
  }
  if (judgeIsAnyNullStr(msg)) {
    msg = "加载中";
  }
  wx.showLoading({
    title: msg,
  })
}

//隐藏loadding
function hideLoading() {
  if (!wx.canIUse('hideLoading')) {
    return;
  }
  wx.hideLoading();
}

const formatTime = function(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatDate = function(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}

//优化字符串输出，如果str为空，则返回r_str
function conStr(str, r_str) {
  if (judgeIsAnyNullStr(str)) {
    return r_str;
  }
  return str;
}


//跳转到主页
function navigateToIndex(param) {
  // console.log("navigateToIndex" + JSON.stringify(param));
  wx.navigateTo({
    url: 'pages/index/index?jsonStr=' + JSON.stringify(param),
  })

}

//跳转到注册页面
function navigateToRegister(param) {

  // console.log("navigateToRegister" + JSON.stringify(param));
  wx.navigateTo({
    url: '/pages/register/register?jsonStr=' + JSON.stringify(param),
  })
}


//---------------------------------------------------  
// 判断闰年  
//---------------------------------------------------  
Date.prototype.isLeapYear = function() {
  return (0 == this.getYear() % 4 && ((this.getYear() % 100 != 0) || (this.getYear() % 400 == 0)));
}

//---------------------------------------------------  
// 日期格式化  
// 格式 YYYY/yyyy/YY/yy 表示年份  
// MM/M 月份  
// W/w 星期  
// dd/DD/d/D 日期  
// hh/HH/h/H 时间  
// mm/m 分钟  
// ss/SS/s/S 秒  
//---------------------------------------------------  
Date.prototype.Format = function(formatStr) {
  var str = formatStr;
  var Week = ['日', '一', '二', '三', '四', '五', '六'];

  str = str.replace(/yyyy|YYYY/, this.getFullYear());
  str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

  str = str.replace(/MM/, this.getMonth() > 9 ? this.getMonth().toString() : '0' + this.getMonth());
  str = str.replace(/M/g, this.getMonth());

  str = str.replace(/w|W/g, Week[this.getDay()]);

  str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
  str = str.replace(/d|D/g, this.getDate());

  str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
  str = str.replace(/h|H/g, this.getHours());
  str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
  str = str.replace(/m/g, this.getMinutes());

  str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
  str = str.replace(/s|S/g, this.getSeconds());

  return str;
}

//+---------------------------------------------------  
//| 求两个时间的天数差 日期格式为 YYYY-MM-dd   
//+---------------------------------------------------  
function daysBetween(DateOne, DateTwo) {
  var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
  var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
  var OneYear = DateOne.substring(0, DateOne.indexOf('-'));

  var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
  var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
  var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));

  var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
  return Math.abs(cha);
}


//+---------------------------------------------------  
//| 日期计算  
//+---------------------------------------------------  
Date.prototype.DateAdd = function(strInterval, Number) {
  var dtTmp = this;
  switch (strInterval) {
    case 's':
      return new Date(Date.parse(dtTmp) + (1000 * Number));
    case 'n':
      return new Date(Date.parse(dtTmp) + (60000 * Number));
    case 'h':
      return new Date(Date.parse(dtTmp) + (3600000 * Number));
    case 'd':
      return new Date(Date.parse(dtTmp) + (86400000 * Number));
    case 'w':
      return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
    case 'q':
      return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    case 'm':
      return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    case 'y':
      return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
  }
}

//+---------------------------------------------------  
//| 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串  
//+---------------------------------------------------  
Date.prototype.DateDiff = function(strInterval, dtEnd) {
  var dtStart = this;
  if (typeof dtEnd == 'string') //如果是字符串转换为日期型
  {
    dtEnd = StringToDate(dtEnd);
  }
  switch (strInterval) {
    case 's':
      return parseInt((dtEnd - dtStart) / 1000);
    case 'n':
      return parseInt((dtEnd - dtStart) / 60000);
    case 'h':
      return parseInt((dtEnd - dtStart) / 3600000);
    case 'd':
      return parseInt((dtEnd - dtStart) / 86400000);
    case 'w':
      return parseInt((dtEnd - dtStart) / (86400000 * 7));
    case 'm':
      return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
    case 'y':
      return dtEnd.getFullYear() - dtStart.getFullYear();
  }
}

//+---------------------------------------------------  
//| 日期输出字符串，重载了系统的toString方法  
//+---------------------------------------------------  
Date.prototype.toString = function(showWeek) {
  var myDate = this;
  var str = myDate.toLocaleDateString();
  if (showWeek) {
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str += ' 星期' + Week[myDate.getDay()];
  }
  return str;
}

//+---------------------------------------------------  
//| 日期合法性验证  
//| 格式为：YYYY-MM-DD或YYYY/MM/DD  
//+---------------------------------------------------  
function IsValidDate(DateStr) {
  var sDate = DateStr.replace(/(^\s+|\s+$)/g, ''); //去两边空格;
  if (sDate == '') return true;
  //如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''
  //数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式
  var s = sDate.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g, '');
  if (s == '') //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D
  {
    var t = new Date(sDate.replace(/\-/g, '/'));
    var ar = sDate.split(/[-/:]/);
    if (ar[0] != t.getYear() || ar[1] != t.getMonth() + 1 || ar[2] != t.getDate()) {
      //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
      return false;
    }
  } else {
    //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
    return false;
  }
  return true;
}

//+---------------------------------------------------  
//| 日期时间检查  
//| 格式为：YYYY-MM-DD HH:MM:SS  
//+---------------------------------------------------  
function CheckDateTime(str) {
  var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;
  var r = str.match(reg);
  if (r == null) return false;
  r[2] = r[2] - 1;
  var d = new Date(r[1], r[2], r[3], r[4], r[5], r[6]);
  if (d.getFullYear() != r[1]) return false;
  if (d.getMonth() != r[2]) return false;
  if (d.getDate() != r[3]) return false;
  if (d.getHours() != r[4]) return false;
  if (d.getMinutes() != r[5]) return false;
  if (d.getSeconds() != r[6]) return false;
  return true;
}

//+---------------------------------------------------  
//| 把日期分割成数组  
//+---------------------------------------------------  
Date.prototype.toArray = function() {
  var myDate = this;
  var myArray = Array();
  myArray[0] = myDate.getFullYear();
  myArray[1] = myDate.getMonth();
  myArray[2] = myDate.getDate();
  myArray[3] = myDate.getHours();
  myArray[4] = myDate.getMinutes();
  myArray[5] = myDate.getSeconds();
  return myArray;
}

//+---------------------------------------------------  
//| 取得日期数据信息  
//| 参数 interval 表示数据类型  
//| y 年 m月 d日 w星期 ww周 h时 n分 s秒  
//+---------------------------------------------------  
Date.prototype.DatePart = function(interval) {
  var myDate = this;
  var partStr = '';
  var Week = ['日', '一', '二', '三', '四', '五', '六'];
  switch (interval) {
    case 'y':
      partStr = myDate.getFullYear();
      break;
    case 'm':
      partStr = myDate.getMonth() + 1;
      break;
    case 'd':
      partStr = myDate.getDate();
      break;
    case 'w':
      partStr = Week[myDate.getDay()];
      break;
    case 'ww':
      partStr = myDate.WeekNumOfYear();
      break;
    case 'h':
      partStr = myDate.getHours();
      break;
    case 'n':
      partStr = myDate.getMinutes();
      break;
    case 's':
      partStr = myDate.getSeconds();
      break;
  }
  return partStr;
}

//+---------------------------------------------------  
//| 取得当前日期所在月的最大天数  
//+---------------------------------------------------  
Date.prototype.MaxDayOfDate = function() {
  var myDate = this;
  var ary = myDate.toArray();
  var date1 = (new Date(ary[0], ary[1] + 1, 1));
  var date2 = date1.dateAdd(1, 'm', 1);
  var result = dateDiff(date1.Format('yyyy-MM-dd'), date2.Format('yyyy-MM-dd'));
  return result;
}


//+---------------------------------------------------  
//| 字符串转成日期类型   
//| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd  
//+---------------------------------------------------  
function StringToDate(DateStr) {

  var converted = Date.parse(DateStr);
  var myDate = new Date(converted);
  if (isNaN(myDate)) {
    //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';
    var arys = DateStr.split('-');
    myDate = new Date(arys[0], --arys[1], arys[2]);
  }
  return myDate;
}


// 获取今天日期

function getToday() {
  var now = new Date();
  var today = "";
  var year = now.getFullYear(); //年
  today += year + "-";
  var month = now.getMonth() + 1; //月
  if (month < 10)
    today += "0";
  today += month + "-";
  var day = now.getDate(); //日
  if (day < 10)
    today += "0";
  return year + "-" + month + "-" + day;
}

//验证手机号
function phonenum_verify(phone) {
  var phoneReg = /(^1[3|4|5|6|7|8]\d{9}$)|(^09\d{8}$)/;
  if (!phoneReg.test(phone)) {
    return false;
  }
  return true;
}

module.exports = {
  getOpenId: getOpenId,
  login: login,
  test: test,
  getByConditions: getByConditions,
  getAllList: getAllList,

  getSellList: getSellList,
  getBuyList: getBuyList,
  getFJMYList: getFJMYList,
  getBanner: getBanner,
  sellEdit_get: sellEdit_get,
  sellEdit_post: sellEdit_post,
  buyEdit_get: buyEdit_get,
  buyEdit_post: buyEdit_post,
  fjmyEdit_get: fjmyEdit_get,
  fjmyEdit_post: fjmyEdit_post,
  uploadImage: uploadImage,
  getSystemKeyValue: getSystemKeyValue,
  editInfo_get: editInfo_get,
  editInfo_post: editInfo_post,
  signInList: signInList,
  signIn: signIn,
  visitingCard: visitingCard,
  getBuyInvited: getBuyInvited,
  GetAdvertising: GetAdvertising,
  GetAdvertisingInfo: GetAdvertisingInfo,
  GetAdvertisingVIP: GetAdvertisingVIP,
  InfoList: InfoList,
  setClassify: setClassify,
  InfoListByCondition: InfoListByCondition,
  setInfo: setInfo,
  varietyList: varietyList,
  todayranking: todayranking,
  reclassifyCard: reclassifyCard,
  visitingCardInfo: visitingCardInfo,
  supplyByUserid: supplyByUserid,
  PurchaseByUserid: PurchaseByUserid,
  tradeByUserid: tradeByUserid,
  sellInfoDetails: sellInfoDetails,
  buyInfoDetails: buyInfoDetails,
  tradeInfoDetails: tradeInfoDetails,
  leaveWord: leaveWord,
  SupplySearch: SupplySearch,
  BuySearch: BuySearch,
  FrameSearch: FrameSearch,
  setLike: setLike,
  enshrine: enshrine,
  payVIP: payVIP,
  payAssign: payAssign,

  sellList_mine: sellList_mine,
  buyList_mine: buyList_mine,
  fjmyList_mine: fjmyList_mine,
  homepage_recommend: homepage_recommend,
  card_recommend: card_recommend,
  sendVertifyCode: sendVertifyCode,
  myFavorite: myFavorite,
  myMessage: myMessage,

  formatTime: formatTime,
  formatDate: formatDate,
  showLoading: showLoading,
  hideLoading: hideLoading,
  showToast: showToast,
  showModal: showModal,
  judgeIsAnyNullStr: judgeIsAnyNullStr,
  navigateToRegister: navigateToRegister, //跳转到注册页面
  getToday: getToday,
  phonenum_verify: phonenum_verify
}