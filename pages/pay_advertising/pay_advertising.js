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
    paying: false,
    describe:''
  },

  radioChange: function (e) {
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

  payClick: function () {
    that = this
    console.log('?????', that.data.userinfo.groupid)
    if (that.data.index !== null){
      if (that.data.userinfo.groupid== 6) {
      wx.showModal({
        title: '提示',
        content: '是否确认购买？',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res){
          if (res.confirm) {
            console.log('用户点击确定')
            that.confirm();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.showModal({
        title: '完善个人信息后才能发布！',
        content: '是否确认购买？',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: "../personal_data/personal_data"
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } 
    }else{
      wx.showToast({
        title: "请选择一项",
        icon: 'none',
        druation: 2000
      })
    }
  },

  confirm: function () {

    that.setData({
      paying: true
    })
    var param = {
      userid: app.globalData.DTuserInfo.userid.userid,
      _token: app.globalData.DTuserInfo._token,
      id: that.data.advertisingVIP[that.data.index].id
    };
    util.payVIP(param, function (res) {
      console.log('vip广告位', res);
      // that.setData({
      //   advertisingAssign: res
      // })
      wx.showToast({
        title: "购买成功",
        druation: 3000,
        icon: 'success'
      })
      // var pages = getCurrentPages();
      // var my_page = pages[pages.length - 3];
      // my_page.refresh()
      setTimeout(function () {
        wx.navigateBack()
      }, 3000)
    }, null)

  },

  // 获取金币
  gain_goldClick: function () {
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },

  GetAdvertisingInfo: function () {
    var param = {
      userid: app.globalData.DTuserInfo.userid.userid,
      _token: app.globalData.DTuserInfo._token,
      pid: that.data.pid
    };
    util.GetAdvertisingInfo(param, function (res) {
      console.log('广告位', res);
      // that.setData({
      //   advertisingAssign: res
      // })
    }, null)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    that.setData({
      vip_to: new Date().getTime(),
      gold_coin_balance: app.globalData.DTuserInfo.credit
    })
    util.vipTimeto({}, function (ret) {
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
        userinfo: app.globalData.DTuserInfo
      })
      console.log('vip', advertisingVIP, that.data.advertisingVIP);
    }


    that = this
    var describe= that.data.describe
    util.getSystemKeyValue({
      id: options.id
    }, function (ret) {
      that.setData({
        describe: ret.value,
      })
      console.log(222222222222222222222, that.data.describe)
    }, null)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(util.formatTime(new Date(1535126400 * 1000)))
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    console.log('下拉刷新');
    // this.requestNetAllData(page, 1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})