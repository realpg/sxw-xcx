 // pages/ranking_list/ranking_list.js
const app = getApp();
const util = require('../../utils/util.js');
let that;
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     hint:'提示：排名依据第一优先级为广告推广，其次依据点赞数量',
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
     console.log('浏览量加', that.data.business_card)
     wx.navigateTo({
       url: '../store_particulars/store_particulars?id=' + e.currentTarget.dataset.id,
     })
     for (var i in that.data.business_card) {
       if ( that.data.business_card[i].businesscard.userid == e.currentTarget.dataset.id)      {
         that.data.business_card[i].businesscard.view++;
       }
     }
     that.setData({
       business_card: that.data.business_card
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
       userid: wx.getStorageSync('DTUserinfo').userid,
       _token: wx.getStorageSync('DTUserinfo')._token,
       type:1,
     };
     util.todayranking(param, function (ret) {
       console.log('日排行榜', ret)
        var list=ret?ret:[];
       that.setData({
         business_card: list,
         todayList: list
       })
       var card = getApp().globalData.DTuserInfo.businesscard;
       if (card.vip < 1) {
         for (var i in that.data.todayList) {
           if (that.data.todayList[i].businesscard.buys > 0){
           that.data.todayList[i].businesscard.mobile = that.data.todayList[i].businesscard.mobile.substring(0, 3) + '****' + that.data.todayList[i].businesscard.mobile.substring(7, 11);
           that.data.todayList[i].businesscard.company = that.data.todayList[i].businesscard.company.substring(0, 2) + '****' + that.data.todayList[i].businesscard.company.substring(that.data.todayList[i].businesscard.company.length - 4, that.data.todayList[i].businesscard.company.length)
         }
         }
         that.setData({
           business_card: that.data.todayList,
           todayList: that.data.todayList
         })
       }
       console.log('隐藏', that.data.todayList)
     });

   },

   weekraking: function () {

     let param = {
       userid: wx.getStorageSync('DTUserinfo').userid,
       _token: wx.getStorageSync('DTUserinfo')._token,
       type: 2,
     };
     util.todayranking(param, function (ret) {
       console.log('周排行榜', ret)
        that.setData({
          // business_card: ret
          weekList: ret
        })
       var card = getApp().globalData.DTuserInfo.businesscard;
       if (card.vip < 1 ) {
         for (var i in that.data.weekList) {
           if (that.data.weekList[i].businesscard.buys > 0){
           that.data.weekList[i].businesscard.mobile = that.data.weekList[i].businesscard.mobile.substring(0, 3) + '****' + that.data.weekList[i].businesscard.mobile.substring(7, 11);
           that.data.weekList[i].businesscard.company = that.data.weekList[i].businesscard.company.substring(0, 2) + '****' + that.data.weekList[i].businesscard.company.substring(that.data.weekList[i].businesscard.company.length - 4, that.data.weekList[i].businesscard.company.length)
           }
         }
         that.setData({
           weekList: that.data.weekList
         })
       }
       console.log('隐藏', that.data.weekList)
     });
    
   },

   monthraking: function () {

     let param = {
       userid: wx.getStorageSync('DTUserinfo').userid,
       _token: wx.getStorageSync('DTUserinfo')._token,
       type: 3,
     };
     util.todayranking(param, function (ret) {
       console.log('月排行榜', ret)
       var list = ret?ret:[]
        that.setData({
        //  business_card: list,
          monthList: list
        })
       var card = getApp().globalData.DTuserInfo.businesscard;
       if (card.vip < 1 ) {
         for (var i in that.data.monthList) {
           if (that.data.monthList[i].businesscard.buys > 0){
           that.data.monthList[i].businesscard.mobile = that.data.monthList[i].businesscard.mobile.substring(0, 3) + '****' + that.data.monthList[i].businesscard.mobile.substring(7, 11);
           that.data.monthList[i].businesscard.company = that.data.monthList[i].businesscard.company.substring(0, 2) + '****' + that.data.monthList[i].businesscard.company.substring(that.data.monthList[i].businesscard.company.length - 4, that.data.monthList[i].businesscard.company.length)
         }
         }
         that.setData({
           monthList: that.data.monthList
         })
       }
       console.log('隐藏', that.data.monthList)
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