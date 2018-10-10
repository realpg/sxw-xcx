// pages/store_particulars/store_particulars.js
const app = getApp();
const util = require('../../utils/util.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Img_code:'',
    thumb: {},
    wxqr: '',
    id: null,
    business_card: [],
    introduceShow: false,
    specific: '宁纺集团棉纺分公司，1987年新上一万枚纱锭，从而使企业结束了有织，无染，无纺的历史，形成了从纺纱、织布、染整一条龙生产格局。经过近几年的发展，目前棉纺分公司拥有细纱机53台，粗纱机11台，并条机24台，梳棉机44台，精简机10台，清',
    messageList: [],
    message: [{
      id: '0',
      head_portrait_icon: '../../images/index/head_portrait.png',
      icon_vip: '../../images/index/vip.png',
      name: '董晓珺',
      position: '销售总监',
      demand: '供应',
      company: '董南通金源纺织科技有限公司',
      lable_three: '混纺纱',
      lable_four: '纺织用纱',
      lable_five: '混纺纱',
      details: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支',
      message_Img: [{
        message_Image: '../../images/index/Image_details1.png'
      }, {
        message_Image: '../../images/index/Image_details2.png'
      }, {
        message_Image: '../../images/index/Image_details3.png'
      }],
      time: '2018-6-28 14:25',
      address: '南通、柳橙、诸暨',
      page_view: '888',
      like: '888'
    }, {
      id: '1',
      head_portrait_icon: '../../images/index/head_portrait.png',
      icon_vip: '../../images/index/vip.png',
      name: '董晓珺',
      position: '销售总监',
      demand: '供应',
      company: '董南通金源纺织科技有限公司',
      lable_three: '混纺纱',
      lable_four: '纺织用纱',
      lable_five: '混纺纱',
      details: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支',
      message_Img: [{
        message_Image: '../../images/index/Image_details1.png'
      }, {
        message_Image: '../../images/index/Image_details2.png'
      }, {
        message_Image: '../../images/index/Image_details3.png'
      }],
      time: '2018-6-28 14:25',
      address: '南通、柳橙、诸暨',
      page_view: '888',
      like: '888'
    }, {
      id: '2',
      head_portrait_icon: '../../images/index/head_portrait.png',
      icon_vip: '../../images/index/vip.png',
      name: '董晓珺',
      position: '销售总监',
      demand: '供应',
      company: '董南通金源纺织科技有限公司',
      lable_three: '混纺纱',
      lable_four: '纺织用纱',
      lable_five: '混纺纱',
      details: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支',
      message_Img: [{
        message_Image: '../../images/index/Image_details1.png'
      }, {
        message_Image: '../../images/index/Image_details2.png'
      }, {
        message_Image: '../../images/index/Image_details3.png'
      }],
      time: '2018-6-28 14:25',
      address: '南通、柳橙、诸暨',
      page_view: '888',
      like: '888'
    },],
    page: 1, 
  
  },


  //联系商家
  phoneClick: function (e) {

    // var phoneNumber =e.currentTarget.dataset.mobile
    // console.log(888, phoneNumber )
    util.makePhoneCall({
      phoneNumber: that.data.business_card.mobile//仅为示例，并非真实的电话号码
    })
  },
  //预览图片
  previewImClick_company: function (e) {
    console.log(123456, e.currentTarget.dataset.id)
    var that = this;
    var id = e.currentTarget.dataset.id
    var aasss = that.data.thumb;
    console.log(66666, that.data.thumb)
    for (var i in aasss) {
      if (i == id) {
        console.log(344324, aasss[id]);
        wx.previewImage({
          current: aasss[id], // 当前显示图片的http链接
          urls: aasss // 需要预览的图片http链接列表
        })
      }
    }
  },

  previewImClick_code: function () {
    var that = this
    wx.previewImage({
      current: that.data.wxqr,
      urls: [that.data.wxqr]
    })
  },


  //用户名片
  visitingCardInfo: function () {
    var param = {
      userid: wx.getStorageSync('DTUserinfo').userid,
      _token: wx.getStorageSync('DTUserinfo')._token,
      user_id: that.data.id
    };
    util.visitingCardInfo(param, function (ret) {
      console.log('userinfo', ret)
      console.log('小程序码',ret.xcxqr)
      let thumb = that.data.thumb
      thumb = ret.thumb.split(','),
        that.setData({
          business_card: ret,
          thumb: thumb,
          wxqr: ret.wxqr
        })
      var card = getApp().globalData.DTuserInfo.businesscard;
      if (card.vip < 1) {
        that.data.business_card.mobile = that.data.business_card.mobile.substring(0, 3) + '****' + that.data.business_card.mobile.substring(7,11),
          that.data.business_card.company = that.data.business_card.company.substring(0, 2) + '****' + that.data.business_card.company.substring(that.data.business_card.company.length - 4, that.data.business_card.company.length)
        that.setData({
          business_card:that.data.business_card,
        })
      }

      var query = wx.createSelectorQuery();
      //选择id
      query.select('.specific_css').boundingClientRect(function (rect) {
        console.log('获取高度', rect.height)

        if (rect.height >= 90) {
          that.setData({
            introduceShow: true,
          })
        }

      }).exec();

    });
  },
  getInfoByUserid: function () {
    var param = {
      item_userid: that.data.id,
      page: that.data.page
    }
    if (that.data.page)
      util.getInfoByUserid(param, function (ret) {
        console.log('供应信息', ret)
        // that.data.messageList.push(ret.data)
        for (var i in ret.data) {
          that.data.messageList.push({
            id: ret.data[i].itemid, //信息id
            mid: ret.data[i].mid,
            head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
            icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
            name: ret.data[i].businesscard.truename, //用户姓名
            position: ret.data[i].businesscard.career, //职位
            demand: '供应', //发布类别  ()
            mobile: ret.data[i].mobile,
            company: util.hiddenCompany(ret.data[i].businesscard.company), //公司
            lableList: ret.data[i].tags,

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
            time: util.formatTime(new Date(ret.data[i].addtime * 1000)), //发布时间
            addtime: ret.data[i].addtime, //发布详细时间
            address: ret.data[i].address, //货物存放地
            page_view: ret.data[i].hits, //浏览量
            I_agree: ret.data[i].I_agree, //我点赞
            like: ret.data[i].agree, //点赞
            I_favortie: ret.data[i].I_favortie,
            favorite: ret.data[i].favorite, //收藏
          })
        }
        that.data.messageList = that.sort(that.data.messageList)
        that.setData({
          page: ret.next_page,
          messageList: that.data.messageList
        })
      });

  },

  //供应信息
  supplyByUserid: function () {
    var conditions = JSON.stringify({
      key: ['userid', 'status'],
      value: [that.data.id, '3']
    });
    var param = {
      userid: wx.getStorageSync('DTUserinfo').userid,
      _token: wx.getStorageSync('DTUserinfo')._token,
      conditions: conditions
    };
    util.supplyByUserid(param, function (ret) {
      console.log('供应信息', ret)
      // that.data.messageList.push(ret.data)
      for (var i in ret.data) {
        that.data.messageList.push({
          id: ret.data[i].itemid, //信息id
          mid: 5,
          head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
          icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
          name: ret.data[i].businesscard.truename, //用户姓名
          position: ret.data[i].businesscard.career, //职位
          demand: '供应', //发布类别  ()
          mobile: ret.data[i].mobile,
          company: util.hiddenCompany(ret.data[i].businesscard.company), //公司
          lableList: ret.data[i].tags,

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
          time: util.formatTime(new Date(ret.data[i].addtime * 1000)), //发布时间
          addtime: ret.data[i].addtime, //发布详细时间
          address: ret.data[i].address, //货物存放地
          page_view: ret.data[i].hits, //浏览量
          I_agree: ret.data[i].I_agree, //我点赞
          like: ret.data[i].agree, //点赞
          I_favortie: ret.data[i].I_favortie,
          favorite: ret.data[i].favorite, //收藏
        })
      }
      that.data.messageList = that.sort(that.data.messageList)
      that.setData({
        messageList: that.data.messageList
      })
    });
  },

  //求购信息
  PurchaseByUserid: function () {
    var conditions = JSON.stringify({
      key: ['userid', 'status'],
      value: [that.data.id, '3']
    });
    var param = {
      userid: wx.getStorageSync('DTUserinfo').userid,
      _token: wx.getStorageSync('DTUserinfo')._token,
      conditions: conditions
    };
    util.PurchaseByUserid(param, function (ret) {
      console.log('求购信息', ret)
      // that.data.messageList.push(ret.data)
      for (var i in ret.data) {
        that.data.messageList.push({
          id: ret.data[i].itemid, //信息id
          mobile: ret.data[i].mobile,
          mid: 6,
          head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
          icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
          name: ret.data[i].businesscard.truename, //用户姓名
          position: ret.data[i].businesscard.career, //职位
          demand: '求购', //发布类别  ()
          company: util.hiddenCompany(ret.data[i].businesscard.company), //公司
          lableList: ret.data[i].tags,
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
          time: util.formatTime(new Date(ret.data[i].addtime * 1000)), //发布时间
          addtime: ret.data[i].addtime, //发布详细时间
          address: ret.data[i].address, //货物存放地
          page_view: ret.data[i].hits, //浏览量
          I_agree: ret.data[i].I_agree, //我点赞
          like: ret.data[i].agree, //点赞
          I_favortie: ret.data[i].I_favortie,
          favorite: ret.data[i].favorite, //收藏
        })
      }
      that.data.messageList = that.sort(that.data.messageList)
      that.setData({
        messageList: that.data.messageList
      })
    });
  },

  //纺织贸易
  tradeByUserid: function () {
    var conditions = JSON.stringify({
      key: ['userid', 'status'],
      value: [that.data.id, '3']
    });
    var param = {
      userid: wx.getStorageSync('DTUserinfo').userid,
      _token: wx.getStorageSync('DTUserinfo')._token,
      conditions: conditions
    };
    util.tradeByUserid(param, function (ret) {
      console.log('纺织贸易', ret)
      for (var i in ret.data) {
        that.data.messageList.push({
          id: ret.data[i].itemid, //信息id
          mid: 88,
          head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
          icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
          name: ret.data[i].businesscard.truename, //用户姓名
          position: ret.data[i].businesscard.career, //职位
          demand: '纺机', //发布类别  ()
          mobile: ret.data[i].mobile,
          company: util.hiddenCompany(ret.data[i].businesscard.company), //公司
          lableList: ret.data[i].tags,
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
          time: util.formatTime(new Date(ret.data[i].addtime * 1000)), //发布时间
          addtime: ret.data[i].addtime, //发布详细时间
          address: ret.data[i].address, //货物存放地
          page_view: ret.data[i].hits, //浏览量
          I_agree: ret.data[i].I_agree, //我点赞
          like: ret.data[i].agree, //点赞
          I_favortie: ret.data[i].I_favortie,
          favorite: ret.data[i].favorite, //收藏
        })
      }
      that.data.messageList = that.sort(that.data.messageList)
      that.setData({
        messageList: that.data.messageList
      })

    });
  },

  //排序
  sort: function (messageALL) {
    var that = this;
    var arr = messageALL;
    console.log("排序", arr);
    for (var i = 0; i < arr.length; i++)
      for (var u = i + 1; u < arr.length; u++) {
        if (arr[i].addtime < arr[u].addtime) {
          //如果 array[i] > <array[u] ，就声明一个缓存遍历 num 存放大的数据，然后把两个数据的下标进行更换，达到升序排序的效果。
          var num = arr[i];
          arr[i] = arr[u];
          arr[u] = num;
        }
      }

    for (var i = 0; i < arr.length; i++) {
      for (var u = i + 1; u < arr.length; u++) {
        if (arr[i].icon_vip < arr[u].icon_vip) {
          //如果 array[i] > <array[u] ，就声明一个缓存遍历 num 存放大的数据，然后把两个数据的下标进行更换，达到升序排序的效果。
          var num = arr[i];
          arr[i] = arr[u];
          arr[u] = num;
        }

      }

    }

    return arr;
  },

  //名片点赞
  setLike_card_Click: function (e) {
    console.log(e.currentTarget.dataset.mid, e.currentTarget.dataset.id)
    var param = {
      // userid: wx.getStorageSync('DTUserinfo').userid.userid,
      // _token: wx.getStorageSync('DTUserinfo')._token,
      item_mid: e.currentTarget.dataset.mid,
      item_id: e.currentTarget.dataset.id
    };
    util.setLike(param, function (res) {
      console.log('点击名片点赞', res);
      wx.showToast({
        title: '点赞成功',
        icon: 'none',
        duration: 2000
      })

      that.data.business_card.I_agree = true;
      that.data.business_card.agree++;
      that.setData({
        business_card: that.data.business_card
      })
    }, null)
  },

  //点赞
  setLikeClick: function (e) {
    console.log(e.currentTarget.dataset.mid, e.currentTarget.dataset.id)
    var param = {
      // userid: wx.getStorageSync('DTUserinfo').userid.userid,
      // _token: wx.getStorageSync('DTUserinfo')._token,
      item_mid: e.currentTarget.dataset.mid,
      item_id: e.currentTarget.dataset.id
    };
    util.setLike(param, function (res) {
      console.log('点击点赞', res);
      wx.showToast({
        title: '点赞成功',
        icon: 'none',
        duration: 2000
      })
      for (var i in that.data.messageList) {
        if (that.data.messageList[i].id == res.itemid && that.data.messageList[i].mid == e.currentTarget.dataset.mid) {
          that.data.messageList[i].I_agree = true;
          that.data.messageList[i].like++;
        }
      }
      that.setData({
        messageList: that.data.messageList
      })
    }, null)
  },

  //名片 关注 取消
  enshrine_card_Click: function (e) {
    const that = this;
    var index = e.currentTarget.dataset.index
    console.log(111111, that.data.business_card.I_favorite)
    console.log(e.currentTarget.dataset.mid, e.currentTarget.dataset.id)
    if (that.data.business_card.I_favorite == false) {
      console.log(32432432);
      var param = {
        mid: e.currentTarget.dataset.mid,
        tid: e.currentTarget.dataset.id
      };
      util.enshrine(param, function (res) {
        console.log('收藏', res, that.data.business_card);
        wx.showToast({
          title: '收藏成功',
          icon: 'none',
          duration: 2000
        })
        that.data.business_card.I_favorite = true;
        that.data.business_card.favorite++;

        that.setData({
          business_card: that.data.business_card
        })
      }, null)
    } else {
      var param = {
        // userid: wx.getStorageSync('DTUserinfo').userid.userid,
        // _token: wx.getStorageSync('DTUserinfo')._token,
        mid: e.currentTarget.dataset.mid,
        tid: e.currentTarget.dataset.id,
        cancle: '1'
      };
      util.enshrine(param, function (res) {
        console.log('取消收藏', res, that.data.business_card, that.data.business_card);

        that.data.business_card.I_favorite = false;
        that.data.business_card.favorite--;

        that.setData({
          business_card: that.data.business_card
        })
        wx.showToast({
          title: '取消成功',
          icon: 'none',
          duration: 2000
        })

      }, null)
    }
    that.setData({
      business_card: that.data.business_card
    })


  },
  //关注 取消
  enshrineClick: function (e) {
    const that = this;
    var index = e.currentTarget.dataset.index
    console.log(e.currentTarget.dataset.mid, e.currentTarget.dataset.id)

    if (that.data.messageList[index].id == e.currentTarget.dataset.id && that.data.messageList[index].mid == e.currentTarget.dataset.mid) {
      if (that.data.messageList[index].I_favortie == false) {
        var param = {
          // userid: wx.getStorageSync('DTUserinfo').userid.userid,
          // _token: wx.getStorageSync('DTUserinfo')._token,
          mid: e.currentTarget.dataset.mid,
          tid: e.currentTarget.dataset.id
        };
        util.enshrine(param, function (res) {
          console.log('收藏', res, that.data.messageList[index]);
          wx.showToast({
            title: '收藏成功',
            icon: 'none',
            duration: 2000
          })
          that.data.messageList[index].I_favortie = true;
          that.data.messageList[index].favorite++;

          that.setData({
            messageList: that.data.messageList
          })
        }, null)
      } else {
        var param = {
          // userid: wx.getStorageSync('DTUserinfo').userid.userid,
          // _token: wx.getStorageSync('DTUserinfo')._token,
          mid: e.currentTarget.dataset.mid,
          tid: e.currentTarget.dataset.id,
          cancle: '1'
        };
        util.enshrine(param, function (res) {
          console.log('取消收藏', res, that.data.messageList[index], that.data.messageList);

          that.data.messageList[index].I_favortie = false;
          that.data.messageList[index].favorite--;

          that.setData({
            messageList: that.data.messageList
          })
          wx.showToast({
            title: '取消成功',
            icon: 'none',
            duration: 2000
          })

        }, null)
      }
      that.setData({
        messageList: that.data.messageList
      })

    }

  },


  //查看详情
  view_details_click: function (e) {
    wx.navigateTo({
      url: '../shops_intro/shops_intro?introduce=' + e.currentTarget.dataset.introduce + '&wxqr=' + e.currentTarget.dataset.wxqr +
        '&thumb=' + e.currentTarget.dataset.thumb,
    })
  },

  //查看详情
  see_details_click: function (e) {
    wx.setStorageSync('businessCard', that.data.business_card)
    wx.navigateTo({
      url: '../particulars/particulars?id=' + e.currentTarget.dataset.id + '&mid=' + e.currentTarget.dataset.mid,
    })
  },

  //返回首页
  back_homepage_click: function () {
    wx.switchTab({
      url: '../index/index',
    })
  },

  //拨打电话
  making_call_click: function () {
    util.makePhoneCall({
      phoneNumber: that.data.business_card.mobile//仅为示例，并非真实的电话号码
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
    that = this;

    var scene = JSON.stringify(decodeURIComponent(options.scene));

    if (options.id) {
      that.setData({
        id: options.id
      })
    } else {
      if (scene.search(/userid=\d/) >= 0) {
        console.log("正则匹配成功", scene, scene.replace('userid=', '').replace('"', ""));
        that.setData({
          id: scene.replace('"userid=', '').replace('"', "")
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    that.visitingCardInfo();
    that.getInfoByUserid();
    // that.supplyByUserid();
    // that.PurchaseByUserid();
    // that.tradeByUserid();
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
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    that.getInfoByUserid()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    console.log('下拉刷新');
    // this.requestNetAllData(page, 1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '我分享了' + that.data.business_card.truename + '的名片',
      path: 'pages/store_particulars/store_particulars?id=' + that.data.id,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '分享成功',
          duration: 1500
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },



  //获取小程序维码和设备宽高
  canvas:function(){
      that=this

    //获得设备宽高
    wx.getSystemInfo({
      success: function (res) {
        // console.log("设备", res.windowWidth,
        //   res.windowWidth,
        //   res.windowHeight,
        //   res.windowWidth)
        that.setData({
          windowW: res.windowWidth,
          canvasW: 750,
          windowH: res.windowHeight,
          canvasH: 475
        })
      },
    })
       //获得图片
    util.getCardQR({ _userid:that.data.id }, function (res) {
      console.log(res)

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
  drawCanvas: function (){
    that=this
    const canvas = wx.createCanvasContext('canvas')
    var windowW = that.data.canvasW;
    var windowH = that.data.canvasH;
    var qr = that.data.Img_code;
    canvas.setFillStyle('#f1f4f6')
    canvas.fillRect(0, 0, windowW, windowH);
    canvas.setFillStyle('#ffffff')
    canvas.fillRect(20, 20, windowW-40, windowH-40);
    canvas.drawImage(qr, windowW*0.7 , windowH*0.13 , 180, 180);

    canvas.setFillStyle('#000000');
    canvas.setFontSize(36);
    canvas.fillText(that.data.business_card.truename, windowW*0.07, windowH*0.24)

    canvas.setFillStyle('#666666');
    canvas.setFontSize(26);
    canvas.fillText(that.data.business_card.career, windowW * 0.07, windowH * 0.35);
    canvas.fillText('长按识别图中的名片码', windowW * 0.3, windowH * 0.24);

    canvas.setFillStyle('#000000');
    canvas.setFontSize(26);
    canvas.fillText('公司：' + that.data.business_card.company, windowW * 0.07, windowH * 0.46);
    canvas.fillText('地址：' + (that.data.business_card.address.length > 18 ? that.data.business_card.address.substring(0, 18) + "..." : that.data.business_card.address), windowW * 0.07, windowH * 0.57);
    canvas.fillText('电话：', windowW * 0.07, windowH * 0.68);
    canvas.fillText('主营：' + (that.data.business_card.business.length > 18 ? that.data.business_card.business.substring(0, 18) + "..." : that.data.business_card.business), windowW * 0.07, windowH * 0.85);
   
    canvas.setFillStyle('#f7a821');
    canvas.setFontSize(26);
    canvas.fillText(that.data.business_card.mobile, windowW * 0.168, windowH * 0.68);
    canvas.beginPath();
    canvas.setStrokeStyle('#e6eaf2');
    canvas.moveTo(windowW * 0.07, windowH * 0.75);
    canvas.lineTo(windowW * 0.9, windowH * 0.75);
    canvas.stroke()
    canvas.draw(true,function(){
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

  //打开弹出层
  shareClick: function () {
    this.setData({
      isRuleTrue: true
    })
    that.canvas();
    that.hideSelect();
  },
  //关闭规则提示    
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


  //打开选择栏
  selectClick:function(){
    this.setData({
      is_select_True: true
    })
  },
  //关闭规则提示    
  hideSelect: function () {
    this.setData({
      is_select_True: false
    })
  },
  //图片预览
  previewImClick: function (e) {
    console.log(1111, e.currentTarget)
    var that = this;
    var idx = e.currentTarget.dataset.idx;
    var index = e.currentTarget.dataset.index;
    var urls = [];
    for (var i in that.data.messageList[idx].message_Img) {
      urls.push(that.data.messageList[idx].message_Img[i].message_Image)
    }
    console.log(that.data.messageList[idx].message_Img[index],
      that.data.messageList[idx].message_Img)
    wx.previewImage({
      current: that.data.messageList[idx].message_Img[index].message_Image,
      urls: urls // 需要预览的图片http链接列表
    })
  }
})