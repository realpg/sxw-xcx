// pages/store/store.js
const app=getApp();
const util = require('../../utils/util.js');
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideshow: [{ id: 0, slideshowImg: '../../images/index/Yarn_image1.jpg' }, { id: 1, slideshowImg: '../../images/index/Yarn_image.jpg' }, { id: 2, slideshowImg: '../../images/index/Yarn_image1.jpg' }],

    classify: [],

    classifys: { icon_path: '../../images/store/icon_paihangbang.png', name: '排行榜' },
    
    recommend_store_one: [],
    recommend_store_two: [],
   

    //点击改变颜色
    all_color: '',
    supply_color: '',
    buy_color: '',
    equipment_color: '',

    messageList: [
      { id: 0, iconImg: '../../images/index/head_portrait.png', name: '董晓珺', post: '销售总监', vip: '../../images/index/vip.png', companyName: '杭州精纱信息有限公司', number: '6666', main_business: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支' }, 
      { id: 1, iconImg: '../../images/index/head_portrait.png', name: '董晓珺', post: '销售总监', vip: '../../images/index/vip.png', companyName: '杭州精纱信息有限公司', number: '6666', main_business: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支' }, 
      { id: 2, iconImg: '../../images/index/head_portrait.png', name: '董晓珺', post: '销售总监', vip: '../../images/index/vip.png', companyName: '杭州精纱信息有限公司', number: '6666', main_business: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支' },
      ]
  },

  //搜索框跳转
  serchClick: function () {
    wx.navigateTo({
      url: '../search/search',
      success: function (res) {
      },
      fail: function (res) {
      },
      complete: function (res) {
      },
    })
  },


  //分类
  classifyClick: function (e) {
    const that = this;
    if (e.currentTarget.dataset.id){
      wx.navigateTo({
        url: '../reclassifyCard/reclassifyCard?name=' + e.currentTarget.dataset.name + '&id=' + e.currentTarget.dataset.id,
      })
    }else{
      if (e.currentTarget.dataset.name =='排行榜') {
        wx.navigateTo({
          url: '../ranking_list/ranking_list',
        })
      }
    }
  },

  //查看
  messageList_click: function (e) {
    wx.navigateTo({
      url: '../store_particulars/store_particulars?id=' + e.currentTarget.dataset.id,
    })
  },

  Loading:function(){
    let param = {
      userid: wx.getStorageSync('UserInfo').userid,
      _token: wx.getStorageSync('UserInfo')._token,
    };
    util.varietyList(param, function (ret) {
      console.log('种类列表', ret)
      that.setData({
        classify: ret
      })
    });
  },


  visitingCard:function(){
    let param = {
      userid: wx.getStorageSync('UserInfo').userid,
      _token: wx.getStorageSync('UserInfo')._token,
    };
    util.visitingCard(param, function (ret) {
      console.log('名片列表',ret)
      that.setData({
        messageList:ret.data
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    that=this
    that.Loading();
    that.visitingCard();
    //名片推荐
    util.card_recommend({}, function (ret) {
      console.log(77777777, ret);
      var recommend_store_one = that.data.recommend_store_one;
      var recommend_store_two = that.data.recommend_store_two;
      for (var i in ret) {
        if (ret[i].listorder % 2 == 0) {
          recommend_store_one.push({
            userid: ret[i].businesscard.userid,
            name: ret[i].businesscard.truename,
            post: ret[i].businesscard.career,
            phone: ret[i].businesscard.mobile,
            headImg: ret[i].businesscard.avatarUrl,
            company: ret[i].businesscard.company,
            address: ret[i].businesscard.address,
            The_main: ret[i].businesscard.introduce,
          })
        } else {
          recommend_store_two.push({
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
      }
      that.setData({
        recommend_store_one: recommend_store_one,
        recommend_store_two: recommend_store_two,
      })
    })
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