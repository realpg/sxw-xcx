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
      setchoose: true,
      page: 1,
    }],
    information_list: [],
    catid: '0',
    page: 1
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
    
    that.data.catid = e.currentTarget.dataset.id
    for (var i in that.data.classify){
      that.data.classify[i].page=1;
    }
    that.setData({
      catid: that.data.catid,
      page: 1,
      information_list: [],
      classify:that.data.classify
    })
    that.getByCatid(e.currentTarget.dataset.id);
  },

  //信息列表获取
  getByCatid: function (catid) {
    {
      var t; //catid对应的that.data.classify
      for (let i in that.data.classify) {
        if (that.data.classify[i].catid == catid) {
          t = i;
          that.data.classify[i].setchoose = true;
          var conditions = JSON.stringify({
            key: ['catid'],
            value: [that.data.classify[i].catid]
          });
          var func;
          if (catid != 0) {
            func = util.InfoListByCondition;
          } else {
            func = util.InfoList;
            t = 0
          }


          if (!that.data.page)
            return;
          let param = {
            conditions: conditions,
            page: that.data.classify[t].page
          };
          console.log("请求",func,param)
          if (param.page)
            func(param, function (res) {
              console.log('根据条件查询资讯列表', res);
              // that.data.information_list = [];
              for (let i in res.data) {
                that.data.information_list.push({
                  addtime: util.formatTime(new Date(res.data[i].addtime * 1000)),
                  itemid: res.data[i].itemid,
                  title: res.data[i].title,
                  thumb: res.data[i].thumb
                })
              }
              // var information_list = [],
              //   information_list = that.data.information_list.concat(res.data);
              that.data.classify[t].page = res.current_page < res.last_page ? res.current_page + 1 : null,
                that.setData({
                  information_list: that.data.information_list,
                  classify: that.data.classify,
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
      mid: 21
    };

    that.getByCatid(0);

    util.setClassify(param, function (res) {
      console.log('分类列表', res);
      for (let i in res) {

        that.data.classify.push({
          catid: res[i].catid,
          catname: res[i].catname,
          setchoose: false,
          page: 1,
        })
      }
      that.setData({
        classify: that.data.classify
      })

      // console.log(that.data.classify[0].catid)
      // var conditions = JSON.stringify({ key: ['catid'], value: [that.data.classify[0].catid] });
      // let param = {
      //   userid: wx.getStorageSync('UserInfo').userid,
      //   _token: wx.getStorageSync('UserInfo')._token,
      //   conditions: conditions
      // };
      // util.InfoListByCondition(param, function (res) {
      //   console.log('根据条件查询资讯列表', res);
      //   for (let i in res.data) {
      //     that.data.information_list.push({
      //       addtime: util.formatTime(new Date(res.data[i].addtime * 1000)),
      //       itemid: res.data[i].itemid,
      //       title: res.data[i].title,
      //       thumb: res.data[i].thumb
      //     })
      //   }
      //   that.setData({
      //     information_list: that.data.information_list
      //   })

      // }, null)

      console.log(that.data.classify)
    }, null)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    // var data = wx.getStorageSync("data-mine_information");
    // console.log("同步缓存数据", data)
    // if (typeof data.data != 'undefined')
    //   that.setData(data.data)
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
    // wx.setStorageSync("data-mine_information", that.data)
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
  onReachBottom: function (e) {
    console.log("触底加载", that.data.catid),
      that.getByCatid(that.data.catid);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})