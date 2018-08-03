// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideshow: [{ id: 1, slideshowImg: '../../images/index/Yarn_image1.jpg' }, { id: 2, slideshowImg: '../../images/index/Yarn_image.jpg' }, { id: 3, slideshowImg: '../../images/index/Yarn_image1.jpg' }],
   
    //点击改变颜色
    all_color: '',
    supply_color: '',
    buy_color: '',
    equipment_color: '',
    information_list: [{ id: 0, information_Img: '../../images/other/pic_list.png', title: '储备棉最新公告出炉，美国白宫称将会对中国商家购买有限制美国白宫称将会对中国商家购买有限制', time: '2018-06-04' }, { id: 1, information_Img: '../../images/other/pic_list.png', title: '储备棉最新公告出炉，美国白宫称将会对中国商家购买有限制美国白宫称将会对中国商家购买有限制', time: '2018-06-04' }, { id: 2, information_Img: '../../images/other/pic_list.png', title: '储备棉最新公告出炉，美国白宫称将会对中国商家购买有限制美国白宫称将会对中国商家购买有限制', time: '2018-06-04' }, { id: 3, information_Img: '../../images/other/pic_list.png', title: '储备棉最新公告出炉，美国白宫称将会对中国商家购买有限制美国白宫称将会对中国商家购买有限制', time: '2018-06-04' },]
  },

//资讯详情
  information_details_click:function() {
    wx.navigateTo({
      url: "../Information_details/Information_details"
    })
  },
  //信息栏选择
  selectClick: function (e) {
    var that = this;
    // console.log(e)
    if (e.target.dataset.nn == 1) {
      that.setData({
        all_color: '#01C46C',
        supply_color: '#9B9B9B',
        buy_color: '#9B9B9B',
        equipment_color: '#9B9B9B',
      })
    } else if (e.target.dataset.nn == 2) {

      that.setData({
        all_color: '#9B9B9B',
        supply_color: '#01C46C',
        buy_color: '#9B9B9B',
        equipment_color: '#9B9B9B',
      })
    } else if (e.target.dataset.nn == 3) {

      that.setData({
        all_color: '#9B9B9B',
        supply_color: '#9B9B9B',
        buy_color: '#01C46C',
        equipment_color: '#9B9B9B',
      })
    } else if (e.target.dataset.nn == 4) {

      that.setData({
        all_color: '#9B9B9B',
        supply_color: '#9B9B9B',
        buy_color: '#9B9B9B',
        equipment_color: '#01C46C',
      })
    }
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