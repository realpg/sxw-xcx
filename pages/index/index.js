//index.js
//获取应用实例
var app;

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

    recommend_store_one: [{
      id: 0,
      store_name: '南通银源纺织科技',
      store_type: '供应',
      lable_one: '差别化',
      lable_two: '纺织用纱',
      store_info: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支'
    }, {
      id: 2,
      store_name: '南通银源纺织科技11',
      store_type: '供应',
      lable_one: '差别化',
      lable_two: '纺织用纱',
      store_info: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支'
    }],


    recommend_store_two: [{
      id: 0,
      store_name: '南通银源纺织科技1',
      store_type: '纺机',
      lable_one: '差别化',
      lable_two: '纺织用纱',
      store_info: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支'
    }, {
      id: 2,
      store_name: '南通银源纺织科技',
      store_type: '供应',
      lable_one: '差别化',
      lable_two: '纺织用纱',
      store_info: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支'
    }],

    //点击改变颜色
    all_color: '',
    supply_color: '',
    buy_color: '',
    equipment_color: '',

    message: //产品list
      [],
    sellList: [],
    sell_next_page: 1,
    buyList: [],
    buy_next_page: 1,
    fjmyList: [],
    fjmy_next_page: 1,


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

  Loading: function () {
    const that = this;

    var param = {};
    util.getBuyList(param, function (res) {
      console.log(res);
      that.setData({
        AllmessageList: res,
        message: res.data
      })
    }, null)


    // wx.request({
    //   url: app.https.url + 'api/sell/getList',
    //   data: {
    //     userid: wx.getStorageSync('UsetInfo').userid,
    //     _token: wx.getStorageSync('UsetInfo')._token
    //   },
    //   header: { 'content-type': 'application/x-www-form-urlencoded' },
    //   method: 'GET',
    // success: function (res) {
    //   console.log(res.data.ret);
    //   that.setData({
    //     AllmessageList: res.data.ret,
    //     message: res.data.ret.data
    //   })
    // },
    //   fail: function (res) { },
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const that = this;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    app = getApp();
    const that = this;
    // that.Loading();

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
              head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
              icon_vip: 0, //  0===非vip 1==vip  暂未实现
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
              like: ret.data[i].agree //点赞
            })
        }
        console.log("供应", that.data.sellList)
        that.setData({
          sellList: sellList,
          sell_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
        })
        that.setData({
          message: that.data.sellList.concat(that.data.buyList.concat(that.data.fjmyList)),
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
              head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
              icon_vip: 0, //  0===非vip 1==vip  暂未实现
              name: ret.data[i].businesscard.truename, //用户姓名
              position: ret.data[i].businesscard.career, //职位
              demand: '求购', //发布类别  ()
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
              like: ret.data[i].agree //点赞
            })
        }
        console.log("求购", that.data.buyList)
        that.setData({
          buyList: buyList,
          buy_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
        })
        that.setData({
          message: that.data.sellList.concat(that.data.buyList.concat(that.data.fjmyList)),
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
              head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
              icon_vip: 0, //  0===非vip 1==vip  暂未实现
              name: ret.data[i].businesscard.truename, //用户姓名
              position: ret.data[i].businesscard.career, //职位
              demand: '纺机', //发布类别  ()
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
              like: ret.data[i].agree //点赞
            })
        }
        console.log("纺机", that.data.fjmyList)
        that.setData({
          fjmyList: fjmyList,
          fjmy_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
        })
        that.setData({
          message: that.data.sellList.concat(that.data.fjmyList.concat(that.data.fjmyList)),
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
    if (e.currentTarget.dataset.id < 4) {
      wx.navigateTo({
        url: '../information_provision/information_provision?id=' + e.currentTarget.dataset.id,
      })
    }
  },

  //查看名片
  store_particulars_click: function () {
    wx.navigateTo({
      url: '../store_particulars/store_particulars',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //联系客服
  callClick: function () {
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
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
        message: that.data.sellList.concat(that.data.buyList.concat(that.data.fjmyList)),
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
  see_details_click: function () {
    wx.navigateTo({
      url: '../particulars/particulars',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})