//index.js
//获取应用实例
var app = getApp();
const util = require('../../utils/util.js');
var that;
Page({
  data: {
    information_list:[]
  },
//纺机头条
  noticeCLick: function () {
    console.log(88888888888888)
    wx.switchTab({
      url: '../information/information',
      success: function (res) {
      },
      fail: function (res) {
      },
      complete: function (res) {
      },
    })
  },
  //搜索框跳转
  serchClick: function () {
    wx.navigateTo({
      url: '../search/search',
      success: function (res) {
      },
      fail: function (res) {
      },
      complete: function (res) {
      },
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

//关注 取消
  enshrineClick: function (e) {
    const that = this;
    console.log(e.currentTarget.dataset.mid, e.currentTarget.dataset.id)
    for (let i in that.data.message) {
      if (that.data.message[i].id == e.currentTarget.dataset.id) {
        if (that.data.message[i].I_favortie == false) {
          var param = {
            // userid: wx.getStorageSync('UserInfo').userid.userid,
            // _token: wx.getStorageSync('UserInfo')._token,
            mid: e.currentTarget.dataset.mid,
            tid: e.currentTarget.dataset.id
          };
          util.enshrine(param, function (res) {
            console.log('收藏', res);
            wx.showToast({
              title: '关注成功',
              icon:'none',
              duration: 2000
            })
            that.data.message[i].I_favortie = true;
            that.setData({
              message: that.data.message
            })
          }, null)
        } else {
          var param = {
            // userid: wx.getStorageSync('UserInfo').userid.userid,
            // _token: wx.getStorageSync('UserInfo')._token,
            mid: e.currentTarget.dataset.mid,
            tid: e.currentTarget.dataset.id,
            cancle: 'false'
          };
          util.enshrine(param, function (res) {
            console.log('取消收藏', res);
            that.data.message[i].I_favortie = false;
            wx.showToast({
              title: '取消成功',
              icon: 'none',
              duration: 2000
            })
            that.setData({
              message: that.data.message
            })
          }, null)
        }
        that.setData({
          message: that.data.message
        })

      }
    }
  },
  setLikeClick: function (e) {

    console.log(e.currentTarget.dataset.mid, e.currentTarget.dataset.id)
    var param = {
      // userid: wx.getStorageSync('UserInfo').userid.userid,
      // _token: wx.getStorageSync('UserInfo')._token,
      item_mid: e.currentTarget.dataset.mid,
      item_id: e.currentTarget.dataset.id
    };
    util.setLike(param, function (res) {
      console.log('点击点赞', res);
      wx.showToast({
        title: '点赞成功',
        icon:'none',
        duration:2000
      })
      for (let i in that.data.message) {
        if (that.data.message[i].id == res.itemid) {
          that.data.message[i].I_agree = true;
          that.data.message[i].like++;
        }
      }
      that.setData({
        message: that.data.message
      })
    }, null)

  },

  Loading: function () {

    var param = {
      userid: wx.getStorageSync('UserInfo').userid.userid,
      _token: wx.getStorageSync('UserInfo')._token,
      inviter_userid: that.data.userid
    };
    util.getBuyInvited(param, function (res) {
      console.log('邀请', res);
    }, null)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    var scroll_width = parseInt(app.globalData.SystemInfo.windowWidth * 471 / 750);
    that.setData({
      scroll_width: scroll_width
    })
    console.log("scroll_width", scroll_width);

    var scene = decodeURIComponent(options.scene)
    if (options.userid) {
      that.setData({
        userid: options.userid
      })
      that.Loading();

    }

    that.reload();

  },

  slideshowClick: function (e) {
    console.log(e.currentTarget.dataset.id, e.currentTarget.dataset.mid, e.currentTarget.dataset.userid, e.currentTarget.dataset.linktype);
    switch (e.currentTarget.dataset.linktype) {
      case 1:
        wx.navigateTo({
          url: '../store_particulars/store_particulars?id=' + e.currentTarget.dataset.userid,
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../particulars/particulars?id=' + e.currentTarget.dataset.id + '&mid=' + e.currentTarget.dataset.mid,
        })
        break;
      case 3:

        break;
      case 4:

        break;
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    that=this
    that.Textile_headlines();
  },

  Textile_headlines:function(){  
    util.InfoList({}, function (res) {
      console.log('根据条件查询资讯列表', res);
      for (let i in res.data) {
        that.data.information_list.push({
          title: res.data[i].title,
        })
      }
      that.setData({
        information_list: that.data.information_list
      })
    }, null)
  },

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
              userid: ret.data[i].businesscard.userid,//userid
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
              favorite: ret.data[i].favorite,//收藏
              like: ret.data[i].agree //点赞
            
            })
        }
        console.log('排序前', messageALL)
        messageALL = that.sort(messageALL);
        console.log('排序后', messageALL)
        messageALL = that.data.messageALL.concat(messageALL);
        that.setData({
          messageALL: messageALL,
          all_next_page: ret.next_page
        })

        console.log("全部", that.data.messageALL, ret.next_page)
        that.changeMessage();
      }, null)
  },

  getSellList: function () {

    if (that.data.sell_next_page)
      util.getSellList({
        page: that.data.sell_next_page
      }, function (ret) {
        console.log("供应列表", ret);
        var sellList = [];
        for (var i in ret.data) {
          if (ret.data[i].user)
            sellList.push({
              id: ret.data[i].itemid, //信息id
              mid: 5,
              head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
              icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip
              name: ret.data[i].user.truename, //用户姓名
              userid: ret.data[i].businesscard.userid,//userid
              position: ret.data[i].businesscard.career, //职位
              mobile: ret.data[i].businesscard.mobile,//电话
              demand: '供应', //发布类别  ()
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
              favorite: ret.data[i].favorite,//收藏
              like: ret.data[i].agree //点赞
            })
        }
        console.log("供应", that.data.sellList)
        sellList = that.data.sellList.concat(sellList);
        that.setData({
          sellList: sellList,
          sell_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
        })
        that.changeMessage();
      }, null)
  },

  getBuyList: function () {

    if (that.data.buy_next_page)
      util.getBuyList({
        page: that.data.buy_next_page
      }, function (ret) {
        console.log("求购列表", ret);
        var buyList = [];
        for (var i in ret.data) {
          if (ret.data[i].user)
            buyList.push({
              id: ret.data[i].itemid, //信息id
              mid: 6,
              head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
              icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip
              name: ret.data[i].businesscard.truename, //用户姓名
              userid: ret.data[i].businesscard.userid,//userid
              position: ret.data[i].businesscard.career, //职位
              mobile: ret.data[i].businesscard.mobile,//电话
              demand: '求购', //发布类别  ()
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
              favorite: ret.data[i].favorite,//收藏
              like: ret.data[i].agree //点赞
            })
        }
        console.log("求购", that.data.buyList)
        buyList = that.data.buyList.concat(buyList);
        that.setData({
          buyList: buyList,
          buy_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
        })

        that.changeMessage();
      }, null)
  },

  getFJMYList: function () {

    if (that.data.fjmy_next_page)
      util.getFJMYList({
        page: that.data.fjmy_next_page
      }, function (ret) {
        console.log("纺机列表", ret);
        var fjmyList = [];
        for (var i in ret.data) {
          if (ret.data[i].user)
            fjmyList.push({
              id: ret.data[i].itemid, //信息id
              mid: 88,
              head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
              icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip
              name: ret.data[i].businesscard.truename, //用户姓名
              userid: ret.data[i].businesscard.userid,//userid
              position: ret.data[i].businesscard.career, //职位
              mobile: ret.data[i].businesscard.mobile,//电话
              demand: '纺机', //发布类别  ()
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
              favorite: ret.data[i].favorite,//收藏
              like: ret.data[i].agree //点赞
            })
        }
        fjmyList = that.data.fjmyList.concat(fjmyList);
        console.log("纺机", that.data.fjmyList)

        that.setData({
          fjmyList: fjmyList,
          fjmy_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
        })

        that.changeMessage();
      }, null)
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.wx_userInfo = e.detail.userInfo
    app.login(app);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  classifyClick: function (e) {

    console.log(e.currentTarget.dataset.id);
    for (var i in that.data.classify) {
      if (e.currentTarget.dataset.id == that.data.classify[i].id) {
        console.log(that.data.classify[i]);
      }
    }
  },

  // 供应信息 采购大厅 二手设备 签到
  classifyClick: function (e) {

    if (e.currentTarget.dataset.id != 4) {
      wx.navigateTo({
        url: '../information_provision/information_provision?id=' + e.currentTarget.dataset.id,
      })
    } else {
      if (wx.getStorageSync('UserInfo')) {
        let param = {
          userid: wx.getStorageSync('UserInfo').userid,
          _token: wx.getStorageSync('UserInfo')._token,
        };
        util.signIn(param, function (ret) {
          console.log(ret)
          wx.showToast({
            title: '签到成功',
            duration: 1500
          })
        });
      } else {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 1500
        })
      }
    }
  },

  //联系客服
  callClick: function () {
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
  },

  //联系商家
  phoneClick: function (e) {

    // var phoneNumber =e.currentTarget.dataset.mobile
    // console.log(888, phoneNumber )
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.mobile  //仅为示例，并非真实的电话号码
    })
  },
  //排序
  sort: function (messageALL) {
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

  //信息栏选择
  selectClick: function (e) {
    that.setData({
      nn: e.target.dataset.nn
    })
    that.changeMessage();
    // console.log(e)
  },

  //根据that.data.nn改变展示内容
  changeMessage: function () {
    if (that.data.nn == 1) {
      var messageALL = that.data.messageALL;

      that.setData({
        all_color: '#01C46C',
        supply_color: '#9B9B9B',
        buy_color: '#9B9B9B',
        equipment_color: '#9B9B9B',
        message: messageALL,
      })
    } else if (that.data.nn == 2) {
      // if (that.data.sellList.length == 0){
      //   that.getSellList();
      // }
      that.setData({
        all_color: '#9B9B9B',
        supply_color: '#01C46C',
        buy_color: '#9B9B9B',
        equipment_color: '#9B9B9B',
        message: that.data.sellList
      })
    } else if (that.data.nn == 3) {
      // if (that.data.buyList.length == 0) {
      //   that.getBuyList();
      // }
      that.setData({
        all_color: '#9B9B9B',
        supply_color: '#9B9B9B',
        buy_color: '#01C46C',
        equipment_color: '#9B9B9B',
        message: that.data.buyList
      })
    } else if (that.data.nn == 4) {
      // if (that.data.fjmyList.length==0) {
      //   that.getFJMYList();
      // }
      that.setData({
        all_color: '#9B9B9B',
        supply_color: '#9B9B9B',
        buy_color: '#9B9B9B',
        equipment_color: '#01C46C',
        message: that.data.fjmyList
      })
    }
  },

  //查看详情
  see_details_click: function (e) {
    wx.navigateTo({
      url: '../particulars/particulars?id=' + e.currentTarget.dataset.id + '&mid=' + e.currentTarget.dataset.mid,
    })
  },

  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    var page=1;
    that.reload()
    console.log('下拉刷新');
    app.showLodView();
    this.requestNetAllData(page,1);
    wx.stopPullDownRefresh();
  },

  //触底加载
  onReachBottom: function (e) {
    console.log("触底加载", that.data.nn)
    switch (that.data.nn) {
      case '1':
        that.getAllList();
        break;
      case '2':
        that.getSellList();
        break;
      case '3':
        that.getBuyList();
        break
      case '4':
        that.getFJMYList();
        break
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '我分享纱线网小程序',
      path: 'pages/index/index',
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
  reload: function () {

    //初始数据
    that.setData({
      slideshow: [],
      classify: [{
        id: 1,
        cimg: '../../images/index/icon_xinxigy.png',
        ciName: '供应信息'
      }, {
        id: 2,
        cimg: '../../images/index/icon_shop.png',
        ciName: '采购大厅'
      }, {
        id: 3,
        cimg: '../../images/index/icon_ershou.png',
        ciName: '纺机贸易'
      }, {
        id: 4,
        cimg: '../../images/index/icon_qiandao.png',
        ciName: '签到'
      }],
      noticesr: [{
        title: '祝贝娜：纤维用量增长，纤维用量增长，纤维用量增长'
      }, {
        title: '祝贝娜：纤维用量增长，纤维用量增长，纤维用量增长'
      }, {
        title: '祝贝娜：纤维用量增长，纤维用量增长，纤维用量增长'
      }],


      //店铺轮播图

      recommend_store: [],

      recommend_store_two: [],

      //点击改变颜色
      all_color: '',
      supply_color: '',
      buy_color: '',
      equipment_color: '',

      message: [], //产品list
      all_next_page: 1,
      sellList: [],
      sell_next_page: 1,
      buyList: [],
      buy_next_page: 1,
      fjmyList: [],
      fjmy_next_page: 1,
      messageALL: [],
      nn: '1'
    });

    //获取
    that.getAllList();
    setTimeout(function () {
      that.getSellList();
    }, 300)
    setTimeout(function () {
      that.getBuyList();
    }, 500)
    setTimeout(function () {
      that.getFJMYList();
    }, 700)


    app = getApp();


    // that.Loading();
    //首页推荐
    util.homepage_recommend({}, function (ret) {
      console.log(222222, ret);
      var recommend_store = that.data.recommend_store;
      for (var i in ret) {
        console.log(1314, ret)
        recommend_store.push({
          id: ret[i].info.itemid, //信息id
          store_name: ret[i].info.company,
          mid: ret[i].item_mid,
          lableList: ret[i].info.tags,
          store_info: ret[i].info.introduce.length > 40 ? ret[i].info.introduce.substring(0, 40) + "……" : ret[i].info.introduce,
        })
      }
      that.setData({
        recommend_store: recommend_store,
      })
      setTimeout(function () {
        that.nextScroll()
      }, 5000)
    })

    //首页轮播图
    util.getBanner({}, function (ret) {
      // console.log(ret);
      var slideshow = that.data.slideshow;
      for (var i in ret) {
        slideshow.push({
          itemid: ret[i].item_id,
          slideshowImg: ret[i].img,
          mid: ret[i].item_mid,
          linktype: ret[i].linktype,
          userid: ret[i].userid,
        })
      }
      that.setData({
        slideshow: slideshow
      })
    }, null)

  },
  //点击头像查看名片
  messageList_click: function (e) {
    wx.navigateTo({
      url: '../store_particulars/store_particulars?id=' + e.currentTarget.dataset.id,
    })
  },

  scroll: function (e) { //有用
    console.log(e)

    if (that.data.timer) {
      clearTimeout(that.data.timer);
      // console.log("销毁计时器")
    }


    var timer = setTimeout(function () {
      // console.log("自动滚动")
      that.nextScroll()
    }, 5000)
    var scroll_index = that.data.scroll_index
    if (scroll_index != that.data.recommend_store.length - 1)
      scroll_index = parseInt(e.detail.scrollLeft / that.data.scroll_width);
    // console.log("index:", scroll_index);
    that.setData({
      scrollLeft_real: e.detail.scrollLeft,
      scroll_index: scroll_index,
      timer: timer,
      scroll_all_width: e.detail.scrollWidth,
      scroll_width: e.detail.scrollWidth / that.data.recommend_store.length,
    })
  },

  nextScroll: function () { //有用
    
    var index = (that.data.scroll_index ? that.data.scroll_index : 0) + 1;
    var scrollLeft = index * that.data.scroll_width
    if (index >= that.data.recommend_store.length)
      scrollLeft = 0
    // console.log("下一条", index, that.data.recommend_store.length, scrollLeft)
    this.setData({
      scrollLeft: scrollLeft,
      scroll_index: index
    })

  },
  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {
    if (that.data.recommend_store.length > 0)
    setTimeout(function () {
      that.nextScroll()
    }, 5000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (that.data.timer) {
      clearTimeout(that.data.timer);
      console.log("销毁计时器")
    }
  },
})