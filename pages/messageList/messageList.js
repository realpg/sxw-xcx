var app = getApp();
const util = require('../../utils/util.js');
var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
    writeBackValue: '',

  },


  //发送留言
  sendwriteBackClick: function (e) {
    var param = {
      itemid: e.currentTarget.dataset.itemid,
      reply: that.data.writeBackValue
    };
    util.sendwriteBack(param, function (ret) {
      console.log('发送回复', ret,e)
      var index = e.currentTarget.dataset.index
      var list = that.data.list;
      list[index].state = !list[index].state ;
      list[index].replytime = util.formatTime(new Date());
      list[index].reply = that.data.writeBackValue;
      list[index].replyer = app.globalData.DTuserInfo.username;
      list[index].replyer_card = app.globalData.DTuserInfo.businesscard;
      that.setData({
        list: list,
        writeBackValue: ''
      })
      // for (var i in that.data.leave_word_details) {
      //   if (e.currentTarget.dataset.itemid == that.data.leave_word_details[i].itemid) {
      //     that.data.leave_word_details[i].reply = that.data.writeBackValue;
      //     that.data.leave_word_details[i].replyer = that.data.UserInfo.truename;
      //   }
      // }
      // that.setData({
      //   leave_word_details: that.data.leave_word_details,
      //   writeBackChoose: !that.data.writeBackChoose,
      //   writeBackValue: ''
      // })
    });
  },
  //留言触发
  leaveWordClick: function (e) {
    const that = this;
    console.log(e);
    var index = e.currentTarget.dataset.index
    var list=that.data.list;
    list[index].state = !list[index].state
    that.setData({
      list: list
    })
  },
  // 获取回复信息
  exawriteBackClick: function (e) {
    const that = this;
    that.setData({
      writeBackValue: e.detail.value
    })
  },
  

  //获取收到的留言
  get_Receive_message: function() {
    if (that.data.page)
      util.get_Receive_message({
        page: that.data.page
      }, function(res) {
        console.log('获取留言信息', res);

        for(var i in res.data){
          res.data[i].addtime = util.formatTime(new Date(res.data[i].addtime*1000)),
         res.data[i].replytime = util.formatTime(new Date(res.data[i].replytime* 1000))
        }

        that.setData({
          list: that.data.list.concat(res.data ? res.data : []),
          page: res.current_page < res.last_page ? res.current_page + 1 : null
        })
      }, null)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    wx.setNavigationBarTitle({
      title: '收到留言'
    })
    that.get_Receive_message()
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
    that.setData({
      list: [],
      page: 1,
      writeBackValue: '',
    })
    that.get_Receive_message()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    that.get_Receive_message()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})