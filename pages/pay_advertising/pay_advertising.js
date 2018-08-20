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
    hint_time: '2018-07-10 17:55:55',
    mine_gold: '5',
    pay_gold: 0,
    sellingADs:[],
    advertisingVIP:[],
    userinfo:[],
    index:null,

  },

  radioChange:function(e){
    let arr = (e.detail.value).split(',')
    console.log(parseInt(arr[0]), parseInt(arr[1]))
    if (that.data.advertisingVIP.length){
      if (parseInt(arr[1])==1){
        that.data.hint_time= that.data.advertisingVIP[2].druation;
      } else if (parseInt(arr[1]) == 2){
        that.data.hint_time = that.data.advertisingVIP[1].druation;
      }else{
        that.data.hint_time = that.data.advertisingVIP[0].druation;
      }
    }else{
      if (parseInt(arr[1]) == 0) {
        that.data.hint_time =that.data.sellingADs[0].druation0;
      } else if (parseInt(arr[1]) == 1) {
        that.data.hint_time = that.data.sellingADs[0].druation1;
      } else {
        that.data.hint_time = that.data.sellingADs[0].druation2;
      }
    }
    that.setData({
      pay_gold: parseInt(arr[0]),
      index: parseInt(arr[1]),
      hint_time: that.data.hint_time

    })

  },

  payClick:function(){
    if (that.data.advertisingVIP.length){
      var param = {
        userid: wx.getStorageSync('UserInfo').userid.userid,
        _token: wx.getStorageSync('UserInfo')._token,
        id: that.data.index
      };
      util.payVIP(param, function (res) {
        console.log('vip广告位', res);
        // that.setData({
        //   advertisingAssign: res
        // })
      }, null)
    }else{
      var param = {
        userid: wx.getStorageSync('UserInfo').userid.userid,
        _token: wx.getStorageSync('UserInfo')._token,
        itemid: that.data.sellingADs[0].itemid,
        level	: that.data.index
      };
      util.payAssign(param, function (res) {
        console.log('指定广告位', res);
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
      userid: wx.getStorageSync('UserInfo').userid.userid,
      _token: wx.getStorageSync('UserInfo')._token,
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

    if (options.sellingADs) {
      console.log(JSON.parse(options.sellingADs))
      let arr = JSON.parse(options.sellingADs)
      let arrb = [];
      for (let i in arr) {
        arrb.push({
          druation0: util.formatTime(new Date((Date.parse(new Date()) / 1000 + arr[i].druation0)*1000)),
          druation1: util.formatTime(new Date((Date.parse(new Date()) / 1000 + arr[i].druation1) * 1000)),
          druation2: util.formatTime(new Date((Date.parse(new Date()) / 1000 + arr[i].druation2) * 1000)),
          id: arr[i].id,
          vip: arr[i].vip,
          desc: arr[i].desc,
          amount0: arr[i].amount0,
          amount1: arr[i].amount1,
          amount2: arr[i].amount2,
          itemid: arr[i].itemid
        })
      }
      that.setData({
        sellingADs: arrb
      })
      console.log(that.data.sellingADs[0].amount)
      wx.setNavigationBarTitle({
        title: that.data.sellingADs[0].desc
      })
      
    }else if (options.advertisingVIP){
      let advertisingVIP = JSON.parse(options.advertisingVIP)
      
      for (let i in advertisingVIP){
        that.data.advertisingVIP.push({
          druation: util.formatTime(new Date((Date.parse(new Date())/1000 + advertisingVIP[i].druation)*1000)),// util.formatTime(new Date(advertisingVIP[i].druation)),
          id:advertisingVIP[i].id,
          vip: advertisingVIP[i].vip,
          desc: advertisingVIP[i].desc,
          amount: advertisingVIP[i].amount,
          
        })
      }
      that.setData({
        advertisingVIP: that.data.advertisingVIP,
        userinfo: wx.getStorageSync('UserInfo')
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log(util.formatTime(new Date(1535126400*1000)))
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