// pages/store_particulars/store_particulars.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    business_card:[{
      name:'董小姐',
      post:'销售总监',
      phone:'13666666666',
      company:'南通纺织银源科技有限公司',
      address:'江苏省南通市滨水路6号',
      The_main:'条干13.56,环纺普纱21,普纱28支',
      browse:'888',
      Like: '169',
      collect: '198',
      transpond: '68',
    }],
    
    specific: '宁纺集团棉纺分公司，1987年新上一万枚纱锭，从而使企业结束了有织，无染，无纺的历史，形成了从纺纱、织布、染整一条龙生产格局。经过近几年的发展，目前棉纺分公司拥有细纱机53台，粗纱机11台，并条机24台，梳棉机44台，精简机10台，清',

    message: [{ id: '0', head_portrait_icon: '../../images/index/head_portrait.png', icon_vip: '../../images/index/vip.png', name: '董晓珺', position: '销售总监', demand: '供应', company: '董南通金源纺织科技有限公司', lable_three: '混纺纱', lable_four: '纺织用纱', lable_five: '混纺纱', details: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支', message_Img: [{ message_Image: '../../images/index/Image_details1.png' }, { message_Image: '../../images/index/Image_details2.png' }, { message_Image: '../../images/index/Image_details3.png' }], time: '2018-6-28 14:25', address: '南通、柳橙、诸暨', page_view: '888', like: '888' }, { id: '1', head_portrait_icon: '../../images/index/head_portrait.png', icon_vip: '../../images/index/vip.png', name: '董晓珺', position: '销售总监', demand: '供应', company: '董南通金源纺织科技有限公司', lable_three: '混纺纱', lable_four: '纺织用纱', lable_five: '混纺纱', details: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支', message_Img: [{ message_Image: '../../images/index/Image_details1.png' }, { message_Image: '../../images/index/Image_details2.png' }, { message_Image: '../../images/index/Image_details3.png' }], time: '2018-6-28 14:25', address: '南通、柳橙、诸暨', page_view: '888', like: '888' }, { id: '2', head_portrait_icon: '../../images/index/head_portrait.png', icon_vip: '../../images/index/vip.png', name: '董晓珺', position: '销售总监', demand: '供应', company: '董南通金源纺织科技有限公司', lable_three: '混纺纱', lable_four: '纺织用纱', lable_five: '混纺纱', details: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支', message_Img: [{ message_Image: '../../images/index/Image_details1.png' }, { message_Image: '../../images/index/Image_details2.png' }, { message_Image: '../../images/index/Image_details3.png' }], time: '2018-6-28 14:25', address: '南通、柳橙、诸暨', page_view: '888', like: '888' },]
  },


  //查看详情
  view_details_click:function(){
    wx.navigateTo({
      url: '../shops_intro/shops_intro',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

//返回首页
  back_homepage_click: function () {
    wx.switchTab({
      url: '../index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //拨打电话
  making_call_click: function () {
  wx.makePhoneCall({
    phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
  },

  //排行榜
  ranking_list_click: function () {
    wx.navigateTo({
      url: '../ranking_list/ranking_list',
    })
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