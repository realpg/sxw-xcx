// pages/mine/mine.js
const app = getApp()
const util = require('../../utils/util.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    business_card: {
      name: '',
      post: '',
      phone: '',
      company: '',
      address: '',
      The_main: '',
      browse: '',
      Like: '',
      collect: '',
      transpond: '',
    },

    gold: '',
    sign_in_date: [{
        id: 1,
        isSignin: false,
        week: '周一'
      },
      {
        id: 2,
        isSignin: false,
        week: '周二'
      },
      {
        id: 3,
        isSignin: false,
        week: '周三'
      },
      {
        id: 4,
        isSignin: false,
        week: '周四'
      },
      {
        id: 5,
        isSignin: false,
        week: '周五'
      },
      {
        id: 6,
        isSignin: false,
        week: '周六'
      },
      {
        id: 7,
        isSignin: false,
        week: '周日'
      }
    ],

    mine_item: [{
        id: '0',
        iconImg: '../../images/personal_center/yaoyue.png',
        title: '邀约赚金币',
        describe: '邀请好友赚金币',
      },
      {
        id: '1',
        iconImg: '../../images/personal_center/dati.png',
        title: '答题赚金币',
        describe: '玩游戏涨知识赚金币',
      },
      {
        id: '2',
        iconImg: '../../images/personal_center/wtuiguang.png',
        title: '我要推广',
        describe: 'PC、移动端全网覆盖，帮您推广',
      },
      {
        id: '3',
        iconImg: '../../images/personal_center/guanggaowei.png',
        title: '我的广告位',
        describe: '在这里查看购买的广告位',
      },
      {
        id: '4',
        iconImg: '../../images/personal_center/mine_issue.png',
        title: '我的发布',
        describe: '在这里查看发布的信息',
      },
      {
        id: '5',
        iconImg: '../../images/personal_center/xiaoxi.png',
        title: '我的消息',
        describe: '在这里查看信息',
      },
      {
        id: '6',
        iconImg: '../../images/personal_center/guanzhu.png',
        title: '我的关注',
        describe: '查看关注的信息',
      },
      {
        id: '7',
        iconImg: '../../images/personal_center/help.png',
        title: '帮助中心',
        describe: '遇到问题查看帮助中心',
      },
    ],

    gold_coin_get: '0'
  },
  //金币明细
  goldListClick: function() {
    wx.navigateTo({
      url: '../goldList/goldList',
    })
  },
  //获取金币
  gainClick: function() {
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },

  redactClick: function() {
    wx.navigateTo({
      url: '../personal_data/personal_data',
    })
  },

  //点击选择
  mine_item_click: function(e) {
    var that = this;
    if (e.currentTarget.dataset.id == 0) {
      wx.navigateTo({
        url: '../invite_prize/invite_prize',
      })
    } else if (e.currentTarget.dataset.id == 1) {
      wx.navigateTo({
        url: '../answer_gold/answer_gold',
      })
    } else if (e.currentTarget.dataset.id == 2) {
      wx.navigateTo({
        url: '../mine_promotion/mine_promotion',
      })
    } else if (e.currentTarget.dataset.id == 3) {
      wx.navigateTo({
        url: '../mine_AdPositionId/mine_AdPositionId',
      })
    } else if (e.currentTarget.dataset.id == 4) {
      if (that.data.business_card.groupid == 6) {
        wx.navigateTo({
          url: '../mine_issue/mine_issue',
        })
      } else {
        if (that.data.business_card.updating) {
          wx.showToast({
            title: '请等待信息审核完成',
            icon: "none"
          })
        } else {
          wx.showToast({
            title: '请完善信息',
            icon: "none"
          })
        }

      }
    } else if (e.currentTarget.dataset.id == 5) {
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
    } else if (e.currentTarget.dataset.id == 8) {
      wx.navigateTo({
        url: '../customer_services/customer_services',
      })
    }
  },

  signInList: function() {
    var now = new Date();
    var nowTime = now.getTime();
    var day = now.getDay();
    var oneDayTime = 24 * 60 * 60 * 1000;

    //显示周一
    var MondayTime = nowTime - (day - 1) * oneDayTime;
    if(day==0)
      MondayTime = nowTime - 6 * oneDayTime;
    //显示周日

    var SundayTime = nowTime + (7 - day) * oneDayTime;

    //初始化日期时间
    var monday = new Date(MondayTime);
    var sunday = new Date(SundayTime);


    //打印查看结果
   
    console.log("本周一", monday);
    console.log(sunday);

    let param = {
      userid: that.data.business_card.userid,
      _token: that.data.business_card._token,
      date: monday.toString(),
      days: 7,
    };

    util.signInList(param, function(ret) {
      console.log('签到记录', ret);
      for (let i in ret) {
        if (ret[i]) {
          that.data.sign_in_date[i].isSignin = true;
        }
      }

      that.setData({
        sign_in_date: that.data.sign_in_date
      })
    })

  },

  singInClick: function() {
    let date = new Date();
    let day = date.getDay();

    let param = {
      userid: that.data.business_card.userid,
      _token: that.data.business_card._token,
    };
    util.signIn(param, function(ret) {
      console.log("签到记录", ret, day);

      switch (day) {
        case 1:
          that.data.sign_in_date[0].isSignin = true;
          break;

        case 2:
          that.data.sign_in_date[1].isSignin = true;
          break;

        case 3:
          that.data.sign_in_date[2].isSignin = true;
          break;

        case 4:
          that.data.sign_in_date[3].isSignin = true;
          break;

        case 5:
          that.data.sign_in_date[4].isSignin = true;
          break;

        case 6:
          that.data.sign_in_date[5].isSignin = true;
          break;

        case 7:
          that.data.sign_in_date[6].isSignin = true;
          break;

        default:

          break;
      }

      wx.showToast({
        title: '金币+' + that.data.gold_coin_get,
        duration: 1500
      })
      that.data.business_card.credit += parseInt(that.data.gold_coin_get)

      that.setData({
        sign_in_date: that.data.sign_in_date,
        business_card: that.data.business_card
      })
    })
  },

  refresh: function() {
    app.login(app, function() {
      that.setData({
        business_card: app.globalData.userInfo
      })
      console.log("现在的userinfo", that.data.business_card)
    });

    let date = new Date();
    let day = date.getDay();
    console.log("今天周" + day)
    that.setData({
      weekday: day
    })

    console.log(888888, that.data.business_card)

    that.signInList();
    var gold_coin_get = that.data.gold_coin_get
    util.getSystemKeyValue({
      id: 10
    }, function(ret) {
      that.setData({
        gold_coin_get: ret.value,
      })
      console.log(222222222222222222222, that.data.gold_coin_get)
    }, null)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    that.refresh()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    that.refresh()
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
    console.log('下拉刷新')
    that.refresh();
    wx.stopPullDownRefresh();
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
    return {
      title: '我分享了' + that.data.business_card.truename + '的名片',
      path: 'pages/store_particulars/store_particulars?id=' + that.data.id,
      success: function(res) {
        // 转发成功
        wx.showToast({
          title: '分享成功',
          duration: 1500
        })
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  getUserInfo: function(e) {
    console.log("aaaa", e)
    app.globalData.wx_userInfo = e.detail.userInfo
    app.login(app);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

})