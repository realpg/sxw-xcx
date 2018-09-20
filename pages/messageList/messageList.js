var app = getApp();
const util = require('../../utils/util.js');
var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  //获取收到的留言
  get_Receive_message:function(){
    util.get_Receive_message({}, function (res) {
      console.log('获取留言信息', res);
      // for (var i in res.data) {
      //   that.data.information_list.push({
      //   })
      // }
    }, null)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   that = this
    if(options.id==1){
      wx.setNavigationBarTitle({ title: '系统通知' })
    } else if (options.id == 2){
      wx.setNavigationBarTitle({ title: '收到留言' })
       that.get_Receive_message();
    } else if (options.id == 3) {
      wx.setNavigationBarTitle({ title: '我的评论' })
    }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})