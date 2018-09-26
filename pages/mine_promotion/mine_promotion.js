// pages/mine_promotion/mine_promotion.js
const app = getApp()
const util = require('../../utils/util.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:'../../images/personal_center/banner.png',

    advertisingVIP: [
      { id: 0, bgImg: 'http://pccmmgtlu.bkt.clouddn.com/bg1.png', Img: '../../images/personal_center/vip1.png', gold_week: '100', gold_month: '350', gold_year: '3500' }, 
      { id: 1, bgImg: 'http://pccmmgtlu.bkt.clouddn.com/bg2.png', Img: '../../images/personal_center/vip2.png', gold_week: '80', gold_month: '300', gold_year: '3000' }, 
      { id: 2, bgImg: 'http://pccmmgtlu.bkt.clouddn.com/bg3.png', Img: '../../images/personal_center/vip3.png', gold_week: '60', gold_month: '200', gold_year: '2000' }, 
      ],

    advertisingAssign: []

  },


//VIP广告位
  selectClick:function(e){
    console.log(e.currentTarget.dataset.advertisingvip)
  wx.navigateTo({
    url: '../pay_advertising/pay_advertising?advertisingVIP=' + e.currentTarget.dataset.advertisingvip,
})
  },

  //指定广告位
  AssignClick: function(e) {
    console.log(e.currentTarget.dataset.sellingads)
    if (e.currentTarget.dataset.sellingads != '[]'){
      // console.log(e);
    wx.navigateTo({
      url: '../pay_advertising_lunbo/pay_advertising_lunbo?data_index=' + e.currentTarget.dataset.index,
    })
    }else{
      wx.showToast({
        title: '暂无该广告位',
        icon:"none",
        duration: 1500
      })
    }
  },

  GetAdvertising:function(){
    var param = {
    };
    util.GetAdvertising(param, function (res) {
      console.log('指定广告位', res);
      for(let i in res){
        that.data.advertisingAssign.push({
          ads: res[i].ads,
          icon_path: res[i].icon_path,
          name: res[i].name,
          pid: res[i].pid,
          sellingADs: res[i].sellingADs,
          types: res[i].types,
          item: JSON.stringify(res[i].sellingADs)
        })
      }
      that.setData({
        advertisingAssign: that.data.advertisingAssign
      })
      console.log("广告",that.data.advertisingAssign)
    }, null)

    util.GetAdvertisingVIP(param, function (res) {
      console.log('VIP广告位', res);
      // for (let i in res) {
      //   that.data.advertisingVIP.push({
      //     advertisingVIP: res[i],
      //     item: JSON.stringify(res[i])
      //   })
      // }
      that.setData({
        advertisingVIP: res,
        advertisingVIP3:JSON.stringify(res[3]),
        advertisingVIP2: JSON.stringify(res[2]),
        advertisingVIP1: JSON.stringify(res[1]),
      })

      console.log(that.data.advertisingVIP)
    }, null)

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
    that.GetAdvertising();
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