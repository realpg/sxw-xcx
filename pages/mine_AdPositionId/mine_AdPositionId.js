// pages/mine_AdPositionId/mine_AdPositionId.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advertising_vip:[{
      id: 0,
      bgImg: 'http://pccmmgtlu.bkt.clouddn.com/bg1.png',
      Img: '../../images/personal_center/vip1.png',
      time_begin: '2018-8-25',
      time_over: '2018-9-25'
   },
     {
        id: 0,
        bgImg: 'http://pccmmgtlu.bkt.clouddn.com/bg2.png',
        Img: '../../images/personal_center/vip2.png',
        time_begin: '2018-8-25',
        time_over: '2018-9-25'
      }, {
        id: 0,
        bgImg: 'http://pccmmgtlu.bkt.clouddn.com/bg3.png',
        Img: '../../images/personal_center/vip3.png',
        time_begin: '2018-8-25',
        time_over: '2018-9-25'
      }
      ],

    advertising_position: [{
      id: 0,
      bgImg: 'http://pccmmgtlu.bkt.clouddn.com/bg3.png',
      Img: '../../images/personal_center/carousel.png',
      time_begin: '2018-8-25',
      time_over: '2018-9-25'
    }, {
      id: 1,
      bgImg: 'http://pccmmgtlu.bkt.clouddn.com/bg3.png',
        Img: '../../images/personal_center/carousel.png',
      time_begin: '2018-8-25',
      time_over: '2018-9-25'
    }, {
      id: 2,
      bgImg: 'http://pccmmgtlu.bkt.clouddn.com/bg3.png',
        Img: '../../images/personal_center/carousel.png',
      time_begin: '2018-8-25',
      time_over: '2018-9-25'
    }, ]
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