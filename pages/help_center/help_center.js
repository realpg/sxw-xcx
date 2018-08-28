// pages/help_center/help_center.js
const app = getApp()
const util = require('../../utils/util.js');
var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    question: [{ id: 0, title: '你们的广告位怎么卖？' }, { id: 1, title: '这个小程序怎么用？' }, { id: 2, title: '小程序收费吗？' }, { id: 3, title: '哪里发布信息？' }, { id: 4, title: '怎么可以打广告？' },]
  },
//联系客服
  callClick:function(){
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
  },

 //问题解答
  answeringClick:function(){
    wx.navigateTo({
      url: '../question_answering/question_answering',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    util.getSystemKeyValue({
      id: 29
    }, function (ret) {
     
      console.log(222222222222222222222, ret)
    }, null)
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


