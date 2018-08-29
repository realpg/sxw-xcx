// pages/mine_AdPositionId/mine_AdPositionId.js
var that;
const app = getApp()
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    advertising_position: []
  },

  selectClick: function() {
    wx.navigateTo({
      url: '../select_issue/select_issue',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
that=this;
that.load();
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

  },
  getMyVIP:function(){
    util.myVIP({},function(ret){
      console.log("我的vip",ret)
      if(typeof(ret)=='undefined'){
        reutrn;
      }
      var vip_now = ret[3] ? ret[3] : [];
      var vip_later = ret[0] ? ret[0] : [];
      var vip_earlier = ret[2] ? ret[2] : [];

      console.log(vip_now, vip_later, vip_earlier)
      for (var i in vip_now){
        vip_now[i].time_begin = util.formatDate(new Date(vip_now[i].fromtime*1000));
        vip_now[i].time_over = util.formatDate(new Date(vip_now[i].totime*1000));
      }

      that.setData({
        vip_now: vip_now,
        vip_later: vip_later,
        vip_earlier: vip_earlier
      })
    })
  },
  getMyAdplace: function () {
    util.getMyAdplace({}, function (ret) {
      console.log("我的广告位", ret)
      var ads=ret?ret:[];
      for (var i in ads){
        ads[i].time_begin = util.formatDate(new Date(ads[i].addtime * 1000));
        ads[i].time_over = util.formatDate(new Date(ads[i].totime * 1000));
      }

      that.setData({
        advertising_position:ads
      })
    })
  },

  load:function(){
    that.getMyVIP();
    that.getMyAdplace();
  }
})