 // pages/ranking_list/ranking_list.js
 const app= getApp();
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     todayList:[],//日榜存储
     weekList: [],//周榜存储
     monthList: [],//月榜存储
     /**
      * 在页面上展示的榜单
      */
     business_card: [
      //  {
      //    id: '0',
      //    icon_first: '../../images/store/icon_first.png',
      //    name: '董小姐',
      //    post: '销售总监',
      //    phone: '13666666666',
      //    headImg: '../../images/index/head_portrait.png',
      //    company: '南通纺织银源科技有限公司',
      //    address: '江苏省南通市滨水路6号',
      //    The_main: '精疏60支,环锭纺,16支，气流纺织,环纺普纱',
      //    number: '888',
      //  }, {
      //    id: '1',
      //    icon_first: '../../images/store/icon_second.png',
      //    name: '董小姐',
      //    post: '销售总监',
      //    phone: '13666666666',
      //    headImg: '../../images/index/head_portrait.png',
      //    company: '南通纺织银源科技有限公司',
      //    address: '江苏省南通市滨水路6号',
      //    The_main: '精疏60支,环锭纺,16支，气流纺织,环纺普纱',
      //    number: '888',
      //  },
      //  {
      //    id: '2',
      //    icon_first: '../../images/store/icon_third.png',
      //    name: '董小姐',
      //    post: '销售总监',
      //    phone: '13666666666',
      //    headImg: '../../images/index/head_portrait.png',
      //    company: '南通纺织银源科技有限公司',
      //    address: '江苏省南通市滨水路6号',
      //    The_main: '精疏60支,环锭纺,16支，气流纺织,环纺普纱',
      //    number:'888',
      //  },
      //  {
      //    id: '3',
      //    icon_first: '../../images/store/icon_third.png',
      //    name: '董小姐',
      //    post: '销售总监',
      //    phone: '13666666666',
      //    headImg: '../../images/index/head_portrait.png',
      //    company: '南通纺织银源科技有限公司',
      //    address: '江苏省南通市滨水路6号',
      //    The_main: '精疏60支,环锭纺,16支，气流纺织,环纺普纱',
      //    number:'888',
      //  },
      //  {
      //    id: '4',
      //    icon_first: '../../images/store/icon_third.png',
      //    name: '董小姐',
      //    post: '销售总监',
      //    phone: '13666666666',
      //    headImg: '../../images/index/head_portrait.png',
      //    company: '南通纺织银源科技有限公司',
      //    address: '江苏省南通市滨水路6号',
      //    The_main: '精疏60支,环锭纺,16支，气流纺织,环纺普纱',
      //    number: '888',
      //  },
      //  {
      //    id: '5',
      //    icon_first: '../../images/store/icon_third.png',
      //    name: '董小姐',
      //    post: '销售总监',
      //    phone: '13666666666',
      //    headImg: '../../images/index/head_portrait.png',
      //    company: '南通纺织银源科技有限公司',
      //    address: '江苏省南通市滨水路6号',
      //    The_main: '精疏60支,环锭纺,16支，气流纺织,环纺普纱',
      //    number: '888',
      //  },
     ],

   },


   //信息栏选择
   selectClick: function(e) {
     var that = this;
     // console.log(e)
     if (e.target.dataset.nn == 1) {
       that.setData({
         all_color: '#01C46C',
         supply_color: '#9B9B9B',
         buy_color: '#9B9B9B',
         equipment_color: '#9B9B9B',
       })
     } else if (e.target.dataset.nn == 2) {

       that.setData({
         all_color: '#9B9B9B',
         supply_color: '#01C46C',
         buy_color: '#9B9B9B',
         equipment_color: '#9B9B9B',
       })
     } else if (e.target.dataset.nn == 3) {

       that.setData({
         all_color: '#9B9B9B',
         supply_color: '#9B9B9B',
         buy_color: '#01C46C',
         equipment_color: '#9B9B9B',
       })
     }
   },

   Loading:function(){
     const that=this;
     wx.request({
       url: app.https.url + 'api/ranking',
       data: {
         userid: wx.getStorageSync('UsetInfo').userid,
         _token: wx.getStorageSync('UsetInfo')._token,
         type: 1
       },
       header: { 'content-type': 'application/x-www-form-urlencoded' },
       method: 'GET',
       success: function (res) {
         console.log(res.data.ret);
         that.setData({
           todayList:res.data.ret,
           business_card: res.data.ret
         })
       },
       fail: function (res) { },
     })
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
     const that=this;
     console.log(wx.getStorageSync('userInfo'));
   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function() {
     const that=this;
     that.Loading();

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