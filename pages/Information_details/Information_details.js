// pages/article/article.js
const app = getApp();
const u = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageTitle:'储备棉最新消息',
    messageSource:'中国纱线网',
    messageTime:'2018-7-20',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    /**
      * 加载产品信息
      * */
    wx.request({
      url: app.https.url + "/select/Information",
      data: {
        id: that.data.id
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        // for (let i in res.data) {
        that.setData({
          id: res.data[0].id,
          messageIconImg: res.data[0].images,
          messageTitle: res.data[0].content,
          messageSource: res.data[0].network,
          messageTime: u.formatTime(new Date(res.data[0].gmtconfig)),
          article: res.data[0].informationdetail,
        })
        let article = res.data[0].informationdetail;
        if (article) {
          WxParse.wxParse('article', 'html', article, that, 5);
        }
        // wx.setNavigationBarTitle({
        //   title: res.data[0].productName,
        // })

      },
      fail: function (res) { },
      omplete: function (res) { },
    })
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