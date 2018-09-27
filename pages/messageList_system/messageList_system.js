const app = getApp();
const util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: []
  },

  //打开
  openClick: function(e) {

    const that = this;
    var message = that.data.message
    var index = e.currentTarget.dataset.index
    console.log('点击打开', message, index)
    for (var i in that.data.message) {
      if (i == index) {
        var article = message[index].content
        message[i].state = !message[i].state;
        WxParse.wxParse('article', 'html', article, that, 5);
        console.log(article, that.data)
      } else
        message[i].state = false;
    }

    
    console.log(that.data.message[index])
    if (that.data.message[index].state)
      util.getMessageByID({
        itemid: that.data.message[index].id
      }, function(ret) {
        console.log("信息已读", ret)
        message[index].isread = ret.isread;
        that.setData({
          message:message,
          article:that.data.article
        })
      }, null)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    that = this;
    var message = that.data.message
    util.myMessage({}, function(ret) {
      console.log(1111, ret);

      for (var i in ret) {
        var article = ret[i].content;
        if (article) {

          message.push({
            id: ret[i].itemid,
            title: ret[i].title,
            state: false,
            content: article,
            time: util.formatTime(new Date(parseInt(ret[i].addtime) * 1000)),
            isread: ret[i].isread
          })
        }
      }
      that.setData({
        message: that.data.message
      })
    }, null)
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