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
    hint_time: '2018-07-10',
    mine_gold: '5',
    pay_gold: 0,
    sellingADs: [],
    advertisingVIP: [],
    userinfo: [],
    index: null,
    level: null,

  },

  radioChange: function(e) {
    let arr = (e.detail.value).split(',')
    console.log(parseInt(arr[0]), parseInt(arr[1]));
    var index = arr[0];
    var level = arr[1];

    //
    if (parseInt(arr[1]) == 0) {
      that.data.hint_time = that.data.sellingADs[index].druation0;
      that.data.pay_gold = that.data.sellingADs[index].amount0;
    } else if (parseInt(arr[1]) == 1) {
      that.data.hint_time = that.data.sellingADs[index].druation1;
      that.data.pay_gold = that.data.sellingADs[index].amount1;
    } else {
      that.data.hint_time = that.data.sellingADs[index].druation2;
      that.data.pay_gold = that.data.sellingADs[index].amount2;
    }

    that.setData({
      pay_gold: that.data.pay_gold,
      index: index,
      level: level,
      hint_time: that.data.hint_time

    })

  },

  payClick: function () {
    that = this
    console.log('?????', that.data.userinfo.groupid)
    if (that.data.index !== null) {
      if (that.data.userinfo.groupid == 6) {
        wx.showModal({
          title: '提示',
          content: '是否确认购买？',
          confirmText: "确定",
          cancelText: "取消",
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.confirm();
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        var updating = app.globalData.DTuserInfo.updating;
        if (!updating)
          //不在审核信息中
          wx.showModal({
            title: '完善个人信息后才能购买！',
            content: '是否跳转至完善个人信息？',
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
        else {
          wx.showModal({
            title: '个人信息审核尚未完成！',
            content: '个人信息审核中，请耐心等待',
            confirmText: "确定",
            showCancel: false
          })
        }
      }
    } else {
      wx.showToast({
        title: "请选择一项",
        icon: 'none',
        druation: 2000
      })
    }
  },

  confirm: function() {
    if (that.data.index && that.data.level) {
      var param = {
        itemid: that.data.sellingADs[that.data.index].itemid,
        level: that.data.level
      };
      console.log(11111111111)
      util.payAssign(param, function(res) {
        console.log('指定广告位', res);
        wx.showToast({
          title: '购买成功',
          icon: 'success',
          duration: 2000
        })

        setTimeout(function() {
          wx.navigateBack();
        }, 2000)
        // that.setData({
        //   advertisingAssign: res
        // })
      }, null)

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
      userid: app.globalData.DTuserInfo.userid,
      _token: app.globalData.DTuserInfo._token,
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
    console.log(11236, app.globalData.DTuserInfo)
    that.setData({
      hint_time: util.formatTime(new Date()),
      gold_coin_balance: app.globalData.DTuserInfo.credit
    })
    if (options.data_index) {
      console.log("index:",options.data_index);
      var pages = getCurrentPages();
      var prepage=pages[pages.length-2];
      console.log(prepage.data, prepage.data.advertisingAssign)
      let arr = JSON.parse(prepage.data.advertisingAssign[options.data_index].item)
      let arrb = [];
      for (let i in arr) {
        arrb.push({
          druation0: util.formatTime(new Date(Date.now() + arr[i].druation0 * 1000)),
          druation1: util.formatTime(new Date(Date.now() + arr[i].druation1 * 1000)),
          druation2: util.formatTime(new Date(Date.now() + arr[i].druation2 * 1000)),
          id: arr[i].id,
          vip: arr[i].vip,
          desc: arr[i].desc,
          amount0: arr[i].amount0,
          amount1: arr[i].amount1,
          amount2: arr[i].amount2,
          itemid: arr[i].itemid,
          state: false
        })
      }
      that.setData({
        sellingADs: arrb,
        userinfo: app.globalData.DTuserInfo
      })
      console.log(that.data.sellingADs[0].amount)
      wx.setNavigationBarTitle({
        title: that.data.sellingADs[0].desc
      })

    } else if (options.advertisingVIP) {
      let advertisingVIP = JSON.parse(options.advertisingVIP)

      for (let i in advertisingVIP) {
        that.data.advertisingVIP.push({
          druation: util.formatTime(new Date((Date.parse(new Date()) / 1000 + advertisingVIP[i].druation) * 1000)), // util.formatTime(new Date(advertisingVIP[i].druation)),
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
    }

  },

  //选择价格
  select_lunbo: function(e) {
    that = this
    console.log(13333, e.currentTarget.dataset.index)
    that.data.sellingADs[e.currentTarget.dataset.index].state = !that.data.sellingADs[e.currentTarget.dataset.index].state;
    that.data.pay_gold = 0;
    that.setData({
      sellingADs: that.data.sellingADs,
      pay_gold: that.data.pay_gold
    })
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
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    console.log('下拉刷新');
    // this.requestNetAllData(page, 1);
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