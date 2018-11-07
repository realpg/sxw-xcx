// pages/mine/mine.js
const app = getApp()
const util = require('../../utils/util.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Img_code: '',
    clockin_today:'',
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

  cardClick:function(e){
  wx.navigateTo({
    url: '../store_particulars/store_particulars?id='+e.currentTarget.dataset.id,
})
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
    console.log('签到权限', app.globalData.DTuserInfo)
    if (app.globalData.DTuserInfo.groupid != 6) {
      if (app.globalData.DTuserInfo.updating) {
        wx.showModal({
          title: '个人信息审核中',
          content: '请等待审核完成',
          showCancel: false
        })
      } else {
        wx.showModal({
          title: '请完善个人信息！',
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
    } else {
      let param = {
        userid: that.data.business_card.userid,
        _token: that.data.business_card._token,
      };
      util.signIn(param, function (ret) {
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
          business_card: that.data.business_card,
          clockin_today: true
        })
      })
    }
    // let param = {
    //   userid: that.data.business_card.userid,
    //   _token: that.data.business_card._token,
    // };
    // util.signIn(param, function(ret) {
    //   console.log("签到记录", ret, day);

    //   switch (day) {
    //     case 1:
    //       that.data.sign_in_date[0].isSignin = true;
    //       break;

    //     case 2:
    //       that.data.sign_in_date[1].isSignin = true;
    //       break;

    //     case 3:
    //       that.data.sign_in_date[2].isSignin = true;
    //       break;

    //     case 4:
    //       that.data.sign_in_date[3].isSignin = true;
    //       break;

    //     case 5:
    //       that.data.sign_in_date[4].isSignin = true;
    //       break;

    //     case 6:
    //       that.data.sign_in_date[5].isSignin = true;
    //       break;

    //     case 7:
    //       that.data.sign_in_date[6].isSignin = true;
    //       break;

    //     default:

    //       break;
    //   }

    //   wx.showToast({
    //     title: '金币+' + that.data.gold_coin_get,
    //     duration: 1500
    //   })
    //   that.data.business_card.credit += parseInt(that.data.gold_coin_get)

    //   that.setData({
    //     sign_in_date: that.data.sign_in_date,
    //     business_card: that.data.business_card,
    //     clockin_today:true
    //   })
    // })
  },

  refresh: function() {
    app.getopenid(function() {
      that.setData({
        business_card: app.globalData.DTuserInfo
      })
      that.setData({
        clockin_today: app.globalData.DTuserInfo.clockin_today
      })
      console.log("签到 信息", app.globalData.DTuserInfo.clockin_today)
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
    // that.refresh()
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
    that.hideSelect()
    return {
      title: '我分享了' + that.data.business_card.truename + '的名片',
      path: 'pages/store_particulars/store_particulars?id=' + app.globalData.DTuserInfo.userid,
      success: function(res) {
        console.log("分享成功")
        // 转发成功
        wx.showModal({
          title: '',
          content: '分享成功',
          showCancel:false
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
    wx.setStorage({
      key: 'wx_userInfo',
      data: app.globalData.wx_userInfo,
    })
    app.login(app);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    // var pages=getCurrentPages();
    // console.log(pages);
    // pages[pages.length - 1].onPullDownRefresh()
    that.redactClick()
  },



  //获取小程序维码和设备宽高
  canvas: function () {
    that = this
    //获得设备宽高
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowW: res.windowWidth,
          canvasW: 750,
          windowH: res.windowHeight,
          canvasH: 475
        })
      },
    })
    //获得图片
    util.getCardQR({ _userid: app.globalData.DTuserInfo.userid}, function (res) {
      console.log( '获取图片',res)
      that.setData({
        Img_code: res.tempFilePath
      })
      var canvas = wx.createCanvasContext('canvas');
      that.drawCanvas(canvas);
    }, function (err) {
      wx.showModal({
        title: '下载图片失败',
        content: JSON.stringify(err),
      })
    });
  },

  //画布
  drawCanvas: function () {
    that = this
    const canvas = wx.createCanvasContext('canvas')
    var windowW = that.data.canvasW;
    var windowH = that.data.canvasH;
    var qr = that.data.Img_code;
    canvas.setFillStyle('#f1f4f6')
    canvas.fillRect(0, 0, windowW, windowH);
    canvas.setFillStyle('#ffffff')
    canvas.fillRect(20, 20, windowW - 40, windowH - 40);
    canvas.drawImage(qr, windowW * 0.7, windowH * 0.13, 180, 180);

    canvas.setFillStyle('#000000');
    canvas.setFontSize(36);
    canvas.fillText(that.data.business_card.truename, windowW * 0.07, windowH * 0.24)

    canvas.setFillStyle('#666666');
    canvas.setFontSize(26);
    canvas.fillText(that.data.business_card.career, windowW * 0.07, windowH * 0.35);
    canvas.fillText('长按识别图中的名片码', windowW * 0.3, windowH * 0.24);

    canvas.setFillStyle('#000000');
    canvas.setFontSize(26);
    canvas.fillText('公司：' + that.data.business_card.company, windowW * 0.07, windowH * 0.46);
    console.log('地址',that.data.business_card.address)
    canvas.fillText('地址：' + (that.data.business_card.companyInfo.address.length > 18 ? that.data.business_card.companyInfo.address.substring(0, 18) + "..." : that.data.business_card.companyInfo.address), windowW * 0.07, windowH * 0.57);
    canvas.fillText('电话：', windowW * 0.07, windowH * 0.68);
    canvas.fillText('主营：' + (that.data.business_card.companyInfo.business.length > 18 ? that.data.business_card.companyInfo.business.substring(0, 18) + "..." : that.data.business_card.companyInfo.business), windowW * 0.07, windowH * 0.85);

    canvas.setFillStyle('#f7a821');
    canvas.setFontSize(26);
    canvas.fillText(that.data.business_card.mobile, windowW * 0.168, windowH * 0.68);
    canvas.beginPath();
    canvas.setStrokeStyle('#e6eaf2');
    canvas.moveTo(windowW * 0.07, windowH * 0.75);
    canvas.lineTo(windowW * 0.9, windowH * 0.75);
    canvas.stroke()
    canvas.draw(true, function () {
      wx.canvasToTempFilePath({
        canvasId: 'canvas',
        success: function (res) {
          console.log(res);
          that.setData({
            canvas_img: res.tempFilePath,
          })
        }
      })
    });
  },

  //打开选择栏
  selectClick: function () {
    this.setData({
      is_select_True: true
    })
  },
  //关闭选择弹出层   
  hideSelect: function () {
    this.setData({
      is_select_True: false
    })
  },
  //打开画布图片弹出层
  shareClick: function () {
    this.setData({
      isRuleTrue: true
    })
    that.canvas();
    that.hideSelect();
  },
  //关闭   
  hideRule: function () {
    this.setData({
      isRuleTrue: false
    })
  },

  // 保存图片
  saveImage: function (e) {

    wx.saveImageToPhotosAlbum({
      filePath: that.data.canvas_img,
      success(result) {
        wx.showToast({
          title: '图片保存成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          that.hideRule()
        }, 2000)
      }
    })
    //daozhe
  },



})