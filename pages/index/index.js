//index.js
//获取应用实例
var app = getApp();
const util = require('../../utils/util.js');

Page({
  data: {
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

    recommend_store_one: [],

    recommend_store_two: [],

    //点击改变颜色
    all_color: '',
    supply_color: '',
    buy_color: '',
    equipment_color: '',

    message: [], //产品list
    sellList: [],
    sell_next_page: 1,
    buyList: [],
    buy_next_page: 1,
    fjmyList: [],
    fjmy_next_page: 1,
    messageALL: [],
  },

  //搜索框跳转
  serchClick: function () {
    wx.navigateTo({
      url: '../search/search',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  setLikeClick: function (e) {
    const that = this;
    console.log(e.currentTarget.dataset.mid, e.currentTarget.dataset.id)
    var param = {
      // userid: wx.getStorageSync('UserInfo').userid.userid,
      // _token: wx.getStorageSync('UserInfo')._token,
      item_mid: e.currentTarget.dataset.mid,
      item_id: e.currentTarget.dataset.id
    };
    util.setLike(param, function (res) {
      console.log('点击点赞', res);
      for (let i in that.data.message){
        if (that.data.message[i].id == res.itemid){
          that.data.message[i].I_agree=true;
          that.data.message[i].like++;
        }
      }
      that.setData({
        message:that.data.message
      })
    }, null)

  },

  Loading: function () {
    const that = this;
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
    const that = this;
    var scene = decodeURIComponent(options.scene)
    if (options.userid) {
      that.setData({
        userid: options.userid
      })
      that.Loading();
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    app = getApp();
    const that = this;
    // that.Loading();
    //首页推荐
    util.homepage_recommend({}, function (ret) {
      console.log(222222, ret);
      var recommend_store_one = that.data.recommend_store_one;
      var recommend_store_two = that.data.recommend_store_two;
      for (var i in ret) {
        if (ret[i].listorder % 2 == 0) {
          console.log(1314, ret)
          recommend_store_one.push({
            id: ret[i].info.itemid, //信息id
            store_name: ret[i].info.company,
            mid: ret[i].item_mid,
            lableList: ret[i].info.tags,
            store_info: ret[i].info.introduce,
          })
        } else {
          recommend_store_two.push({
            id: ret[i].info.itemid, //信息id
            store_name: ret[i].info.company,
            mid: ret[i].item_mid,
            lableList: ret[i].info.tags,
            store_info: ret[i].info.introduce,
          })
        }
      }
      that.setData({
        recommend_store_one: recommend_store_one,
        recommend_store_two: recommend_store_two,
      })
    })

    //首页轮播图
    util.getBanner({}, function (ret) {
      console.log(ret);
      var slideshow = that.data.slideshow;
      for (var i in ret) {
        slideshow.push({
          slideshowImg: ret[i].img

        })
      }
      that.setData({
        slideshow: slideshow
      })
    }, null)
    that.getSellList();
    that.getBuyList();
    that.getFJMYList();
  },

  getSellList: function () {
    const that = this;
    if (that.data.sell_next_page)
      util.getSellList({
        page: that.data.sell_next_page
      }, function (ret) {
        console.log("供应列表", ret);
        var sellList = that.data.sellList;
        for (var i in ret.data) {
          if (ret.data[i].user)
            sellList.push({
              id: ret.data[i].itemid, //信息id
              mid: 5,
              head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
              icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
              name: ret.data[i].user.truename, //用户姓名
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
              like: ret.data[i].agree //点赞
            })
        }
        console.log("供应", that.data.sellList)
        that.setData({
          sellList: sellList,
          sell_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
        })
        var messageALL = that.data.sellList.concat(that.data.buyList.concat(that.data.fjmyList));
        messageALL = that.sort(messageALL);
        that.setData({
          message: messageALL,
        })
      }, null)
  },

  getBuyList: function () {
    const that = this;
    if (that.data.buy_next_page)
      util.getBuyList({
        page: that.data.buy_next_page
      }, function (ret) {
        console.log("求购列表", ret);
        var buyList = that.data.buyList;
        for (var i in ret.data) {
          if (ret.data[i].user)
            buyList.push({
              id: ret.data[i].itemid, //信息id
              mid: 6,
              head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
              icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
              name: ret.data[i].businesscard.truename, //用户姓名
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
              like: ret.data[i].agree //点赞
            })
        }
        console.log("求购", that.data.buyList)
        that.setData({
          buyList: buyList,
          buy_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
        })
        var messageALL = that.data.sellList.concat(that.data.buyList.concat(that.data.fjmyList));
        messageALL = that.sort(messageALL);

        that.setData({
          message: messageALL,
        })
      }, null)
  },

  getFJMYList: function () {
    const that = this;
    if (that.data.fjmy_next_page)
      util.getFJMYList({
        page: that.data.fjmy_next_page
      }, function (ret) {
        console.log("纺机列表", ret);
        var fjmyList = that.data.fjmyList;
        for (var i in ret.data) {
          if (ret.data[i].user)
            fjmyList.push({
              id: ret.data[i].itemid, //信息id
              mid: 88,
              head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
              icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
              name: ret.data[i].businesscard.truename, //用户姓名
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
              like: ret.data[i].agree //点赞
            })
        }
        console.log("纺机", that.data.fjmyList)

        that.setData({
          fjmyList: fjmyList,
          fjmy_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
        })

        var messageALL = that.data.sellList.concat(that.data.buyList.concat(that.data.fjmyList));
        messageALL = that.sort(messageALL);

        that.setData({
          message: messageALL,
        })
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
    var that = this;
    console.log(e.currentTarget.dataset.id);
    for (var i in that.data.classify) {
      if (e.currentTarget.dataset.id == that.data.classify[i].id) {
        console.log(that.data.classify[i]);
      }
    }
  },

  // 供应信息 采购大厅 二手设备 签到
  classifyClick: function (e) {
    const that = this;
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
    const that = this;
    // var phoneNumber =e.currentTarget.dataset.mobile 
    // console.log(888, phoneNumber )
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.mobile  //仅为示例，并非真实的电话号码
    })
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

  //信息栏选择
  selectClick: function (e) {
    var that = this;

    // console.log(e)
    if (e.target.dataset.nn == 1) {
      var messageALL = that.data.sellList.concat(that.data.buyList.concat(that.data.fjmyList));
      console.log('排序前', messageALL)
      messageALL = that.sort(messageALL);
      console.log('排序后', messageALL)
      that.setData({
        all_color: '#01C46C',
        supply_color: '#9B9B9B',
        buy_color: '#9B9B9B',
        equipment_color: '#9B9B9B',
        message: messageALL,
      })
    } else if (e.target.dataset.nn == 2) {
      that.setData({
        all_color: '#9B9B9B',
        supply_color: '#01C46C',
        buy_color: '#9B9B9B',
        equipment_color: '#9B9B9B',
        message: that.data.sellList
      })
    } else if (e.target.dataset.nn == 3) {

      that.setData({
        all_color: '#9B9B9B',
        supply_color: '#9B9B9B',
        buy_color: '#01C46C',
        equipment_color: '#9B9B9B',
        message: that.data.buyList
      })
    } else if (e.target.dataset.nn == 4) {

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
  }
})