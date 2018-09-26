// pages/select_issue/select_issue.js
const app = getApp()
const util = require('../../utils/util.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ad_id: '',
    // selectImg: '../../images/personal_center/btn_yuangou_pre.png',
    select: {
      id: '',
      mid: ''
    },
    business_card: [],
    messageALL: [],
    sellList: [],
    buyList: [],
    fjmyList: [],
    select_Info: [{
      id: 0,
      type: '供应',
      selectImg: '../../images/personal_center/btn_yuangou_pre.png',
      content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S',
      time: '2018-07-12 14:45',
    }, {
      id: 1,
      type: '求购',
      selectImg: '../../images/personal_center/btn_yuangou_pre.png',
      content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S',
      time: '2018-07-12 14:45',
    }, {
      id: 2,
      type: '供应',
      selectImg: '../../images/personal_center/btn_yuangou_pre.png',
      content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S',
      time: '2018-07-12 14:45',
    }, {
      id: 3,
      type: '纺机',
      selectImg: '../../images/personal_center/btn_yuangou_pre.png',
      content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S',
      time: '2018-07-12 14:45',
    }, {
      id: 4,
      type: '纺机',
      selectImg: '../../images/personal_center/btn_yuangou_pre.png',
      content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S',
      time: '2018-07-12 14:45',
    }, {
      id: 5,
      type: '供应',
      selectImg: '../../images/personal_center/btn_yuangou_pre.png',
      content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S',
      time: '2018-07-12 14:45',
    }, ]
  },

  //确认发布
  payClick: function() {
    that = this
    wx.showModal({
      title: '提示',
      content: '是否确认发布？',
      cancelColor: 'red',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.confirm();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  confirm: function() {
    var param = {
      ad_id: that.data.ad_id,
      itemid: that.data.select.id,
      mid: that.data.select.mid,
    }
    util.selectIssue(
      param,
      function(ret) {
        console.log(ret)
        wx.showToast({
          title: '已通知后台处理',
          duration: 2000
        })
        setTimeout(function() {
          wx.navigateBack()
        }, 2000)
      }, null);

  },

  //选择具体哪条信息
  selectClick: function(e) {
    that = this
    var select = that.data.select
    if (e) {
      that.data.select.id = e.currentTarget.dataset.id,
        that.data.select.mid = e.currentTarget.dataset.mid
    }
    that.setData({
      select: select,
    })
    console.log(55555, select)
  },

  //根据that.data.nn改变展示内容
  calssifyClick: function(e) {
    console.log(22222222222, e.currentTarget.dataset.nn)
    if (e.currentTarget.dataset.nn == 1) {
      that.setData({
        supply_color: '#01C46C',
        buy_color: '#9B9B9B',
        equipment_color: '#9B9B9B',
        messageALL: that.data.sellList
      })
    } else if (e.currentTarget.dataset.nn == 2) {
      that.setData({
        supply_color: '#9B9B9B',
        buy_color: '#01C46C',
        equipment_color: '#9B9B9B',
        messageALL: that.data.buyList
      })
    } else if (e.currentTarget.dataset.nn == 3) {
      that.setData({
        supply_color: '#9B9B9B',
        buy_color: '#9B9B9B',
        equipment_color: '#01C46C',
        messageALL: that.data.fjmyList
      })
    }
  },

  getBuyList: function() {
    util.buyList_mine({}, function(ret) {
      console.log(11111111111111, ret);
      var buyList = that.data.buyList;
      for (var i in ret.data) {
        if (ret.data[i].user)
          buyList.push({
            id: ret.data[i].itemid, //信息id
            mid: 6,
            head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
            icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
            name: ret.data[i].user.truename, //用户姓名
            position: ret.data[i].businesscard.career, //职位
            demand: '求购', //发布类别  ()
            company: ret.data[i].businesscard.company, //公司
            lableList: ret.data[i].tags, //标签
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
        buyList: buyList,
        buy_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
      })
      that.setData({
        information: that.data.sellList.concat(that.data.buyList.concat(that.data.fjmyList)),
      })
    }, null)
  },
  getFJMYList: function() {
    util.fjmyList_mine({}, function(ret) {
      console.log(11111111111111, ret);
      var fjmyList = that.data.fjmyList;
      for (var i in ret.data) {
        if (ret.data[i].user)
          fjmyList.push({
            id: ret.data[i].itemid, //信息id
            mid: 88,
            head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
            icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
            name: ret.data[i].user.truename, //用户姓名
            position: ret.data[i].businesscard.career, //职位
            demand: '纺机', //发布类别  ()
            company: ret.data[i].businesscard.company, //公司
            lableList: ret.data[i].tags, //标签
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
        fjmyList: fjmyList,
        buy_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
      })
      that.setData({
        information: that.data.sellList.concat(that.data.buyList.concat(that.data.fjmyList)),
      })
    }, null)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    console.log(options);
    var ad_id = options.ad_id
    if (typeof(ad_id) == 'undefined') {
      wx.showToast({
        title: '参数错误',
        duration: 2000
      })
      setTimeout(function() {
        wx.navigateBack({})
      }, 2000)
    } else {
      that.setData({
        ad_id: ad_id,

      })
      console.log("adid:", that.data.ad_id, options.types)
    }
    var types = options.types;
    console.log(types.indexOf('0'), types.indexOf('1'), types.indexOf('2'))
    console.log(types.indexOf('0') >= 0, types.indexOf('1') >= 0, types.indexOf('2') >= 0)
    if (types.indexOf('0') >= 0) {
      console.log("找到0")
      that.setData({
        show_card: true,
        show_info: true
      })
    };
    if (types.indexOf('1') >= 0) {
      console.log("找到1")
      that.setData({
        show_card: true
      })
    };
    if (types.indexOf('2') >= 0) {
      console.log("找到2")
      that.setData({
        show_info: true
      })
    };

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    that = this;
    that.setData({
      business_card: app.globalData.DTuserInfo
    })
    if(that.data.show_info){
      util.sellList_mine({}, function(ret) {
        console.log(11111111111111, ret);
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
              demand: '供应', //发布类别  ()
              company: ret.data[i].businesscard.company, //公司
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
              time: ret.data[i].adddate, //发布时间
              address: ret.data[i].address, //货物存放地
              page_view: ret.data[i].hits, //浏览量
              like: ret.data[i].agree, //点赞
              favorite: ret.data[i].favorite
            })
        }
        that.setData({
          sellList: sellList,
          messageALL: sellList,
          sell_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
        })
        that.setData({
          information: that.data.sellList.concat(that.data.buyList.concat(that.data.fjmyList)),
        })
      }, null)
      that.getBuyList();
      that.getFJMYList();
    };

  },
  // /**
  //  * 生命周期函数--监听页面加载
  //  */
  // onLoad: function (options) {
  //   console.log(options);
  //   var ad_id=options.ad_id
  //   if(typeof(ad_id)=='undefined'){
  //     wx.showToast({
  //       title: '参数错误',
  //       duration:2000
  //     })
  //     setTimeout(function(){
  //       wx.navigateBack({
  //       })
  //     },2000)
  //   }
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady: function () {
  //   that = this;
  //   that.setData({
  //     business_card: app.globalData.DTuserInfo
  //   })
  //   that.getAllList();
  // },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  }


})