// pages/select_issue/select_issue.js
const app = getApp()
const util = require('../../utils/util.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // selectImg: '../../images/personal_center/btn_yuangou_pre.png',
    business_card: [],
    messageALL:[],
    all_next_page: 1,
    select_Info: [{ id: 0, type: '供应', selectImg: '../../images/personal_center/btn_yuangou_pre.png', content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S', time: '2018-07-12 14:45', }, { id: 1, type: '求购', selectImg: '../../images/personal_center/btn_yuangou_pre.png', content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S', time: '2018-07-12 14:45', }, { id: 2, type: '供应', selectImg: '../../images/personal_center/btn_yuangou_pre.png', content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S', time: '2018-07-12 14:45', }, { id: 3, type: '纺机', selectImg: '../../images/personal_center/btn_yuangou_pre.png', content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S', time: '2018-07-12 14:45', }, { id: 4, type: '纺机', selectImg: '../../images/personal_center/btn_yuangou_pre.png', content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S', time: '2018-07-12 14:45', }, { id: 5, type: '供应', selectImg: '../../images/personal_center/btn_yuangou_pre.png', content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S', time: '2018-07-12 14:45', },]
  },

//发布名片
  select_card_Click:function(){
    var that = this;
    var newArr = that.data.business_card;
    var newArr1 = that.data.select_Info;
    if (newArr[0].selectImg == '../../images/personal_center/btn_yuangou_pre.png'){
      newArr[0].selectImg = '../../images/personal_center/btn_yuangou.png';
      for (var i in newArr1) {
        newArr1[i].selectImg = '../../images/personal_center/btn_yuangou_pre.png';
      }
    }else{
      newArr[0].selectImg = '../../images/personal_center/btn_yuangou_pre.png'
    }
    that.setData({
      business_card: newArr,
      select_Info: newArr1,
    })
  },


//选择发布
  selectClick: function (e) {
    var that = this;
    var newArr = that.data.select_Info;
    for (var i in newArr) {
      if (newArr[i].id == e.currentTarget.dataset.id) {
        console.log(newArr[i]);
      } else {
        newArr[i].selectImg = '../../images/personal_center/btn_yuangou_pre.png'
      }
   }
    that.setData({
      select_Info: newArr,
    })
  },

//获取将要的发布信息
  getAllList: function () {
    console.log("加载全部信息中")
    if (that.data.all_next_page)
      util.getAllList({
        page: that.data.all_next_page
      }, function (ret) {
        console.log("全部列表", ret);
        var messageALL = [];
        for (var i in ret.data) {
          if (ret.data[i].user)
            messageALL.push({
              id: ret.data[i].itemid, //信息id
              mid: ret.data[i].mid,
              head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
              icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip
              name: ret.data[i].user.truename, //用户姓名
              position: ret.data[i].businesscard.career, //职位
              mobile: ret.data[i].businesscard.mobile,//电话
              demand: ret.data[i].mid == 5 ? '供应' : ret.data[i].mid == 6 ? '求购' : ret.data[i].mid == 88 ? '纺机' : "未知", //发布类别  ()
              company: ret.data[i].businesscard.company, //公司
              lableList: ret.data[i].tags,
              details: ret.data[i].introduce, //信息详情描述
              I_agree: ret.data[i].I_agree,
              I_favortie: ret.data[i].I_favortie,
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
              addtime: ret.data[i].addtime, //发布详细时间
              address: ret.data[i].address, //货物存放地
              page_view: ret.data[i].hits, //浏览量
              like: ret.data[i].agree //点赞
            })
        }
        messageALL = that.data.messageALL.concat(messageALL);
        that.setData({
          messageALL: messageALL,
          all_next_page: ret.next_page
        })

        console.log("全部", that.data.messageALL, ret.next_page)
        that.changeMessage();
      }, null)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var ad_id=options.ad_id
    if(typeof(ad_id)=='undefined'){
      wx.showToast({
        title: '参数错误',
        duration:2000
      })
      setTimeout(function(){
        wx.navigateBack({
        })
      },2000)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    that = this;
    that.setData({
      business_card: wx.getStorageSync('UserInfo')
    })
    that.getAllList();
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