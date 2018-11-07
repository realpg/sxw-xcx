//app.js

const util = require('/utils/util.js');
App({
  onLaunch: function() {
    // 展示本地存储能力
    //获取设备信息
    var app = this
    wx.getSystemInfo({
      success: function(res) {
        app.globalData.SystemInfo = res
      },
    })
    console.log("设备信息", app.globalData.SystemInfo)
    this.globalData.DTuserInfo = wx.getStorageSync('DTUserInfo') || null
    this.globalData.wx_userInfo = wx.getStorageSync('wx_userInfo') || null

  },
  onShow:function(){
    // console.log(this);
  },
  getopenid: function(cb) {
    var app = this;

    app.util.getUserInfo(function (userinfo) {
      console.log("userinfo", userinfo)
      app.util.request({
        url: "entry/wxapp/get_openid",
        method: "GET",
        data: {
          m: "jf_aa"
        },
        success: function e(res) {
          console.log('success', res);
          app.globalData.openId = res.data.data;
          app.login(app,cb)
        }
      })
    })

    // wx.login({
    //   success: function(res) {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log("用户信息", res);
    //     util.getOpenId({
    //       code: res.code
    //     }, function(ret) {
    //       // console.log("getOpenId:" + JSON.stringify(ret))

    //       app.globalData.openId = ret.openid;
    //       app.login(app)
    //     }, null)
    //   }
    // });
  },

  login: function(app, callback) {
    callback = typeof callback == 'function' ? callback : () => {};

    var userInfo = app.globalData.wx_userInfo||null;
    var openId = app.globalData.openId;
    var param = {
      openId: openId,
      userInfo: userInfo
    }
    console.log("登录服务器", param)
    
    util.login(param, function(res) {
      console.log("登录服务器返回", res)

      // console.log("登录服务器成功", res.)
      app.globalData.DTuserInfo = res;
      // console.log("用户信息", app.globalData.DTuserInfo);
      wx.setStorageSync('DTUserInfo', app.globalData.DTuserInfo)
      callback();
      // console.log("登录服务器成功")
    }, function(res) {
      console.log("登录服务器失败", res)
    })


  },
  getUserInfo: function(e) {
    // console.log(e)
    this.globalData.WXuserInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  https: {
    url: "http://xcx.hzmuji.com/"
  },
  onEerror: function(msg) {
    console.log(msg)
  },
  tabBar: {},
  globalData: {
    userInfo: null,
  },
  util: require('we7/resource/js/util.js'),
  siteInfo: require('siteinfo.js')
});