//app.js
// const this = getApp();
const util = require('/utils/util.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    
    
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success: res => {
        const that = this;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log("用户信息", res);
        util.getOpenId({ code: res.code }, function (ret) {
          // console.log("getOpenId:" + JSON.stringify(ret))
          
            var openId = ret.openid;
            var userInfo = that.globalData.userInfo;

            var param = {
              openId: openId,
              userInfo: userInfo
            }
            util.login(param, res => {
              console.log("登录服务器返回", res)
             
                // console.log("登录服务器成功", res.)
                that.globalData.userInfo.userid = res.userid;
                that.globalData.userInfo._token = res._token;
                // console.log("用户信息", that.globalData.userInfo);
                wx.setStorageSync('UsetInfo', that.globalData.userInfo)
              
              // console.log("登录服务器成功")
            }, res => {
              console.log("登录服务器失败", res)
            })
          
        }, null)
      }
    })
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
  getUserInfo: function (e) {
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
    userInfo: {}
  }
})