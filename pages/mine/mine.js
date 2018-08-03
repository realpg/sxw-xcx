// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    business_card: [{
      name: '董小姐',
      post: '销售总监',
      phone: '13666666666',
      company: '南通纺织银源科技有限公司',
      address: '江苏省南通市滨水路6号',
      The_main: '条干13.56,环纺普纱21,普纱28支',
      browse: '888',
      Like: '169',
      collect: '198',
      transpond: '68',
    }],

    gold:'62',
    sign_in_date: [{ id: 0, sign_in_Img: '../../images/personal_center/oval_gold.png', week: '周一' }, { id: 0, sign_in_Img: '../../images/personal_center/oval_gold.png', week: '周二' }, { id: 0, sign_in_Img: '../../images/personal_center/oval_gold.png', week: '周三' }, { id: 0, sign_in_Img: '../../images/personal_center/oval_gold.png', week: '周四' }, { id: 0, sign_in_Img: '../../images/personal_center/oval_gold.png', week: '周五' }, { id: 0, sign_in_Img: '../../images/personal_center/oval_gold.png', week: '周六' }, { id: 0, sign_in_Img: '../../images/personal_center/oval_gold.png', week: '周日' }],

    mine_item: [{ id: '0', iconImg: '../../images/personal_center/yaoyue.png', title: '邀约赚金币', describe: '邀请好友赚金币', }, { id: '1', iconImg: '../../images/personal_center/dati.png', title: '答题赚金币', describe: '玩游戏涨知识赚金币', }, { id: '2', iconImg: '../../images/personal_center/wtuiguang.png', title: '我要推广', describe: 'PC、移动端全网覆盖，帮您推广', }, { id: '3', iconImg: '../../images/personal_center/guanggaowei.png', title: '我的广告位', describe: '在这里查看购买的广告位', }, { id: '4', iconImg: '../../images/personal_center/mine_issue.png', title: '我的发布', describe: '在这里查看发布的信息', },{ id: '5', iconImg: '../../images/personal_center/xiaoxi.png', title: '我的消息', describe: '在这里查看信息', }, { id: '6', iconImg: '../../images/personal_center/guanzhu.png', title: '我的关注', describe: '查看关注的信息', }, { id: '7', iconImg: '../../images/personal_center/help.png', title: '帮助中心', describe: '遇到问题查看帮助中心', },]
  }, 

//获取金币
gainClick:function(){
  wx.navigateTo({
    url: '../recharge/recharge',
  })
  },

//点击选择
  mine_item_click:function(e){
    var that = this;
    if (e.currentTarget.dataset.id == 0){
      wx.navigateTo({
        url: '../invite_prize/invite_prize', 
      })
    } else if (e.currentTarget.dataset.id ==1){
      wx.navigateTo({
        url: '../answer_gold/answer_gold',
      })
    }
    else if (e.currentTarget.dataset.id == 2) {
      wx.navigateTo({
        url: '../mine_promotion/mine_promotion',
      })
    } else if (e.currentTarget.dataset.id == 3) {
      wx.navigateTo({
        url: '../mine_AdPositionId/mine_AdPositionId',
      })
    } else if (e.currentTarget.dataset.id == 4) {
      wx.navigateTo({
        url: '../mine_issue/mine_issue',
      })
    }else if (e.currentTarget.dataset.id == 5) {
      wx.navigateTo({
        url: '../mine_message/mine_message',
      })
    } else if (e.currentTarget.dataset.id == 6) {
      wx.navigateTo({
        url: '../mine_attention/mine_attention',
      })
    } else if (e.currentTarget.dataset.id == 7) {
      wx.navigateTo({
        url: '../help_center/help_center',
      })
    } else if(e.currentTarget.dataset.id == 8) {
      wx.navigateTo({
        url: '../customer_services/customer_services',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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