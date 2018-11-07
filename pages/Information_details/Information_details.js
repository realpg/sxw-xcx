// pages/article/article.js
const app = getApp();
const util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageTitle:'',
    messageSource:'',
    messageTime:'',
    itemid:null
  },

  setInfo:function(){
    var param = {
      itemid: that.data.itemid,
    };
    util.setInfo(param, function (res) {
      console.log('根据itemid查询资讯详情', res);
      that.setData({
        messageTime: util.formatTime(new Date(res.addtime * 1000)),
        messageSource: res.copyfrom,
        messageTitle:res.title,
      })
      var article = res.data.content;
        if (article) {
          WxParse.wxParse('article', 'html', article, that, 5);
        }
    }, null)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.setData({
      itemid: options.itemid
    })
    that.setInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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