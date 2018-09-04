// pages/article/article.js
const app = getApp();
const util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageTitle:'',
    messageSource:'',
    messageTime:'',
    itemid:null
  },

  setInfo:function(){
    var param = {
      userid: wx.getStorageSync('UserInfo').userid,
      _token: wx.getStorageSync('UserInfo')._token,
      itemid: that.data.itemid,
    };
    util.setInfo(param, function (res) {
      console.log('根据itemid查询资讯详情', res);
      // for (var i in res.data) {
        // that.data.information_list.push({
        //   addtime: util.formatTime(new Date(res.data[i].addtime * 1000)),
        //   itemid: res.data[i].itemid,
        //   title: res.data[i].title,
        //   thumb: res.data[i].thumb
        // })
      // }
      that.setData({
        messageTime: util.formatTime(new Date(res.addtime * 1000)),
        messageSource: res.copyfrom,
        messageTitle:res.title,
      })
      var article = res.data.content;
        if (article) {
          WxParse.wxParse('article', 'html', article, that, 5);
        }
    }, null)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.setData({
      itemid: options.itemid
    })
    that.setInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
    /**
      * 加载产品信息
      * */



    // wx.request({
    //   url: app.https.url + "/select/Information",
    //   data: {
    //     id: that.data.id
    //   },
    //   header: { 'content-type': 'application/x-www-form-urlencoded' },
    //   method: 'POST',
    //   success: function (res) {
    //     console.log(res.data)
    //     // for (var i in res.data) {
    //     that.setData({
    //       id: res.data[0].id,
    //       messageIconImg: res.data[0].images,
    //       messageTitle: res.data[0].content,
    //       messageSource: res.data[0].network,
    //       messageTime: u.formatTime(new Date(res.data[0].gmtconfig)),
    //       article: res.data[0].informationdetail,
    //     })
    //     var article = res.data[0].informationdetail;
    //     if (article) {
    //       WxParse.wxParse('article', 'html', article, that, 5);
    //     }
    //     // wx.setNavigationBarTitle({
    //     //   title: res.data[0].productName,
    //     // })

    //   },
    //   fail: function (res) { },
    //   ompvare: function (res) { },
    // })
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