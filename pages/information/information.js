// pages/information/information.js
const app = getApp()
const util = require('../../utils/util.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideshow: [],

    classify: [{
      catid: 0,
      catname: "全部",
      setchoose: true ,
    }],
    information_list: []
  },

  //资讯详情
  information_details_click: function (e) {
    console.log(e.currentTarget.dataset.itemid)
    wx.navigateTo({
      url: "../Information_details/Information_details?itemid=" + e.currentTarget.dataset.itemid
    })
  },
  //信息栏选择
  selectClick: function (e) {
    that.getByCatid(e.currentTarget.dataset.id);
  },
  getByCatid:function(catid){
    {
      for (let i in that.data.classify) {
        if (that.data.classify[i].catid == catid) {
          that.data.classify[i].setchoose = true;
          var conditions = JSON.stringify({ key: ['catid'], value: [that.data.classify[i].catid] });
          var func;
          if (catid != 0) {
            func = util.InfoListByCondition;
          }
          else {
            func = util.InfoList;
          }
          let param = {
            userid: wx.getStorageSync('UserInfo').userid,
            _token: wx.getStorageSync('UserInfo')._token,
            conditions: conditions
          };
          func(param, function (res) {
            console.log('根据条件查询资讯列表', res);
            that.data.information_list = [];
            for (let i in res.data) {
              that.data.information_list.push({
                addtime: util.formatTime(new Date(res.data[i].addtime * 1000)),
                itemid: res.data[i].itemid,
                title: res.data[i].title,
                thumb: res.data[i].thumb
              })
            }
            that.setData({
              information_list: that.data.information_list
            })

          }, null)

        }
        if (that.data.classify[i].catid != catid) {
          that.data.classify[i].setchoose = false
        }
      }
      that.setData({
        classify: that.data.classify
      })

    }
  },
  

  getBanner: function () {
    util.getBanner({}, function (ret) {
      console.log(ret);
      var slideshow = that.data.slideshow;
      for (var i in ret) {
        slideshow.push({
          slideshowImg: ret[i].img
        })
      }
      that.setData({
        slideshow: slideshow
      })
    }, null)
  },

  Loading: function () {
    let param = {
      userid: wx.getStorageSync('UserInfo').userid,
      _token: wx.getStorageSync('UserInfo')._token,
      mid: 21
    };

    that.getByCatid(0);

    util.setClassify(param, function (res) {
      console.log('分类列表', res);
      for (let i in res) {

        that.data.classify.push({
          catid: res[i].catid,
          catname: res[i].catname,
          setchoose:false
        })
      }
      that.setData({
        classify: that.data.classify
      })

      console.log(that.data.classify[0].catid)
      var conditions = JSON.stringify({ key: ['catid'], value: [that.data.classify[0].catid] });
      let param = {
        userid: wx.getStorageSync('UserInfo').userid,
        _token: wx.getStorageSync('UserInfo')._token,
        conditions: conditions
      };
      util.InfoListByCondition(param, function (res) {
        console.log('根据条件查询资讯列表', res);
        for (let i in res.data) {
          that.data.information_list.push({
            addtime: util.formatTime(new Date(res.data[i].addtime * 1000)),
            itemid: res.data[i].itemid,
            title: res.data[i].title,
            thumb: res.data[i].thumb
          })
        }
        that.setData({
          information_list: that.data.information_list
        })

      }, null)

      console.log(that.data.classify)
    }, null)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.getBanner();
    that.Loading();


    // that.InfoList();
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
    wx.stopPullDownRefresh();
    console.log('下拉刷新');
    // this.requestNetAllData(page, 1);
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