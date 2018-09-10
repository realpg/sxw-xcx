// pages/shops_intro/shops_intro.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    introduce:'公司简介生命周期函数--监听页面加载生命周期函数--监听页面加载',
    wxqr:'',
    thumb:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that=this;
    if (options.introduce){
      console.log(1111111111,options)
      let thumb = that.data.thumb
      thumb = options.thumb.split(','),
      that.setData({
      introduce: options.introduce,
      wxqr: options.wxqr,
      thumb: thumb
    })
      console.log(1111111111,thumb )
    }
  },
  
  //预览图片
  previewImClick: function (e) {
    console.log(123456, e.currentTarget.dataset.id)
    var that = this;
    var id = e.currentTarget.dataset.id
    var aasss = that.data.thumb;
    console.log(66666, that.data.thumb)
    for (var i in aasss) {
      if (i == id) {
        console.log(344324, aasss[id]);
        wx.previewImage({
          current: aasss[id], // 当前显示图片的http链接
          urls: aasss // 需要预览的图片http链接列表
        })
      }
    }
  },

  previewImClick_code:function(){
    var that=this
    wx.previewImage({
      urls:'that.data.wxqr'
    })
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