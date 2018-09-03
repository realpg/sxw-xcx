// pages/goldList/goldList.js
const app = getApp()
const util = require('../../utils/util.js');
var that;
let count=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goldList:[],
    sum:0,
  },

  loading:function(){
    let param = {
      page: count,
    };

    util.goldListClick(param, function (ret) {
      console.log('00', ret);
      
      for (let i in ret.data) {
        that.data.goldList.push({
          itemid: ret.data[i].itemid,
          amount: ret.data[i].amount > 0 ? "+" + ret.data[i].amount : ret.data[i].amount,
          balance: ret.data[i].balance,
          reason:ret.data[i].reason,
          addtime: util.formatTime(new Date(ret.data[i].addtime*1000)),
        })
      }

      that.setData({
        goldList: that.data.goldList,
        sum: ret.last_page
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  that=this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   that.loading();
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
    console.log('下拉刷新')
    count = 1; 
    that.data.goldList=[];   
    that.onReady();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触底加载')
    if(count<that.data.sum){
      count++;
      that.loading();
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})