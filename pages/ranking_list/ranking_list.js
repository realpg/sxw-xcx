 // pages/ranking_list/ranking_list.js
const app = getApp();
const util = require('../../utils/util.js');
let that;
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     todayList:[],//日榜存储
     weekList: [],//周榜存储
     monthList: [],//月榜存储

     classify: [
       { id: 1, name: '日排行', setchoose: true, },
       { id: 2, name: '周排行', setchoose: false, },
       { id: 3, name: '月排行', setchoose: false, },
     ],
     /**
      * 在页面上展示的榜单
      */
     business_card: {},
     

   },

   //名片详情
   card_details_click: function (e) {
     wx.navigateTo({
       url: '../store_particulars/store_particulars?id=' + e.currentTarget.dataset.id,
     })
   },
   //信息栏选择
   selectClick: function(e) {
     var that = this;
     for (let i in that.data.classify) {
       if (that.data.classify[i].id == e.currentTarget.dataset.id) {
         that.data.classify[i].setchoose = true;
         switch (that.data.classify[i].id){
           case 1:
             that.data.business_card = that.data.todayList;
           break;

           case 2:
             that.data.business_card = that.data.weekList;
             break;

           case 3:
             that.data.business_card = that.data.monthList;
             break;

         }

       }
       if (that.data.classify[i].id != e.currentTarget.dataset.id) {
         that.data.classify[i].setchoose = false;
       }
     }
     that.setData({
       classify: that.data.classify,
       business_card: that.data.business_card
     })
   },

   Loading:function(){

     let param = {
       userid: wx.getStorageSync('UserInfo').userid,
       _token: wx.getStorageSync('UserInfo')._token,
       type:1,
     };
     util.todayranking(param, function (ret) {
       console.log('日排行榜', ret)
       that.setData({
         business_card: ret,
         todayList: ret
       })
     });

   },

   weekraking: function () {

     let param = {
       userid: wx.getStorageSync('UserInfo').userid,
       _token: wx.getStorageSync('UserInfo')._token,
       type: 2,
     };
     util.todayranking(param, function (ret) {
       console.log('周排行榜', ret)
        that.setData({
          // business_card: ret
          weekList: ret
        })
     });

   },

   monthraking: function () {

     let param = {
       userid: wx.getStorageSync('UserInfo').userid,
       _token: wx.getStorageSync('UserInfo')._token,
       type: 3,
     };
     util.todayranking(param, function (ret) {
       console.log('周排行榜', ret)
        that.setData({
          // business_card: ret
          monthList: ret
        })
     });

   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
     that=this;
     console.log(wx.getStorageSync('userInfo'));
   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function() {
     that.Loading();

     that.weekraking();
     that.monthraking();
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