// pages/particulars/particulars.js
const app = getApp();
const util = require('../../utils/util.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Img_code: '',
    head_Img: '',
    message_number: 2,
    id: null,
    mid: null,
    message: [],
    UserInfo: [],
    message_details: [],

    //留言
    leave_word_details: [{
        id: '0',
        iconImg: '../../images/store/pic_tou_second.png',
        name: '董晓珺',
        time: '1天前',
        leave_word_name: '',
        content: '您好！请问这个价格如何?'
      },
      {
        id: '2',
        iconImg: '../../images/store/pic_tou_second.png',
        name: '程晓燕',
        time: '1天前',
        leave_word_name: '董晓珺',
        content: '您需要购买多少呢?'
      },
    ],

    //名片
    business_card: [],
    sendTranspondChoose: false,
    MyTranspondValue: '',
    writeBackChoose: false,
    writeBackValue: '',
    writeBackId: null,

    supplyPage: 1,
    buyPage: 1,
    fjmyPage: 1,
  },

  //预览图片
  previewImClick_css: function(e) {
    console.log(123456, e.currentTarget.dataset.id)
    var that = this;
    var id = e.currentTarget.dataset.id
    var aasss = that.data.message_details[0].message_Img;
    console.log(66666, that.data.message_details[0].message_Img)
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
  //名片详情
  view_card_click: function(e) {
    wx.navigateTo({
      url: '../store_particulars/store_particulars?id=' + e.currentTarget.dataset.id,
    })
  },
  //查看详情
  see_details_click: function(e) {

    console.log(e.currentTarget.dataset.id)

    wx.redirectTo({
      url: '../particulars/particulars?id=' + e.currentTarget.dataset.id + '&mid=' + e.currentTarget.dataset.mid,
    })
  },
  //返回首页
  back_homepage_click: function() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  //排行榜
  ranking_list_click: function() {
    wx.navigateTo({
      url: '../ranking_list/ranking_list',
    })
  },
  //拨打电话
  phoneClick: function() {
    that.making_call_click();
  },
  making_call_click: function() {
   util.makePhoneCall({
     phoneNumber: that.data.business_card.mobile 
   }, that.data.business_card.buys > 0)
  },

  //评论触发
  leaveWordClick: function(e) {
    const that = this;
    that.setData({
      sendTranspondChoose: !that.data.sendTranspondChoose
    })
  },

  writeBackClick: function(e) {
    const that = this;
    if (e.currentTarget.dataset.itemid != that.data.writeBackId && that.data.writeBackId != null && that.data.writeBackChoose == true) {
      that.setData({
        writeBackValue: '',
        writeBackChoose: !that.data.writeBackChoose,
      })
    }
    console.log(e.currentTarget.dataset.itemid)
    that.setData({
      writeBackChoose: !that.data.writeBackChoose,
      writeBackId: e.currentTarget.dataset.itemid
    })
    console.log(that.data.writeBackId)
  },

  // 获取评论信息
  exacommentClick: function(e) {
    const that = this;
    that.setData({
      MyTranspondValue: e.detail.value
    })
  },

  // 获取评论信息
  exawriteBackClick: function(e) {
    const that = this;
    that.setData({
      writeBackValue: e.detail.value
    })
  },

  //发送留言
  sendClick: function() {
    var param = {
      userid: wx.getStorageSync('DTUserinfo').userid,
      _token: wx.getStorageSync('DTUserinfo')._token,
      item_mid: that.data.mid,
      item_id: that.data.id,
      content: that.data.MyTranspondValue
    };
    util.leaveWord(param, function(ret) {
      console.log('发送留言', ret)
      that.data.leave_word_details.unshift({
        iconImg: ret.businesscard.avatarUrl,
        truename: ret.businesscard.truename ? ret.businesscard.truename : that.data.UserInfo.nickName,
        addtime: util.formatTime(new Date(ret.addtime * 1000)),
        content: ret.content,
        itemid: ret.itemid,
        reply: '',
      })


      that.setData({
        leave_word_details: that.data.leave_word_details,
        sendTranspondChoose: !that.data.sendTranspondChoose,
        MyTranspondValue: ''
      })

    });
  },

  sendwriteBackClick: function(e) {
    var param = {
      itemid: e.currentTarget.dataset.itemid,
      reply: that.data.writeBackValue
    };
    util.sendwriteBack(param, function(ret) {
      console.log('发送回复', ret)
      for (var i in that.data.leave_word_details) {
        if (e.currentTarget.dataset.itemid == that.data.leave_word_details[i].itemid) {
          that.data.leave_word_details[i].reply = that.data.writeBackValue;
          that.data.leave_word_details[i].replyer = that.data.UserInfo.truename;
        }
      }
      that.setData({
        leave_word_details: that.data.leave_word_details,
        writeBackChoose: !that.data.writeBackChoose,
        writeBackValue: ''
      })

    });
  },



  //查看更多留言
  view_more_click: function() {
    const that = this
    var message_number = that.data.message_number + 10
    that.setData({
      message_number: message_number
    })
  },

  //关闭更多留言
  view_more_click_css: function() {
    const that = this
    var message_number = 2
    that.setData({
      message_number: message_number
    })
  },

  //展示信息点赞 取消
  setLikeClick_css: function(e) {
    const that = this;
    var index = e.currentTarget.dataset.index
    console.log("改变收藏信息", index, that.data.message_details[index])
    console.log(e.currentTarget.dataset.mid, e.currentTarget.dataset.id)

    if (that.data.message_details[index].id == e.currentTarget.dataset.id && that.data.message_details[index].mid == e.currentTarget.dataset.mid) {
      if (that.data.message_details[index].I_agree == false) {
        var param = {
          item_mid: e.currentTarget.dataset.mid,
          item_id: e.currentTarget.dataset.id
        };
        util.setLike(param, function(res) {
          console.log('点赞', res, that.data.message_details[index]);
          wx.showToast({
            title: '点赞成功',
            icon: 'none',
            duration: 1500
          })
          that.data.message_details[index].I_agree = true;
          that.data.message_details[index].like++;
          
          that.setData({
            message_details: that.data.message_details
          })
         util.syncAgree(e.currentTarget.dataset.mid, e.currentTarget.dataset.id,true)
        }, null)
      } else {
        var param = {
          item_mid: e.currentTarget.dataset.mid,
          item_id: e.currentTarget.dataset.id,
          cancle: '1'
        };
        util.setLike(param, function(res) {
          console.log('取消点赞', res, that.data.message_details[index], that.data.message_details);
          that.data.message_details[index].I_agree = false;
          that.data.message_details[index].like--;
          that.setData({
            message_details: that.data.message_details
          })
          util.syncAgree(e.currentTarget.dataset.mid, e.currentTarget.dataset.id, false)
          wx.showToast({
            title: '取消成功',
            icon: 'none',
            duration: 1500
          })
        }, null)
      }
      that.setData({
        message_details: that.data.message_details
      })
    }
  },

  //点赞 取消
  setLikeClick: function(e) {
    const that = this;
    var index = e.currentTarget.dataset.index
    console.log("改变点赞信息", index, that.data.message[index])
    console.log(e.currentTarget.dataset.mid, e.currentTarget.dataset.id)

    if (that.data.message[index].id == e.currentTarget.dataset.id && that.data.message[index].mid == e.currentTarget.dataset.mid) {
      if (that.data.message[index].I_agree == false) {
        var param = {
          item_mid: e.currentTarget.dataset.mid,
          item_id: e.currentTarget.dataset.id
        };
        util.setLike(param, function(res) {
          console.log('点赞', res, that.data.message[index]);
          wx.showToast({
            title: '点赞成功',
            icon: 'none',
            duration: 1500
          })
          that.data.message[index].I_agree = true;
          that.data.message[index].like++;

          that.setData({
            message: that.data.message
          })
        }, null)
      } else {
        var param = {
          item_mid: e.currentTarget.dataset.mid,
          item_id: e.currentTarget.dataset.id,
          cancle: '1'
        };
        util.setLike(param, function(res) {
          console.log('取消点赞', res, that.data.message[index], that.data.message);
          that.data.message[index].I_agree = false;
          that.data.message[index].like--;
          that.setData({
            message: that.data.message
          })
          wx.showToast({
            title: '取消成功',
            icon: 'none',
            duration: 1500
          })
        }, null)
      }
      that.setData({
        message: that.data.message
      })
    }
  },

  //收藏 取消
  enshrineClick_css: function(e) {
    const that = this;
    var index = e.currentTarget.dataset.index
    console.log("改变收藏信息", index, that.data.message_details[index])
    console.log(e.currentTarget.dataset.mid, e.currentTarget.dataset.id)

    if (that.data.message_details[index].id == e.currentTarget.dataset.id && that.data.message_details[index].mid == e.currentTarget.dataset.mid) {
      if (that.data.message_details[index].I_favortie == false) {
        var param = {
          // userid: wx.getStorageSync('DTUserinfo').userid.userid,
          // _token: wx.getStorageSync('DTUserinfo')._token,
          mid: e.currentTarget.dataset.mid,
          tid: e.currentTarget.dataset.id
        };
        util.enshrine(param, function(res) {
          console.log('收藏', res, that.data.message_details[index]);
          wx.showToast({
            title: '收藏成功',
            icon: 'none',
            duration: 1500
          })
          that.data.message_details[index].I_favortie = true;
          that.data.message_details[index].favorite++;

          that.setData({
            message_details: that.data.message_details
          })
          util.syncFavorite(e.currentTarget.dataset.mid, e.currentTarget.dataset.id, true)
        }, null)
      } else {
        var param = {
          // userid: wx.getStorageSync('DTUserinfo').userid.userid,
          // _token: wx.getStorageSync('DTUserinfo')._token,
          mid: e.currentTarget.dataset.mid,
          tid: e.currentTarget.dataset.id,
          cancle: '1'
        };
        util.enshrine(param, function(res) {
          console.log('取消收藏', res, that.data.message_details[index], that.data.message_details);

          that.data.message_details[index].I_favortie = false;
          that.data.message_details[index].favorite--;

          that.setData({
            message_details: that.data.message_details
          })
          util.syncFavorite(e.currentTarget.dataset.mid, e.currentTarget.dataset.id, false)
          wx.showToast({
            title: '取消成功',
            icon: 'none',
            duration: 1500
          })

        }, null)
      }
      that.setData({
        message_details: that.data.message_details
      })

    }

  },

  //收藏 取消
  enshrineClick: function(e) {
    const that = this;
    var index = e.currentTarget.dataset.index
    console.log("改变收藏信息", index, that.data.message[index])
    console.log(e.currentTarget.dataset.mid, e.currentTarget.dataset.id)

    if (that.data.message[index].id == e.currentTarget.dataset.id && that.data.message[index].mid == e.currentTarget.dataset.mid) {
      if (that.data.message[index].I_favortie == false) {
        var param = {
          // userid: wx.getStorageSync('DTUserinfo').userid.userid,
          // _token: wx.getStorageSync('DTUserinfo')._token,
          mid: e.currentTarget.dataset.mid,
          tid: e.currentTarget.dataset.id
        };
        util.enshrine(param, function(res) {
          console.log('收藏', res, that.data.message[index]);
          wx.showToast({
            title: '关注成功',
            icon: 'none',
            duration: 1500
          })
          that.data.message[index].I_favortie = true;
          that.data.message[index].favorite++;

          that.setData({
            message: that.data.message
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
        util.enshrine(param, function(res) {
          console.log('取消收藏', res, that.data.message[index], that.data.message);

          that.data.message[index].I_favortie = false;
          that.data.message[index].favorite--;

          that.setData({
            message: that.data.message
          })
          wx.showToast({
            title: '取消成功',
            icon: 'none',
            duration: 1500
          })

        }, null)
      }
      that.setData({
        message: that.data.message
      })
    }
  },

  //供应
  sellInfoDetails: function() {
    var param = {
      userid: wx.getStorageSync('DTUserinfo').userid,
      _token: wx.getStorageSync('DTUserinfo')._token,
      itemid: that.data.id
    };


    util.sellInfoDetails(param, function(ret) {
      console.log('sellInfoDetails', ret)

      var arr = [];
      for (var i in ret.comments) {

        arr.push({
          addtime: util.formatTime(new Date(ret.comments[i].addtime * 1000)),
          content: ret.comments[i].content,
          itemid: ret.comments[i].itemid,
          truename: ret.comments[i].businesscard.truename,
          iconImg: ret.comments[i].businesscard.avatarUrl,
          reply: ret.comments[i].reply,
          replyer: ret.comments[i].replyer,
        })
      }

      console.log(arr)

      that.data.message_details.push({
        id: ret.itemid, //信息id
        mid: 5,
        userid: ret.businesscard.userid, //userid
        head_portrait_icon: ret.user.avatarUrl ? ret.user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
        icon_vip: ret.businesscard.vip, //  0===非vip 1-3==vip  
        name: ret.businesscard.truename, //用户姓名
        position: ret.businesscard.career, //职位
        demand: '供应', //发布类别  ()
        mobile: ret.mobile,
        company: ret.businesscard.buys > 0 ? util.hiddenCompany(ret.businesscard.company) : ret.businesscard.company, //公司
        lableList: ret.tags,
        I_agree: ret.I_agree,
        I_favortie: ret.I_favortie,
        details: ret.introduce, //信息详情描述
        message_Img: ret.thumbs.split(','), //详情图片  后续跟进
        time: ret.adddate, //发布时间
        addtime: util.formatTime(new Date(ret.addtime * 1000)), //发布详细时间
        edittime: util.formatTime(new Date(ret.edittime * 1000)),
        address: ret.address, //货物存放地
        page_view: ret.hits, //浏览量
        like: ret.agree, //点赞
        favorite: ret.favorite, //收藏
      })
      that.setData({
        message_details: that.data.message_details,
        leave_word_details: arr,
        business_card: ret.businesscard
      })
      //根据权限隐藏电话号和公司名
      var card = getApp().globalData.DTuserInfo.businesscard;
      if (card.vip < 1 && that.data.business_card.buys>0) {
        console.log(99999999999)
        that.data.business_card.mobile = that.data.business_card.mobile.substring(0, 3) + '****' + that.data.business_card.mobile.substring(7, 11),
          that.data.business_card.company = that.data.business_card.company.substring(0, 2) + '****' + that.data.business_card.company.substring(that.data.business_card.company.length - 4, that.data.business_card.company.length)
        that.setData({
          business_card: that.data.business_card,
        })
      }
      that.supplyByUserid();
      that.PurchaseByUserid();
      that.tradeByUserid();
    });
  },

  //求购
  buyInfoDetails: function() {
    var param = {
      userid: wx.getStorageSync('DTUserinfo').userid,
      _token: wx.getStorageSync('DTUserinfo')._token,
      itemid: that.data.id
    };
    util.buyInfoDetails(param, function(ret) {
      console.log('buyInfoDetails', ret)
      var arr = [];
      for (var i in ret.comments) {
        arr.push({
          addtime: util.formatTime(new Date(ret.comments[i].addtime * 1000)),
          content: ret.comments[i].content,
          itemid: ret.comments[i].itemid,
          truename: ret.comments[i].businesscard.truename,
          iconImg: ret.comments[i].businesscard.avatarUrl,
          reply: ret.comments[i].reply,
          replyer: ret.comments[i].replyer,
        })
      }

      that.data.message_details.push({
        id: ret.itemid, //信息id
        mid: 6,
        userid: ret.businesscard.userid, //userid
        head_portrait_icon: ret.user.avatarUrl ? ret.user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
        icon_vip: ret.businesscard.vip, //  0===非vip 1-3==vip  
        name: ret.businesscard.truename, //用户姓名
        position: ret.businesscard.career, //职位
        demand: '求购', //发布类别  ()
        mobile: ret.mobile,
        company: util.hiddenCompany(ret.businesscard.company), //公司
        lableList: ret.tags,
        I_agree: ret.I_agree,
        I_favortie: ret.I_favortie,
        details: ret.introduce, //信息详情描述
        message_Img: ret.thumbs.split(','), //详情图片  后续跟进
        time: ret.adddate, //发布时间
        addtime: util.formatTime(new Date(ret.addtime * 1000)), //发布详细时间
        edittime: util.formatTime(new Date(ret.edittime * 1000)),
        address: ret.address, //货物存放地
        page_view: ret.hits, //浏览量
        favorite: ret.favorite, //收藏
        like: ret.agree //点赞

      })
      that.setData({
        message_details: that.data.message_details,
        leave_word_details: arr,
        business_card: ret.businesscard
      })
      //根据权限隐藏电话号和公司名
      var card = getApp().globalData.DTuserInfo.businesscard;
      if (card.vip < 1) {
        console.log(99999999999)
        that.data.business_card.mobile = that.data.business_card.mobile.substring(0, 3) + '****' + that.data.business_card.mobile.substring(7, 11),
          that.data.business_card.company = that.data.business_card.company.substring(0, 2) + '****' + that.data.business_card.company.substring(that.data.business_card.company.length - 4, that.data.business_card.company.length)
        that.setData({
          business_card: that.data.business_card,
        })
      }
      that.supplyByUserid();
      that.PurchaseByUserid();
      that.tradeByUserid();
    });
  },


  //纺机
  tradeInfoDetails: function() {
    var param = {
      userid: wx.getStorageSync('DTUserinfo').userid,
      _token: wx.getStorageSync('DTUserinfo')._token,
      itemid: that.data.id
    };
    util.tradeInfoDetails(param, function(ret) {
      console.log('tradeInfoDetails', ret)
      var arr = [];
      for (var i in ret.comments) {

        arr.push({
          addtime: util.formatTime(new Date(ret.comments[i].addtime * 1000)),
          content: ret.comments[i].content,
          itemid: ret.comments[i].itemid,
          truename: ret.comments[i].businesscard.truename,
          iconImg: ret.comments[i].businesscard.avatarUrl,
          reply: ret.comments[i].reply,
          replyer: ret.comments[i].replyer,
        })
      }
      console.log(arr)

      that.data.message_details.push({
        id: ret.itemid, //信息id
        mid: 88,
        userid: ret.businesscard.userid, //userid
        head_portrait_icon: ret.user.avatarUrl ? ret.user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
        icon_vip: ret.businesscard.vip, //  0===非vip 1-3==vip  
        name: ret.businesscard.truename, //用户姓名
        position: ret.businesscard.career, //职位
        demand: '纺机', //发布类别  ()
        mobile: ret.mobile,
        company: util.hiddenCompany(ret.businesscard.company), //公司
        lableList: ret.tags,
        I_agree: ret.I_agree,
        I_favortie: ret.I_favortie,
        details: ret.introduce, //信息详情描述
        message_Img: ret.thumbs.split(','), //详情图片  后续跟进
        time: ret.adddate, //发布时间
        addtime: util.formatTime(new Date(ret.addtime * 1000)), //发布详细时间
        edittime: util.formatTime(new Date(ret.edittime * 1000)),
        address: ret.address, //货物存放地
        page_view: ret.hits, //浏览量
        like: ret.agree, //点赞
        favorite: ret.favorite, //收藏
      })
      that.setData({
        message_details: that.data.message_details,
        leave_word_details: arr,
        business_card: ret.businesscard
      })
      that.supplyByUserid();
      that.PurchaseByUserid();
      that.tradeByUserid();
    });
  },

  //供应信息
  supplyByUserid: function() {
    if (!that.data.supplyPage)
      return;
    var conditions = JSON.stringify({
      key: ['userid', 'status'],
      value: [that.data.business_card.userid, '3']
    });

    var param = {
      page: that.data.supplyPage,
      userid: wx.getStorageSync('DTUserinfo').userid,
      _token: wx.getStorageSync('DTUserinfo')._token,
      conditions: conditions
    };
    util.supplyByUserid(param, function(ret) {
      console.log('供应信息', ret)
      // that.data.message.push(ret.data)
      for (var i in ret.data) {
        if (that.data.mid != 5 || that.data.id != ret.data[i].itemid)
          that.data.message.push({
            id: ret.data[i].itemid, //信息id
            mid: 5,
            userid: ret.data[i].businesscard.userid, //userid
            head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
            icon_vip: ret.data[i].businesscard.vip, //  0===非vip 1-3==vip  
            name: ret.data[i].businesscard.truename, //用户姓名
            position: ret.data[i].businesscard.career, //职位
            demand: '供应', //发布类别  ()
            mobile: ret.data[i].mobile,
            company: ret.data[i].businesscard.buys > 0 ? util.hiddenCompany(ret.data[i].businesscard.company) : ret.data[i].businesscard.company, //公司
            lableList: ret.data[i].tags,
            I_agree: ret.data[i].I_agree,
            I_favortie: ret.data[i].I_favortie,
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
            addtime: util.formatTime(new Date(ret.data[i].addtime * 1000)), //发布详细时间
            address: ret.data[i].address, //货物存放地
            page_view: ret.data[i].hits, //浏览量
            favorite: ret.data[i].favorite, //收藏
            like: ret.data[i].agree //点赞

          })
      }
      var message = that.sort(that.data.message)
      that.setData({
        supplyPage: ret.current_page < ret.last_page ? ret.current_page + 1 : null,
        message: message
      })
    });
  },

  //求购信息
  PurchaseByUserid: function() {
    if (!that.data.buyPage)
      return;
    var conditions = JSON.stringify({
      key: ['userid', 'status'],
      value: [that.data.business_card.userid, '3']
    });
    var param = {
      page: that.data.buyPage,
      userid: wx.getStorageSync('DTUserinfo').userid,
      _token: wx.getStorageSync('DTUserinfo')._token,
      conditions: conditions
    };
    util.PurchaseByUserid(param, function(ret) {
      console.log('求购信息', ret)
      // that.data.message.push(ret.data)
      for (var i in ret.data) {
        if (that.data.mid != 6 || that.data.id != ret.data[i].itemid)
          that.data.message.push({
            id: ret.data[i].itemid, //信息id
            mobile: ret.data[i].mobile,
            mid: 6,
            userid: ret.data[i].businesscard.userid, //userid
            head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
            icon_vip: ret.data[i].businesscard.vip, //  0===非vip 1-3==vip  
            name: ret.data[i].businesscard.truename, //用户姓名
            position: ret.data[i].businesscard.career, //职位
            demand: '求购', //发布类别  ()
            company: util.hiddenCompany(ret.data[i].businesscard.company), //公司
            lableList: ret.data[i].tags,
            I_agree: ret.data[i].I_agree,
            I_favortie: ret.data[i].I_favortie,
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
            addtime: util.formatTime(new Date(ret.data[i].addtime * 1000)), //发布详细时间
            address: ret.data[i].address, //货物存放地
            page_view: ret.data[i].hits, //浏览量
            favorite: ret.data[i].favorite, //收藏
            like: ret.data[i].agree //点赞
          })
      }
      var message = that.sort(that.data.message)
      that.setData({
        buyPage: ret.current_page < ret.last_page ? ret.current_page + 1 : null,
        message: message
      })
    });
  },

  //纺织贸易
  tradeByUserid: function() {
    if (!that.data.fjmyPage)
      return;
    var conditions = JSON.stringify({
      key: ['userid', 'status'],
      value: [that.data.business_card.userid, '3']
    });
    var param = {
      page: that.data.fjmyPage,
      userid: wx.getStorageSync('DTUserinfo').userid,
      _token: wx.getStorageSync('DTUserinfo')._token,
      conditions: conditions
    };
    util.tradeByUserid(param, function(ret) {
      console.log('纺织贸易', ret)
      for (var i in ret.data) {
        if (that.data.mid != 88 || that.data.id != ret.data[i].itemid)
          that.data.message.push({
            id: ret.data[i].itemid, //信息id
            mid: 88,
            userid: ret.data[i].businesscard.userid, //userid
            head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
            icon_vip: ret.data[i].businesscard.vip, //  0===非vip 1-3==vip  
            name: ret.data[i].businesscard.truename, //用户姓名
            position: ret.data[i].businesscard.career, //职位
            demand: '纺机', //发布类别  ()
            mobile: ret.data[i].mobile,
            company: util.hiddenCompany(ret.data[i].businesscard.company), //公司
            lableList: ret.data[i].tags,
            I_agree: ret.data[i].I_agree,
            I_favortie: ret.data[i].I_favortie,
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
            addtime: util.formatTime(new Date(ret.data[i].addtime * 1000)), //发布详细时间
            address: ret.data[i].address, //货物存放地
            page_view: ret.data[i].hits, //浏览量
            favorite: ret.data[i].favorite, //收藏
            like: ret.data[i].agree //点赞
          })
      }
      var message = that.sort(that.data.message)
      that.setData({
        fjmyPage: ret.current_page < ret.last_page ? ret.current_page + 1 : null,
        message: message
      })

    });
  },

  //排序
  sort: function(messageALL) {
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

    return arr;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    var scene = JSON.stringify(decodeURIComponent(options.scene));
    console.log("场景", scene)
    if (options.id && options.mid) {
      that.setData({
        id: options.id,
        mid: options.mid,
      })
    } else {
      console.log("正则匹配", scene.search(/mid=\d/),
        scene.search(/itemid=\d{1,}/),
        scene.search(/mid=\ditemid=\d{1,}/));
      if (scene.search(/mid=\ditemid=\d/) >= 0) {
        var strs = scene.split("itemid=")
        var data = {
          id: strs[1].replace('"', ""),
          mid: strs[0].replace('"mid=', '')
        }
        console.log("正则匹配成功", scene, data);
        
        that.setData(data)
      }
    }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

    that.setData({
      UserInfo: app.globalData.DTuserInfo
    })

    switch (that.data.mid) {
      case '5':
        that.sellInfoDetails();
        break;
      case '6':
        that.buyInfoDetails();
        break;
      case '88':
        that.tradeInfoDetails();
        break;
    }

  },

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
    wx.stopPullDownRefresh();
    console.log('下拉刷新');
    // this.requestNetAllData(page, 1);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('触底刷新')
    that.supplyByUserid();
    that.PurchaseByUserid();
    that.tradeByUserid();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '我分享了' + that.data.business_card.truename + '的' + that.data.message[0].demand + '信息',
      path: 'pages/particulars/particulars?id=' + that.data.id + '&mid=' + that.data.mid,
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
  //点击头像查看名片
  messageList_click: function(e) {
    wx.navigateTo({
      url: '../store_particulars/store_particulars?id=' + e.currentTarget.dataset.id,
    })
  },
  //图片预览
  previewImClick: function(e) {
    console.log(1111, e.currentTarget)
    var that = this;
    var idx = e.currentTarget.dataset.idx;
    var index = e.currentTarget.dataset.index;
    var urls = [];
    for (var i in that.data.message[idx].message_Img) {
      urls.push(that.data.message[idx].message_Img[i].message_Image)
    }
    console.log(that.data.message[idx].message_Img[index],
      that.data.message[idx].message_Img)
    wx.previewImage({
      current: that.data.message[idx].message_Img[index].message_Image,
      urls: urls // 需要预览的图片http链接列表
    })
  },



  //打开选择栏----分享
  selectClick: function() {
    this.setData({
      is_select_True: true
    })
  },
  //关闭选择栏----分享 
  hideSelect: function() {
    this.setData({
      is_select_True: false
    })
  },

  //打开弹出层----朋友圈图片
  shareClick: function() {
    this.setData({
      isRuleTrue: true
    })
    that.canvas();
    that.hideSelect();
  },
  //关闭弹出提示----朋友圈图片
  hideRule: function() {
    this.setData({
      isRuleTrue: false
    })
  },

  //获取小程序维码图片和设备宽高
  canvas: function() {
    that = this
    //获得设备宽高
    wx.getSystemInfo({
      success: function(res) {
        // console.log("设备", res.windowWidth,
        //   res.windowWidth,
        //   res.windowHeight,
        //   res.windowWidth)
        that.setData({
          windowW: res.windowWidth,
          canvasW: 750,
          windowH: res.windowHeight,
          canvasH: 400
        })
      },
    })
    //获得头像
    util.getHeadImg({
      _userid: that.data.business_card.userid
    }, function(res) {
      console.log('获得头像', res)
      that.setData({
        head_Img: res.tempFilePath
      })
      //获得图片
      util.getInfoQR({
        mid: that.data.mid,
        itemid: that.data.id
      }, function(res) {
        console.log('获得图片', res)
        that.setData({
          Img_code: res.tempFilePath
        })
        var canvas = wx.createCanvasContext('canvas');
        that.drawCanvas(canvas);
      }, function(err) {
        wx.showModal({
          title: '下载图片失败',
          content: JSON.stringify(err),
        })
      });
    }, function(err) {
      wx.showModal({
        title: '下载图片失败',
        content: JSON.stringify(err),
      })
    });


  },

  //画布
  drawCanvas: function() {
    console.log("draw canvas")
    that = this
    const canvas = wx.createCanvasContext('canvas')
    var windowW = that.data.canvasW;
    var windowH = that.data.canvasH;
    var qr = that.data.Img_code;
    var tx = that.data.head_Img;
    canvas.setFillStyle('#f1f4f6');
    canvas.fillRect(0, 0, windowW, windowH);
    canvas.setFillStyle('#ffffff');
    canvas.fillRect(20, 20, windowW - 40, windowH - 40);
    canvas.drawImage(qr, windowW * 0.7, windowH * 0.12, 170, 170);

    canvas.setFillStyle('#999999');
    canvas.setFontSize(24);
    canvas.fillText("长按识别二维码", windowW * 0.70, windowH * 0.70, 750);
    //  canvas.drawImage(tx, windowW * 0.07, windowH * 0.15, 100, 100);
    canvas.setFillStyle('#000000');
    canvas.setFontSize(30);
    canvas.fillText(that.data.message[0].name, windowW * 0.23, windowH * 0.24);
    canvas.setFillStyle('#999999');
    canvas.setFontSize(24);
    canvas.fillText(that.data.message[0].position, windowW * 0.23 + canvas.measureText(that.data.message[0].name).width + 40, windowH * 0.24);
    // 供应 求购 纺机 背景颜色
    console.log('距离', canvas.measureText(that.data.message[0].demand).width)

    if (that.data.message[0].demand == '供应') {
      canvas.setFillStyle('#FFD634');
      canvas.fillRect(windowW * 0.55, windowH * 0.172, 50, 32);
      canvas.setFillStyle('#ffffff');
      canvas.setFontSize(20);
      canvas.fillText(that.data.message[0].demand, windowW * 0.555, windowH * 0.232);
    }
    if (that.data.message[0].demand == '求购') {
      canvas.setFillStyle('#1BB9FB');
      canvas.fillRect(windowW * 0.55, windowH * 0.172, 50, 32);
      canvas.setFillStyle('#ffffff');
      canvas.setFontSize(20);
      canvas.fillText(that.data.message[0].demand, windowW * 0.555, windowH * 0.232);
    }
    if (that.data.message[0].demand == '纺机') {
      canvas.setFillStyle('#01C46C');
      canvas.fillRect(windowW * 0.55, windowH * 0.172, 50, 32);
      canvas.setFillStyle('#ffffff');
      canvas.setFontSize(20);
      canvas.fillText(that.data.message[0].demand, windowW * 0.555, windowH * 0.232);
    }
    canvas.setFillStyle('#3f3f3f');
    canvas.setFontSize(26);
    canvas.fillText(that.data.message[0].company, windowW * 0.23, windowH * 0.38);

    //标签
    if (that.data.message[0].lableList[0].tagname != '') {
      canvas.setFillStyle('#999999');
      canvas.setFontSize(28);
      canvas.fillText('#' + that.data.message[0].lableList[0].tagname + '#', windowW * 0.07, windowH * 0.55);
    }
    if (that.data.message[0].lableList.length >= 2) {
      canvas.setFillStyle('#999999');
      canvas.setFontSize(28);
      canvas.fillText('#' + that.data.message[0].lableList[1].tagname + '#', windowW * 0.15 + canvas.measureText(that.data.message[0].lableList[0].tagname).width, windowH * 0.55);
    }
    if (that.data.message[0].lableList.length >= 3) {
      canvas.setFillStyle('#999999');
      canvas.setFontSize(28);
      canvas.fillText('#' + that.data.message[0].lableList[2].tagname + '#', windowW * 0.23 + canvas.measureText(that.data.message[0].lableList[1].tagname).width + canvas.measureText(that.data.message[0].lableList[0].tagname).width, windowH * 0.55);
    }

    //描述
    var text = that.data.message[0].details; //这是要绘制的文本
    var chr = text.split(""); //这个方法是将一个字符串分割成字符串数组
    var temp = "";
    var row = [];
    canvas.setFontSize(26)
    canvas.setFillStyle("#000")
    for (var a = 0; a < chr.length; a++) {
      if (canvas.measureText(temp).width < 440) {
        temp += chr[a];
      } else {
        a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
        row.push(temp);
        temp = "";
      }
    }
    row.push(temp);

    //如果数组长度大于2 则截取前两个
    if (row.length > 2) {
      var rowCut = row.slice(0, 2);
      var rowPart = rowCut[1];
      var test = "";
      var empty = [];
      for (var a = 0; a < rowPart.length; a++) {
        if (canvas.measureText(test).width < 410) {
          test += rowPart[a];
        } else {
          break;
        }
      }
      empty.push(test);
      var group = empty[0] + "..." //这里只显示两行，超出的用...表示
      rowCut.splice(1, 1, group);
      row = rowCut;
    }
    for (var b = 0; b < row.length; b++) {
      canvas.fillText(row[b], windowW * 0.07, windowH * 0.70 + b * 40, 750);
    }

    // canvas.setFillStyle('#000000');
    // canvas.setFontSize(26);
    // canvas.fillText(that.data.message[0].details , windowW * 0.07, windowH * 0.70);

    //划圆
    canvas.save();
    canvas.beginPath();
    // 下面是先定位要开个圆形的位置，50 和 90 分别就是圆的圆心的 x 坐标和 y 坐标，25 是半径，后面的两个参数就是起始和结束，这样就能画好一个圆了
    canvas.arc(windowW * 0.14, windowH * 0.28, 50, 0, 2 * Math.PI);
    canvas.closePath();
    // // 下面就裁剪出一个圆形了，且坐标在 （50， 90）
    canvas.clip();
    // // 然后画图片，res.tempFilePath 其实是下载到本地的一个路径，使用小程序画出图片记得一定要用本地的路径，可以用 wx.downloadFile 来实现。
    // // 因为 drawImage 的第二个和第三个参数是图片的左上角在画布 canvas 的 x 坐标，y 坐标，所以图片的坐标比圆形的坐标分别都小圆的半径大小就刚刚好能被切成圆形，后面的两个参数就是图片的宽和高，请设定为圆形的直径长度。
    canvas.drawImage(tx, windowW * 0.14 - 50, windowH * 0.28 - 50, 100, 100);
    // canvas.restore();
    // canvas.draw(true, tx);

    canvas.stroke()
    canvas.draw(true, function() {
      wx.canvasToTempFilePath({
        canvasId: 'canvas',
        success: function(res) {
          console.log(res);
          that.setData({
            canvas_img: res.tempFilePath,
          })
        }
      })
    });
  },

  //保存生成的图片
  saveImage: function(e) {
    wx.saveImageToPhotosAlbum({
      filePath: that.data.canvas_img,
      success(result) {
        wx.showToast({
          title: '图片保存成功',
          icon: 'success',
          duration: 1500
        })
        setTimeout(function() {
          that.hideRule()
        }, 1500)
      }
    })
    //daozhe
  },
})