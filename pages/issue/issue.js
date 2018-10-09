const app = getApp()
const util = require('../../utils/util.js');
var that;
// pages/issue/issue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    business_card:[],
    details: [{ id: 0, disclaimer_details: '1、“中国纱线网纱线商城”内各类信息内容由发布者（个人、企  业、贸易商等）提供，内容的真实性、准确性和合法性由发布者负责，“纱线商城”对此不承担任何责任。' }, { id: 1, disclaimer_details: '2、“纱线商城”部分资料来源于互联网，如内容侵犯了您的权益，请联系我们，我们会在24小时内处理。' }, { id: 2, disclaimer_details: '3、“纱线商城”只提供发布浏览纱线需求，给纱线需求做对接，一切交易是用户自行自愿交易，对交易风险由交易双方自行负责，“纱线商城”对此不承担任何保证责任。' }],
    classify: [{ id:1, cimg: '../../images/index/icon_xinxigy.png', ciName: '供应信息' }, { id:2, cimg: '../../images/index/icon_shop.png', ciName: '求购信息' }, { id:3, cimg: '../../images/index/icon_ershou.png', ciName: '纺机信息' },],
  },

  // 分类跳转
  classifyClick: function(e){
    const that = this;
    console.log(e.currentTarget.dataset.id);
    console.log('权限',that.data.business_card.groupid)
    if (that.data.business_card.groupid != 6){

      if (app.globalData.DTuserInfo.updating) {
        wx.showModal({
          title: '个人信息审核中',
          content: '请等待审核完成',
          showCancel: false
        })
      } else {
        wx.showModal({
          title: '完善个人信息后才能发布！',
          content: '是否前往完善个人信息?',
          showCancel: true,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateTo({
                url: "../personal_data/personal_data"
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
      return;
    }
    if (e.currentTarget.dataset.id==1){
      if (that.data.business_card.groupid == 6) {
        wx.navigateTo({
          url: '../release_supply_information/release_supply_information',
        })
      }
      else {}
 
    } else if (e.currentTarget.dataset.id==2){
     
      if (that.data.business_card.groupid == 6) {
        wx.navigateTo({
          url: '../release_purchase_information/release_purchase_information',
        })
      }
      else {
        if (app.globalData.DTuserInfo.updating) {
          wx.showToast({
            title: '请等待信息审核完成',
            icon: "none",
            druation: 2000,
          })
        } else {
          wx.showToast({
            title: '请完善个人信息',
            icon: "none",
            druation: 2000,
          })
          setTimeout(function () {
            wx.switchTab({
              url: "../mine/mine"
            })
          }, 2000)
        }
      }

    } else if (e.currentTarget.dataset.id==3) {
    
      if (that.data.business_card.groupid == 6) {
        wx.navigateTo({
          url: '../second_hand_equipment/second_hand_equipment',
        })
      }
      else {
        if (app.globalData.DTuserInfo.updating) {
          wx.showToast({
            title: '请等待信息审核完成',
            icon: "none",
            druation: 2000,
          })
        } else {
          wx.showToast({
            title: '请完善个人信息',
            icon: "none",
            druation: 2000,
          })
          setTimeout(function () {
            wx.switchTab({
              url: "../mine/mine"
            })
          }, 2000)
        }
      }
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
    that=this;
    // app.login(app, function () {
      that.setData({
        business_card: app.globalData.DTuserInfo
      })
      console.log("现在的userinfo", that.data.business_card)
    // });
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