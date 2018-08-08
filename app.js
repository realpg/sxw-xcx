//app.js
// const this = getApp();
const util = require('/utils/util.js');
App({
  onLaunch: function() {
    // 展示本地存储能力


    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.getopenid();
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

    // if (this.globalData.userInfo) {
    //   this.globalData.userInfo = res.userInfo
    //   wx.setStorageSync('userInfo', this.globalData.userInfo)
    //   console.log(wx.getStorageSync('userInfo'))
    //   // this.setData({
    //   //   userInfo: this.globalData.userInfo,
    //   //   hasUserInfo: true
    //   // })
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       // console.log(res.userInfo)
    //       this.globalData.userInfo = res.userInfo
    //       wx.setStorageSync('userInfo', res.userInfo)
    //       // console.log(wx.getStorageSync('userInfo'))
    //       // this.setData({
    //       //   userInfo: res.userInfo,
    //       //   hasUserInfo: true
    //       // })
    //     }
    //   })
    // }

  },
  getopenid: function() {
    var app=this;
    wx.login({
      success: function(res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log("用户信息", res);
        util.getOpenId({
          code: res.code
        }, function(ret) {
          // console.log("getOpenId:" + JSON.stringify(ret))

          app.globalData.openId = ret.openid;
          app.login(app)
        }, null)
      }
    });
  },

  login: function(app) {

    var userInfo = app.globalData.wx_userInfo;
    var openId = app.globalData.openId;
    var param = {
      openId: openId,
      userInfo: userInfo
    }
    util.login(param, function(res) {
      console.log("登录服务器返回", res)

      // console.log("登录服务器成功", res.)
      app.globalData.userInfo = res;
      // console.log("用户信息", app.globalData.userInfo);
      wx.setStorageSync('UsetInfo', app.globalData.userInfo)

      // console.log("登录服务器成功")
    }, function(res) {
      console.log("登录服务器失败", res)
    })


  },
  getUserInfo: function(e) {
    // console.log(e)
    this.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  https: {
    url: "http://xcx.hzmuji.com/"
  },
  globalData: {
    userInfo: {},
    wx_userInfo: {}
  }
})