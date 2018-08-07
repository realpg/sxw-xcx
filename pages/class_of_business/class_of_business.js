// pages/class_of_business/class_of_business.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [

    ],

    ids: []
  },

  checkboxChange: function(e) {
    // console.log("111111111",e.detail.value)
    var checked = e.detail.value;
    for (var i in this.data.items) {
      this.data.items[i].checked = (checked.indexOf(i) >= 0)
    }
    this.setData({
      items: this.data.items
    })
  },

  submitClick: function() {
    const that = this;
    var pages = getCurrentPages();
    var prepage = pages[pages.length - 2];
    var businesscard = prepage.data.businesscard;
    console.log("更改前", prepage.data.businesscard.ywlb)
    var checked = [];
    for (var i in this.data.items) {
      if (this.data.items[i].checked)
        checked.push({
          ywlb_id: this.data.items[i].id,
          name: this.data.items[i].name,
        })
    }
    businesscard.ywlb = checked //改成获取到的数组
    prepage.setData({
      businesscard: businesscard
    })
    console.log("更改后", prepage.data.businesscard.ywlb)
    wx.navigateBack({
      delta: 1
    })
  },
  setCheck: function() {
    var ids = this.data.ids;
    for (var i in this.data.items) {
      this.data.items[i].checked = (ids.indexOf(this.data.items[i].id) >= 0)
    }
    this.setData({
      items: this.data.items
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var ywlbs = JSON.parse(options.ywlbs)
    var arr = JSON.parse(options.ywlb)
    var ids = [];

    for (var i in arr) {
      ids.push(arr[i].ywlb_id)
    }
    this.setData({
      ids: ids,
      items: ywlbs
    })
    console.log(this.data);

    this.setCheck()
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