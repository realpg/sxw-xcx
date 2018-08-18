// pages/invite_prize/invite_prize.js
var app = getApp();
let that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Img_code: '../../images/index/mjkj.jpg',
    gold:'60',
    user:'12'
  },

  //点击放大小程序二维码

  Img_codeClick: function () {
    wx.previewImage({
      current: '', // 当前显示图片的http链接   
      urls: ["https://www.cslpyx.com/weiH5/jrkj.jpg"] // 需要预览的图片http链接列表   
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
    console.log();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  }, 
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
    const that = this;
    return {
      title: '我分享了纱线网小程序',
      path: 'pages/index/index?userid=' + wx.getStorageSync('UserInfo').userid,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          duration: 1000
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})