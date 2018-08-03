// pages/store/store.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideshow: [{ id: 0, slideshowImg: '../../images/index/Yarn_image1.jpg' }, { id: 1, slideshowImg: '../../images/index/Yarn_image.jpg' }, { id: 2, slideshowImg: '../../images/index/Yarn_image1.jpg' }],

    classify: [{ id: 0, cimg: '../../images/store/icon_mianhua.png', ciName: '棉花' }, { id: 1, cimg: '../../images/store/icon_shaxian.png', ciName: '纱线' }, { id: 2, cimg: '../../images/store/icon_huaqian.png', ciName: '化纤' }, { id: 3, cimg: '../../images/store/icon_peibu.png', ciName: '坯布' }, { id: 4, cimg: '../../images/store/icon_mianliao.png', ciName: '面料' }, { id: 5, cimg: '../../images/store/icon_fuliao.png', ciName: '辅料' }, { id: 6, cimg: '../../images/store/icon_fuzhuang.png', ciName: '服装' }, { id: 7, cimg: '../../images/store/icon_jipeijian.png', ciName: '机配件' }, { id: 8, cimg: '../../images/store/icon_qita.png', ciName: '其他' }, { id: 9, cimg: '../../images/store/icon_paihangbang.png', ciName: '排行榜' },],
    recommend_store_List: [
      {    
      recommend_store: [{ id: 0, store_name: '南通银源纺织科技', store_type: '供应', lable_one: '差别化', lable_two: '纺织用纱', store_info: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支' }, { id: 2, store_name: '南通银源纺织科技', store_type: '供应', lable_one: '差别化', lable_two: '纺织用纱', store_info: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支' }]
       },
      {
        recommend_store: [{ id: 0, store_name: '南通银源纺织科技1', store_type: '供应', lable_one: '差别化', lable_two: '纺织用纱', store_info: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支' }, { id: 2, store_name: '南通银源纺织科技', store_type: '供应', lable_one: '差别化', lable_two: '纺织用纱', store_info: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支' }]
      },
    ],

    //点击改变颜色
    all_color: '',
    supply_color: '',
    buy_color: '',
    equipment_color: '',

    messageList: [{ id: 0, iconImg: '../../images/index/head_portrait.png', name: '董晓珺', post: '销售总监', vip: '../../images/index/vip.png', companyName: '杭州精纱信息有限公司', number: '6666', main_business: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支' }, { id: 1, iconImg: '../../images/index/head_portrait.png', name: '董晓珺', post: '销售总监', vip: '../../images/index/vip.png', companyName: '杭州精纱信息有限公司', number: '6666', main_business: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支' }, { id:2, iconImg: '../../images/index/head_portrait.png', name: '董晓珺', post: '销售总监', vip: '../../images/index/vip.png', companyName: '杭州精纱信息有限公司', number: '6666', main_business: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支' },]
  },


  //查看名片
  enter_store_click:function(){
    wx.navigateTo({
      url: "../store_particulars/store_particulars"
    })
  },

  //分类
  classifyClick: function (e) {
    const that=this;
    switch (e.currentTarget.dataset.ciName) {
      case '排行榜':
        wx.navigateTo({
          url: '../ranking_list/ranking_list',
        })
        break;
      default:
        // wx.navigateTo({
        //   url: '../housesInformation/housesInformation?id=' + e.currentTarget.dataset.ciName,
        // })
        break;
    }
    wx.navigateTo({
      url: '../ranking_list/ranking_list',
    })
  },

//查看
  messageList_click:function(){
      wx.navigateTo({
        url: '../store_particulars/store_particulars',
      })
  },
  //信息栏选择
  selectClick: function (e) {
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
    } else if (e.target.dataset.nn == 4) {

      that.setData({
        all_color: '#9B9B9B',
        supply_color: '#9B9B9B',
        buy_color: '#9B9B9B',
        equipment_color: '#01C46C',
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