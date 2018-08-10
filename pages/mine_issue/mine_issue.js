// pages/mine_issue/mine_issue.js
const app = getApp()
const util = require('../../utils/util.js');
var that;
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
    information: [{ id: '0', lable_one: '混纺纱', lable_two: '纺织用纱', lable_three: '混纺纱', content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S', time: '2018-07-12 14:45', browse: '880', like: '68', collect: '126' }, { id: '1', lable_one: '混纺纱', lable_two: '纺织用纱', lable_three: '混纺纱', content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S', time: '2018-07-12 14:45', browse: '880', like: '68', collect: '126' }, { id: '2', lable_one: '混纺纱', lable_two: '纺织用纱', lable_three: '混纺纱', content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S', time: '2018-07-12 14:45', browse: '880', like: '68', collect: '126' },],

    sellList:[],
    buyList:[],
    fjmyList:[]
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
        information: that.data.sellList
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
    that = this;
    
    that.setData({
      business_card: wx.getStorageSync('UsetInfo')
    })
    setTimeout(function(){
      util.sellList_mine({}, function (ret) {
        console.log(ret);
        var sellList = that.data.sellList;
        for (var i in ret.data) {
          if (ret.data[i].user)
            sellList.push({
              id: ret.data[i].itemid, //信息id
              head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
              icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
              name: ret.data[i].user.truename, //用户姓名
              position: ret.data[i].businesscard.career, //职位
              demand: '供应', //发布类别  ()
              company: ret.data[i].businesscard.company, //公司
              lableList: [ //标签 后续跟进
                {
                  lable: '混纺纱'
                },
                {
                  lable: '纺织用纱'
                },
                {
                  lable: '混纺纱'
                },
              ],
              details: ret.data[i].introduce, //信息详情描述
              message_Img: //详情图片  后续跟进
                [{
                  message_Image: ret.data[i].thumb
                },
                {
                  message_Image: ret.data[i].thumb1
                },
                {
                  message_Image: ret.data[i].thumb2
                }
                ],
              time: ret.data[i].adddate, //发布时间
              address: ret.data[i].address, //货物存放地
              page_view: ret.data[i].hits, //浏览量
              like: ret.data[i].agree, //点赞
              favorite: ret.data[i].favorite
            })
        }
        that.setData({
          sellList: sellList,
          sell_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
        })
      }, null);
    },2000) 
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