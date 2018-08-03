// pages/mine_AdPositionId/mine_AdPositionId.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advertising_position: [{ id: 0, bgImg: 'http://pccmmgtlu.bkt.clouddn.com/bg1.png', Img: '../../images/personal_center/vip1.png', gold_week: '100', gold_month: '350', gold_year: '3500' }, { id: 1, bgImg: 'http://pccmmgtlu.bkt.clouddn.com/bg2.png', Img: '../../images/personal_center/vip2.png', gold_week: '80', gold_month: '300', gold_year: '3000' }, { id: 2, bgImg: 'http://pccmmgtlu.bkt.clouddn.com/bg3.png', Img: '../../images/personal_center/vip3.png', gold_week: '60', gold_month: '200', gold_year: '2000' }, { id: 3, bgImg: 'http://pccmmgtlu.bkt.clouddn.com/bg3.png', Img: '../../images/personal_center/top.png', gold_week: '30', gold_month: '100', gold_year: '1200' }, { id: 4, bgImg: 'http://pccmmgtlu.bkt.clouddn.com/bg3.png', Img: '../../images/personal_center/carousel.png', gold_week: '300', gold_month: '600', gold_year: '6000' }, { id: 5, bgImg: 'http://pccmmgtlu.bkt.clouddn.com/bg3.png', Img: '../../images/personal_center/recommend.png', gold_week: '300', gold_month: '600', gold_year: '6000' },]
  },

selectClick:function(){
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
  onLoad: function (options) {
  
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