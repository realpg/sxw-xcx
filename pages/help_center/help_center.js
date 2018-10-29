// pages/help_center/help_center.js
const app = getApp()
const util = require('../../utils/util.js');
var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    question: [{ id: 0, title: '你们的广告位怎么卖？', answer: '尊敬的用户您好,在我的页面点击我要推广,即可挑选您想购买的广告位。' }, { id: 1, title: '这个小程序怎么用？', answer: '尊敬的用户您好,这是一个关于纱线市场的信息平台，您可在本程序浏览信息或发布信息。' }, { id: 2, title: '小程序收费吗？', answer: '尊敬的用户您好,如果您想在此发布信息，那是要收取一点费用的。' }, { id: 3, title: '哪里发布信息？', answer: '尊敬的用户您好,点击底部导航栏发布,在选着您想发布的信息类型,之后填写好您想发布的信息详情。' }, { id: 4, title: '怎么可以打广告？', answer: '尊敬的用户您好,可以选择广告位购买，购买成功后我们的客服将会与您联系的。' }, { id: 5, title: '排行榜是干什么的？', answer: '尊敬的用户您好,小程序经过发布信息阅读量，点赞量自动生成日,周,月排行榜,进入排行榜更容易获得更多客户。' }, { id: 6, title: '签到有什么用？金币是用来干嘛的？', answer: '尊敬的用户您好,我们设置签到功能,主要是给您金币进行积攒,每次签到都可以获取到若干金币,可用来发布信息,购买vip、广告位等。' }, { id: 7, title: '如何查看金币消费记录？', answer: '尊敬的用户您好,在会员中心点击金币数量该位置即可跳转到金币消费记录。'  },]
  },
//联系客服
  callClick:function(){
    wx.makePhoneCall({
      phoneNumber: that.data.service_Tel
    })
  },

  // url: '../particulars/particulars?id=' + e.currentTarget.dataset.id + '&mid=' + e.currentTarget.dataset.mid,
 //问题解答
  answeringClick:function(e){
    wx.navigateTo({
      url: '../question_answering/question_answering?id=' + e.currentTarget.dataset.id + '&title=' + e.currentTarget.dataset.title +'&answer='+e.currentTarget.dataset.answer,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    // 获取客服电话
    util.getSystemKeyValue({
      id: 30
    }, function (ret) {
      that.setData({
        service_Tel: ret.value,
      })
    }, null)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    util.getSystemKeyValue({
      id: 29
    }, function (ret) {
     
      console.log(222222222222222222222, ret)
    }, null)
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


