// pages/pay_advertising/pay_advertising.js
const app = getApp()
const util = require('../../utils/util.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advImg: '../../images/personal_center/banner.png',
    gold_week: '100',
    gold_month: '350',
    gold_year: '3500',
    vip_to: '',
    hint_time: '',
    mine_gold: '5',
    pay_gold: 0,
    sellingADs: [],
    advertisingVIP: [],
    userinfo: [],
    index: null,
    paying: false
  },

  radioChange: function(e) {
    console.log("id", that.data.advertisingVIP[e.detail.value].id)
    var index = null;
    if (parseInt(e.detail.value) == 2) {
      that.data.hint_time = parseInt(that.data.vip_to) + parseInt(that.data.advertisingVIP[2].druation);
      that.data.pay_gold = that.data.advertisingVIP[2].amount;
    } else if (parseInt(e.detail.value) == 1) {
      that.data.hint_time = parseInt(that.data.vip_to) + parseInt(that.data.advertisingVIP[1].druation);
      that.data.pay_gold = that.data.advertisingVIP[1].amount;
    } else {
      that.data.hint_time = parseInt(that.data.vip_to) + parseInt(that.data.advertisingVIP[0].druation);
      that.data.pay_gold = that.data.advertisingVIP[0].amount;
    }
    var date = new Date(that.data.hint_time * 1000);
    console.log("time to", date)
    that.setData({
      pay_gold: that.data.pay_gold,
      index: parseInt(e.detail.value),
      hint_time: util.formatTime(date)
    })

  },

  payClick: function() {
    that = this
    wx.showModal({
      title: '提示',
      content: '是否确认购买？',
      cancelColor: 'red',
      confirmText: "确定",
      cancelText: "取消",
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.confirm();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  confirm: function() {
    if (that.data.index !== null) {
      that.setData({
        paying: true
      })
      var param = {
        userid: app.globalData.userInfo.userid.userid,
        _token: app.globalData.userInfo._token,
        id: that.data.advertisingVIP[that.data.index].id
      };
      util.payVIP(param, function(res) {
        console.log('vip广告位', res);
        // that.setData({
        //   advertisingAssign: res
        // })
        wx.showToast({
          title: "购买成功",
          druation: 3000,
          icon: 'success'
        })
        setTimeout(function() {
          wx.navigateBack()
        }, 3000)
      }, null)
    } else {
      wx.showToast({
        title: "请选择一项",
        icon: 'none',
        druation: 2000
      })

    }
  },

  // 获取金币
  gain_goldClick: function() {
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },

  GetAdvertisingInfo: function() {
    var param = {
      userid: app.globalData.userInfo.userid.userid,
      _token: app.globalData.userInfo._token,
      pid: that.data.pid
    };
    util.GetAdvertisingInfo(param, function(res) {
      console.log('广告位', res);
      // that.setData({
      //   advertisingAssign: res
      // })
    }, null)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;

    that.setData({
      vip_to: new Date().getTime()
    })
    util.vipTimeto({}, function(ret) {
      that.data.hint_time = parseInt(ret);
      var date = new Date(that.data.hint_time * 1000);
      that.setData({
        vip_to: ret,
        hint_time: util.formatTime(date)
      })
    }, null)
    if (options.advertisingVIP) {
      var advertisingVIP = JSON.parse(options.advertisingVIP)

      for (var i in advertisingVIP) {
        that.data.advertisingVIP.push({
          druation: advertisingVIP[i].druation,
          id: advertisingVIP[i].id,
          vip: advertisingVIP[i].vip,
          desc: advertisingVIP[i].desc,
          amount: advertisingVIP[i].amount,

        })
      }
      that.setData({
        advertisingVIP: that.data.advertisingVIP,
        userinfo: app.globalData.userInfo
      })
      console.log('vip', advertisingVIP, that.data.advertisingVIP);
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log(util.formatTime(new Date(1535126400 * 1000)))
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})