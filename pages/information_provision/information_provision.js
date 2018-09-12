// pages/information_provision/information_provision.js
const app = getApp()
const util = require('../../utils/util.js');
var that;
Page({
  /** 
   * 页面的初始数据
   */
  data: {
    //{ id: '0', head_portrait_icon: '../../images/index/head_portrait.png', icon_vip: '../../images/index/vip.png', name: '董晓珺', position: '销售总监', demand: '供应', company: '董南通金源纺织科技有限公司', lable_three: '混纺纱', lable_four: '纺织用纱', lable_five: '混纺纱', details: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支', message_Img: [{ message_Image: '../../images/index/Image_details1.png' }, { message_Image: '../../images/index/Image_details2.png' }, { message_Image: '../../images/index/Image_details3.png' }], time: '2018-6-28 14:25', address: '南通、柳橙、诸暨', page_view: '888', like: '888' }, { id: '1', head_portrait_icon: '../../images/index/head_portrait.png', icon_vip: '../../images/index/vip.png', name: '董晓珺', position: '销售总监', demand: '供应', company: '董南通金源纺织科技有限公司', lable_three: '混纺纱', lable_four: '纺织用纱', lable_five: '混纺纱', details: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支', message_Img: [{ message_Image: '../../images/index/Image_details1.png' }, { message_Image: '../../images/index/Image_details2.png' }, { message_Image: '../../images/index/Image_details3.png' }], time: '2018-6-28 14:25', address: '南通、柳橙、诸暨', page_view: '888', like: '888' }, { id: '2', head_portrait_icon: '../../images/index/head_portrait.png', icon_vip: '../../images/index/vip.png', name: '董晓珺', position: '销售总监', demand: '供应', company: '董南通金源纺织科技有限公司', lable_three: '混纺纱', lable_four: '纺织用纱', lable_five: '混纺纱', details: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支', message_Img: [{ message_Image: '../../images/index/Image_details1.png' }, { message_Image: '../../images/index/Image_details2.png' }, { message_Image: '../../images/index/Image_details3.png' }], time: '2018-6-28 14:25', address: '南通、柳橙、诸暨', page_view: '888', like: '888' },

    id: '1',
    message: [], //产品list
    sellList: [],
    sell_next_page: 1,
    buyList: [],
    buy_next_page: 1,
    fjmyList: [],
    fjmy_next_page: 1,
  },
  

  getSellList: function() {
  
    if (that.data.sell_next_page)
      util.getSellList({
        page: that.data.sell_next_page
      }, function(ret) {
        console.log("供应列表", ret);
        var sellList = that.data.sellList;
        for (var i in ret.data) {
          if (ret.data[i].user)
            sellList.push({
              id: ret.data[i].itemid, //信息id
              mid: 5,
              userid: ret.data[i].businesscard.userid,//userid
              head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
              icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
              name: ret.data[i].user.truename, //用户姓名
              position: ret.data[i].businesscard.career, //职位
              mobile: ret.data[i].businesscard.mobile, //电话
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
              favorite: ret.data[i].favorite, //收藏
              like: ret.data[i].agree //点赞
            })
        }
        console.log("供应", that.data.sellList)
        that.setData({
          sellList: sellList,
          sell_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
        })
        var id = that.data.id;
        var e = null;

        that.setTab()
      }, null)
  },

  getBuyList: function() {
    if (that.data.buy_next_page)
      util.getBuyList({
        page: that.data.buy_next_page
      }, function(ret) {
        console.log("求购列表", ret);
        var buyList = that.data.buyList;
        for (var i in ret.data) {
          if (ret.data[i].user)
            buyList.push({
              id: ret.data[i].itemid, //信息id
              mid: 6,
              userid: ret.data[i].businesscard.userid,//userid
              head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
              icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
              name: ret.data[i].businesscard.truename, //用户姓名
              position: ret.data[i].businesscard.career, //职位
              mobile: ret.data[i].businesscard.mobile, //电话
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
              favorite: ret.data[i].favorite, //收藏
              like: ret.data[i].agree //点赞
            })
        }
        console.log("求购", that.data.buyList)
        that.setData({
          buyList: buyList,
          buy_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
        })
        var id = that.data.id;
        var e = null;

        that.setTab()
      }, null)
  },

  getFJMYList: function() {
    if (that.data.fjmy_next_page)
      util.getFJMYList({
        page: that.data.fjmy_next_page
      }, function(ret) {
        console.log("纺机列表", ret);
        var fjmyList = that.data.fjmyList;
        for (var i in ret.data) {
          if (ret.data[i].user)
            fjmyList.push({
              id: ret.data[i].itemid, //信息id
              mid: 88,
              userid: ret.data[i].businesscard.userid,//userid
              head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
              icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
              name: ret.data[i].businesscard.truename, //用户姓名
              position: ret.data[i].businesscard.career, //职位
              mobile: ret.data[i].businesscard.mobile, //电话
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
              favorite: ret.data[i].favorite, //收藏
              like: ret.data[i].agree //点赞
            })
        }
        console.log("纺机", that.data.fjmyList)

        that.setData({
          fjmyList: fjmyList,
          fjmy_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
        })
        var id = that.data.id;
        var e = null;

        that.setTab()
      }, null)
  },

  //点赞
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
        icon: 'none',
        duration: 2000
      })
      for (var i in that.data.message) {
        if (that.data.message[i].id == res.itemid&& that.data.message[i].mid == e.currentTarget.dataset.mid) {
          that.data.message[i].I_agree = true;
          that.data.message[i].like++;
        }
      }
      that.setData({
        message: that.data.message
      })
    }, null)

  },

    //关注 取消
    enshrineClick: function (e) {
        const that = this;
        var index = e.currentTarget.dataset.index
        console.log("改变收藏信息",index,that.data.message[index])
        console.log(e.currentTarget.dataset.mid, e.currentTarget.dataset.id)

        if (that.data.message[index].id == e.currentTarget.dataset.id && that.data.message[index].mid == e.currentTarget.dataset.mid) {
            if (that.data.message[index].I_favortie == false) {
                var param = {
                    // userid: wx.getStorageSync('UserInfo').userid.userid,
                    // _token: wx.getStorageSync('UserInfo')._token,
                    mid: e.currentTarget.dataset.mid,
                    tid: e.currentTarget.dataset.id
                };
                util.enshrine(param, function (res) {
                    console.log('收藏', res, that.data.message[index]);
                    wx.showToast({
                        title: '关注成功',
                        icon: 'none',
                        duration: 2000
                    })
                    that.data.message[index].I_favortie = true;
                    that.data.message[index].favorite++;

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
                    cancle: '1'
                };
                util.enshrine(param, function (res) {
                    console.log('取消收藏', res, that.data.message[index], that.data.message);

                    that.data.message[index].I_favortie = false;
                    that.data.message[index].favorite--;

                    that.setData({
                        message: that.data.message
                    })
                    wx.showToast({
                        title: '取消成功',
                        icon: 'none',
                        duration: 2000
                    })

                }, null)
            }
            that.setData({
                message: that.data.message
            })

        }

    },

  //查看详情
  see_details_click: function(e) {
    wx.navigateTo({
      url: '../particulars/particulars?id=' + e.currentTarget.dataset.id + '&mid=' + e.currentTarget.dataset.mid,
    })
  },

  //搜索框跳转
  serchClick: function() {
    wx.navigateTo({
      url: '../search/search?index='+that.data.id,
    })
  },
  //信息栏选择
  selectClick: function(e) {
    console.log(that.data.id)
    console.log(e)
    that.setData({
      id: e.target.dataset.nn
    })
    that.setTab();
  },

  setTab: function() {
    var id = that.data.id
    if (id == 1) {
      console.log('直接加载供应', that.data.sellList);
      if (that.data.sellList.length == 0)
        that.getSellList();
      that.setData({
        all_color: '#01C46C',
        supply_color: '#9B9B9B',
        buy_color: '#9B9B9B',
        equipment_color: '#9B9B9B',
        message: that.data.sellList
      })
    } else if (id == 2) {
      console.log('直接加载求购', that.data.buyList);
      if(that.data.buyList.length==0)
      that.getBuyList();
      that.setData({
        all_color: '#9B9B9B',
        supply_color: '#01C46C',
        buy_color: '#9B9B9B',
        equipment_color: '#9B9B9B',
        message: that.data.buyList
      })
    } else if (id == 3) {
      console.log('直接加载纺机', that.data.fjmyList);
      if (that.data.fjmyList.length == 0)
        that.getFJMYList();
      that.setData({
        all_color: '#9B9B9B',
        supply_color: '#9B9B9B',
        buy_color: '#01C46C',
        equipment_color: '#9B9B9B',
        message: that.data.fjmyList
      })
    }
  },

  //联系商家
  phoneClick: function(e) {
    // var phoneNumber =e.currentTarget.dataset.mobile 
    // console.log(888, phoneNumber )
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.mobile //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.setData({
      id: options.id
    })
    console.log(110, that.data.id)

    // switch (that.data.id) {
    //   case '1':
    //     that.getSellList();
    //     break;
    //   case '2':
    //     that.getBuyList();
    //     break;
    //   case '3':
    //     that.getFJMYList();
    //     break;
    // }
    that.setTab();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
/**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e){
    console.log("触底加载", that.data.id)
    switch (that.data.id) {
      case '1':
        that.getSellList();
        break;
      case '2':
        that.getBuyList();
        break
      case '3':
        that.getFJMYList();
        break
    }
  },

  //点击头像查看名片
  messageList_click: function (e) {
    wx.navigateTo({
      url: '../store_particulars/store_particulars?id=' + e.currentTarget.dataset.id,
    })
  },
})