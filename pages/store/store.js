// pages/store/store.js
const app = getApp();
const util = require('../../utils/util.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [1, 2, 3, 4, 5, 6],
    toView: 'green',
    scrollTop: 100,
    scroll_width: 299,
    scroll_index: 0,
    scrollLeft: 0, //自动滚动到的位置
    scrollLeft_real: 0, //实际滚动到的位置
    slideshow: [{
      id: 0,
      slideshowImg: '../../images/index/Yarn_image1.jpg'
    }, {
      id: 1,
      slideshowImg: '../../images/index/Yarn_image.jpg'
    }, {
      id: 2,
      slideshowImg: '../../images/index/Yarn_image1.jpg'
    }],

    classify: [],

    classifys: {
      icon_path: '../../images/store/icon_paihangbang.png',
      name: '排行榜'
    },

    recommend_store: [],

    //点击改变颜色
    all_color: '',
    supply_color: '',
    buy_color: '',
    equipment_color: '',

    messageList: [],

    page: 1
  },

  //搜索框跳转
  serchClick: function() {
    wx.navigateTo({
      url: '../search/search?index=4',
    })
  },


  //分类
  classifyClick: function(e) {
    const that = this;
    if (e.currentTarget.dataset.id) {
      wx.navigateTo({
        url: '../reclassifyCard/reclassifyCard?name=' + e.currentTarget.dataset.name + '&id=' + e.currentTarget.dataset.id,
      })
    } else {
      if (e.currentTarget.dataset.name == '排行榜') {
        wx.navigateTo({
          url: '../ranking_list/ranking_list',
        })
      }
    }
  },

  //查看
  messageList_click: function(e) {
    wx.navigateTo({
      url: '../store_particulars/store_particulars?id=' + e.currentTarget.dataset.id,
    })
  },

  Loading: function() {
    let param = {
      userid: wx.getStorageSync('UserInfo').userid,
      _token: wx.getStorageSync('UserInfo')._token,
    };
    util.varietyList(param, function(ret) {
      console.log('种类列表', ret)
      that.setData({
        classify: ret
      })
    });
  },


  visitingCard: function() {
    if (!that.data.page)
      return;
    let param = {
      userid: wx.getStorageSync('UserInfo').userid,
      _token: wx.getStorageSync('UserInfo')._token,
      page: that.data.page
    };
    util.visitingCard(param, function(ret) {
      console.log('名片列表', ret)
      var messageList = [],
        messageList = that.data.messageList.concat(ret.data);
      that.setData({
        page: ret.current_page < ret.last_page ? ret.current_page + 1 : null,
        messageList: messageList
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    var scroll_width = parseInt(app.globalData.SystemInfo.windowWidth * 471 / 750);
    that.setData({
      scroll_width: scroll_width
    })
    console.log("scroll_width",scroll_width);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    that = this
    that.Loading();
    that.visitingCard();
    //名片推荐
    util.card_recommend({}, function(ret) {
      console.log(77777777, ret);
      var recommend_store = that.data.recommend_store;

      for (var i in ret) {

        recommend_store.push({
          userid: ret[i].businesscard.userid,
          name: ret[i].businesscard.truename,
          post: ret[i].businesscard.career,
          phone: ret[i].businesscard.mobile,
          headImg: ret[i].businesscard.avatarUrl,
          company: ret[i].businesscard.company,
          address: ret[i].businesscard.address,
          The_main: ret[i].businesscard.introduce,
        })
      }
      that.setData({
        recommend_store: recommend_store,
      })
      setTimeout(function () {
        that.nextScroll()
      }, 3000)
      
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    setTimeout(function () {
      that.nextScroll()
    }, 3000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    if (that.data.timer) {
      clearTimeout(that.data.timer);
      console.log("销毁计时器")
    }
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
    console.log('下拉刷新');
    that.Loading();
    that.visitingCard();
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onReachBottom: function() {
    console.log("触底加载")
    that.visitingCard();
  },

  scroll: function(e) { //有用
    console.log(e)

    if (that.data.timer) {
      clearTimeout(that.data.timer);
      console.log("销毁计时器")
    }


    var timer = setTimeout(function() {
      console.log("自动滚动")
      that.nextScroll()
    }, 3000)
    var scroll_index = that.data.scroll_index
    if (scroll_index!=that.data.recommend_store.length-1)
    scroll_index = parseInt(e.detail.scrollLeft / that.data.scroll_width);
    console.log("index:",scroll_index);
    that.setData({
      scrollLeft_real: e.detail.scrollLeft,
      scroll_index: scroll_index,
      timer: timer,
      scroll_all_width: e.detail.scrollWidth,
      scroll_width: e.detail.scrollWidth / that.data.recommend_store.length,
    })
  },

  nextScroll: function() { //有用
    var index = (that.data.scroll_index ? that.data.scroll_index:0) + 1;
    var scrollLeft = index* that.data.scroll_width
    if (index >= that.data.recommend_store.length)
      scrollLeft = 0
    console.log("下一条", index, that.data.recommend_store.length, scrollLeft)
    this.setData({
      scrollLeft: scrollLeft,
      scroll_index: index
    })

  },
})