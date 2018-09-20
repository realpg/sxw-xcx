// pages/particulars/particulars.js
const app = getApp();
const util = require('../../utils/util.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message_number: 2,
    id: null,
    mid: null,
    messageList: [],
    UserInfo: [],
    message: [
      // { id: '0', head_portrait_icon: '../../images/index/head_portrait.png', icon_vip: '../../images/index/vip.png', name: '董晓珺', position: '销售总监', demand: '供应', company: '董南通金源纺织科技有限公司', lable_three: '混纺纱', lable_four: '纺织用纱', lable_five: '混纺纱', details: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支', message_Img: [{ message_Image: '../../images/index/Image_details1.png' }, { message_Image: '../../images/index/Image_details2.png' }, { message_Image: '../../images/index/Image_details3.png' }], release_time: '2018-6-28 14:25', turnover_time: '2018-7-18 14:25', address: '南通、柳橙、诸暨', page_view: '867', like: '128' ,star:'324',share:'126'}, 
    ],
    
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
  previewImClick: function(e) {
    console.log(123456, e.currentTarget.dataset.id)
    var that = this;
    var id = e.currentTarget.dataset.id
    var aasss = that.data.message[0].message_Img;
    console.log(66666, that.data.message[0].message_Img)
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
  ranking_list_click: function () {
    wx.navigateTo({
      url: '../ranking_list/ranking_list',
    })
  },
  //拨打电话
  phoneClick:function(){
    
    that.making_call_click();
  },
  making_call_click: function() {
    wx.makePhoneCall({
      phoneNumber: that.data.business_card.mobile //仅为示例，并非真实的电话号码
    })
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
        reply:'',

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

//点赞
  setLikeClick: function(e) {
    const that = this;
    console.log(e.currentTarget.dataset.mid, e.currentTarget.dataset.id)
    var param = {
      // userid: wx.getStorageSync('DTUserinfo').userid.userid,
      // _token: wx.getStorageSync('DTUserinfo')._token,
      item_mid: e.currentTarget.dataset.mid,
      item_id: e.currentTarget.dataset.id
    };
    util.setLike(param, function(res) {
      console.log('点击点赞', res);
      if (e.currentTarget.dataset.id == that.data.id && e.currentTarget.dataset.mid == that.data.mid) {
        for (var i in that.data.message) {
          if (that.data.message[i].id == res.itemid) {
            that.data.message[i].I_agree = true;
            that.data.message[i].like++;
          }
        }
        that.setData({
          message: that.data.message
        })
      } else {
        for (var i in that.data.messageList) {
          if (that.data.messageList[i].id == res.itemid) {
            that.data.messageList[i].I_agree = true;
            that.data.messageList[i].like++;
          }
        }
        that.setData({
          messageList: that.data.messageList
        })
      }
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
                    // userid: wx.getStorageSync('DTUserinfo').userid.userid,
                    // _token: wx.getStorageSync('DTUserinfo')._token,
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
                    // userid: wx.getStorageSync('DTUserinfo').userid.userid,
                    // _token: wx.getStorageSync('DTUserinfo')._token,
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

  //关注 取消
  enshrineClick_css: function(e) {
          const that = this;
          var index = e.currentTarget.dataset.index
          console.log("改变收藏信息",index,that.data.messageList[index])
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
                          title: '关注成功',
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

      that.data.message.push({
        id: ret.itemid, //信息id
        mid: 5,
        userid: ret.businesscard.userid, //userid
        head_portrait_icon: ret.user.avatarUrl ? ret.user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
        icon_vip: ret.vip, //  0===非vip 1-3==vip  
        name: ret.businesscard.truename, //用户姓名
        position: ret.businesscard.career, //职位
        demand: '供应', //发布类别  ()
        mobile: ret.mobile,
        company: ret.businesscard.company, //公司
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
        message: that.data.message,
        leave_word_details: arr,
        business_card: ret.businesscard
      })
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

      that.data.message.push({
        id: ret.itemid, //信息id
        mid: 6,
        userid: ret.businesscard.userid, //userid
        head_portrait_icon: ret.user.avatarUrl ? ret.user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
        icon_vip: ret.vip, //  0===非vip 1-3==vip  
        name: ret.businesscard.truename, //用户姓名
        position: ret.businesscard.career, //职位
        demand: '求购', //发布类别  ()
        mobile: ret.mobile,
        company: ret.businesscard.company, //公司
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
        message: that.data.message,
        leave_word_details: arr,
        business_card: ret.businesscard
      })
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

      that.data.message.push({
        id: ret.itemid, //信息id
        mid: 88,
        userid: ret.businesscard.userid, //userid
        head_portrait_icon: ret.user.avatarUrl ? ret.user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
        icon_vip: ret.vip, //  0===非vip 1-3==vip  
        name: ret.businesscard.truename, //用户姓名
        position: ret.businesscard.career, //职位
        demand: '纺机', //发布类别  ()
        mobile: ret.mobile,
        company: ret.businesscard.company, //公司
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
        message: that.data.message,
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
      // that.data.messageList.push(ret.data)
      for (var i in ret.data) {
        if (that.data.mid != 5 || that.data.id != ret.data[i].itemid)
        that.data.messageList.push({
          id: ret.data[i].itemid, //信息id
          mid: 5,
          userid: ret.data[i].businesscard.userid, //userid
          head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
          icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
          name: ret.data[i].businesscard.truename, //用户姓名
          position: ret.data[i].businesscard.career, //职位
          demand: '供应', //发布类别  ()
          mobile: ret.data[i].mobile,
          company: ret.data[i].businesscard.company, //公司
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
          time: ret.data[i].adddate, //发布时间
          addtime: ret.data[i].addtime, //发布详细时间
          address: ret.data[i].address, //货物存放地
          page_view: ret.data[i].hits, //浏览量
          favorite: ret.data[i].favorite, //收藏
          like: ret.data[i].agree //点赞

        })
      }
      var messageList = that.sort(that.data.messageList)
      that.setData({
        supplyPage: ret.current_page < ret.last_page ? ret.current_page + 1 : null,
        messageList: messageList
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
      // that.data.messageList.push(ret.data)
      for (var i in ret.data) {
        if (that.data.mid != 6 || that.data.id != ret.data[i].itemid)
        that.data.messageList.push({
          id: ret.data[i].itemid, //信息id
          mobile: ret.data[i].mobile,
          mid: 6,
          userid: ret.data[i].businesscard.userid, //userid
          head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
          icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
          name: ret.data[i].businesscard.truename, //用户姓名
          position: ret.data[i].businesscard.career, //职位
          demand: '求购', //发布类别  ()
          company: ret.data[i].businesscard.company, //公司
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
          time: ret.data[i].adddate, //发布时间
          addtime: ret.data[i].addtime, //发布详细时间
          address: ret.data[i].address, //货物存放地
          page_view: ret.data[i].hits, //浏览量
          favorite: ret.data[i].favorite, //收藏
          like: ret.data[i].agree //点赞
        })
      }
      var messageList = that.sort(that.data.messageList)
      that.setData({
        buyPage: ret.current_page < ret.last_page ? ret.current_page + 1 : null,
        messageList: messageList
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
        that.data.messageList.push({
          id: ret.data[i].itemid, //信息id
          mid: 88,
          userid: ret.data[i].businesscard.userid, //userid
          head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
          icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
          name: ret.data[i].businesscard.truename, //用户姓名
          position: ret.data[i].businesscard.career, //职位
          demand: '纺机', //发布类别  ()
          mobile: ret.data[i].mobile,
          company: ret.data[i].businesscard.company, //公司
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
          time: ret.data[i].adddate, //发布时间
          addtime: ret.data[i].addtime, //发布详细时间
          address: ret.data[i].address, //货物存放地
          page_view: ret.data[i].hits, //浏览量
          favorite: ret.data[i].favorite, //收藏
          like: ret.data[i].agree //点赞
        })
      }
      var messageList = that.sort(that.data.messageList)
      that.setData({
        fjmyPage: ret.current_page < ret.last_page ? ret.current_page + 1 : null,
        messageList: messageList
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

    if (options.id && options.mid) {
      that.setData({
        id: options.id,
        mid: options.mid,
      })
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

})