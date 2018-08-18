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
    that.setData({
      pay_gold: parseInt(arr[0]),
      index: parseInt(arr[1]),

    })

  },

  payClick:function(){
    if (that.data.advertisingVIP){
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
        id: that.data.index
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
          amount: arr[i].amount,
          desc: arr[i].desc,
          fromtime: arr[i].fromtime,
          hits: arr[i].hits,
          img: arr[i].img,
          item_id: arr[i].item_id,
          item_mid: arr[i].item_mid,
          itemid: arr[i].itemid,
          linktype: arr[i].linktype,
          listorder: arr[i].listorder,
          onsell: arr[i].onsell,
          stat: arr[i].stat,
          status: arr[i].status,
          totime: arr[i].totime,
          totimeToString: util.formatTime(new Date(arr[i].totime*1000)),
          Type: arr[i].type,
          url: arr[i].url,
          userid: arr[i].userid,
          xcx_pid: arr[i].xcx_pid,
          
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
          druation: advertisingVIP[i].druation/86400,// util.formatTime(new Date(advertisingVIP[i].druation)),
          id:advertisingVIP[i].id,
          vip: advertisingVIP[i].vip,
          desc: advertisingVIP[i].desc,
          amount: advertisingVIP[i].amount
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