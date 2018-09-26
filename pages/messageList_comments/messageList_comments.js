var app = getApp();
const util = require('../../utils/util.js');
var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
  },

  //获取收到的留言
  get_Send_message: function () {
    if (that.data.page)
      util.get_Send_message({
        page: that.data.page
      }, function (res) {
        console.log('获取留言信息', res);
        for (var i in res.data) {
          res.data[i].addtime = util.formatTime(new Date(res.data[i].addtime * 1000))
          res.data[i].replytime = util.formatTime(new Date(res.data[i].replytime * 1000))

        }

        that.setData({
          list: that.data.list.concat(res.data ? res.data : []),
          page: res.current_page < res.last_page ? res.current_page + 1 : null
        })
      }, null)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.get_Send_message()
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    that.get_Send_message()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})