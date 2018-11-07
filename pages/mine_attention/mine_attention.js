// pages/mine_attention/mine_attention.js

var app = getApp();
const util = require('../../utils/util.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info_color: '#01C46C',
    card_color: '',
    fjmy_color: '',
    message: [],
    sellList: [],
    buyList: [],
    fjmyList: [],
    cardList: [],
    sell_next_page: 1,
    buy_next_page: 1,
    fjmy_next_page: 1,
    card_next_page: 1,
    nn: 1,
    hint:'',
  },
  //联系商家
  phoneClick: function(e) {
    console.log(e)
    if (e.currentTarget.dataset.mobile == '') {
      wx.showToast({
        title: '暂无手机号',
        icon: 'none',
        duration: 1500
      })
    } else {
    util.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.mobile
    }, e.currentTarget.dataset.buys > 0 || e.currentTarget.dataset.mid != 5)
    }
  },
  //点击头像查看名片
  messageList_click: function(e) {
    wx.navigateTo({
      url: '../store_particulars/store_particulars?id=' + e.currentTarget.dataset.id,
    })
  },

//名片取消
  cancelClick:function(e){
      const that = this;
    var index = e.currentTarget.dataset.index
    console.log('名片取消', e.currentTarget.dataset.mid,e.currentTarget.dataset.id)
        var param = {
          // userid: wx.getStorageSync('DTUserinfo').userid.userid,
          // _token: wx.getStorageSync('DTUserinfo')._token,
          mid: e.currentTarget.dataset.mid,
          tid: e.currentTarget.dataset.id,
          cancle: '3'
        };
        util.enshrine(param, function (res) {
          console.log('取消收藏', res,  that.data.cardList);
          that.data.cardList[index].I_favorite = false;
          that.data.cardList[index].favorite--;
          that.setData({
            cardList: that.data.cardList
          })
          wx.showToast({
            title: '取消成功',
            icon: 'none',
            duration: 1500
          })
          setTimeout(function () {
            that.loading()
          }, 1500)
        }, null)

  },

  //关注 取消
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
            title: '收藏成功',
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
          setTimeout(function() {
            that.loading()
          }, 1500)

        }, null)
      }
      // that.setData({
      //   message: that.data.message
      // })

    }

  },

  //点赞 取消
  setLikeClick: function (e) {
    const that = this;
    var index = e.currentTarget.dataset.index
    console.log("改变收藏信息", index, that.data.message[index])
    console.log(e.currentTarget.dataset.mid, e.currentTarget.dataset.id)

    if (that.data.message[index].id == e.currentTarget.dataset.id && that.data.message[index].mid == e.currentTarget.dataset.mid) {
      if (that.data.message[index].I_agree == false) {
        var param = {
          item_mid: e.currentTarget.dataset.mid,
          item_id: e.currentTarget.dataset.id
        };
        util.setLike(param, function (res) {
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
        util.setLike(param, function (res) {
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

  //信息栏选择
  selectClick: function(e) {
    that.setData({
      nn: e.target.dataset.nn
    })
    that.changeMessage();
    // console.log(e)
  },
  //选择
  changeMessage: function(e) {
    console.log("changeMessage")
    if (that.data.nn == 1) {
      that.setData({
        info_color: '#01C46C',
        qiugou_color: '',
        fjmy_color: '',
        card_color: '',
        message: that.data.sellList,

      })
      if (that.data.message.length == 0)
        that.getSellList()
    } else if (that.data.nn == 2) {
      that.setData({
        info_color: '',
        qiugou_color: '#01C46C',
        fjmy_color: '',
        card_color: '',
        message: that.data.buyList,
      

      })
      if (that.data.message.length == 0)
        that.getBuyList()
    } else if (that.data.nn == 3) {
      that.setData({
        info_color: '',
        qiugou_color: '',
        fjmy_color: '#01C46C',
        card_color: '',
        message: that.data.fjmyList,
        
      })
      if (that.data.message.length == 0)
        that.getFJMYList()
    } else if (that.data.nn == 4) {
      that.setData({
        info_color: '',
        qiugou_color: '',
        fjmy_color: '',
        card_color: '#01C46C',
        cardList: that.data.cardList,
        message: '',
      })
      if (that.data.message.length == 0)
        that.getCardList()
    }
  },


  //查看详情
  see_details_click: function(e) {
    wx.navigateTo({
      url: '../particulars/particulars?id=' + e.currentTarget.dataset.id + '&mid=' + e.currentTarget.dataset.mid,
    })
  },

  loading: function() {
    that.setData({
      info_color: '#01C46C',
      card_color: '',
      fjmy_color: '',
      message: [],
      sellList: [],
      buyList: [],
      fjmyList: [],
      cardList: [],
      sell_next_page: 1,
      buy_next_page: 1,
      fjmy_next_page: 1,
      card_next_page: 1,
    })
    console.log('loading')
    that.changeMessage()
  },

  getSellList: function() {

    if (that.data.sell_next_page)
      util.getMySellList({
        page: that.data.sell_next_page,
        mid: 5
      }, function(ret) {
        console.log("供应列表", ret);
        var sellList = [];
        for (var i in ret.data) {
          // if (ret.data[i].user)
          sellList.push({
            id: ret.data[i].item.itemid, //信息id
            mid: 5,
            head_portrait_icon: ret.data[i].item.businesscard.avatarUrl, //头像，后面是默认头像
            icon_vip: ret.data[i].item.businesscard.vip, //  0===非vip 1-3==vip             
            name: ret.data[i].item.businesscard.truename, //用户姓名
            userid: ret.data[i].item.businesscard.userid, //userid
            position: ret.data[i].item.businesscard.career, //职位
            mobile: ret.data[i].item.businesscard.mobile, //电话
            demand: '供应', //发布类别  ()
            company: ret.data[i].item.businesscard.buys > 0 ? util.hiddenCompany(ret.data[i].item.businesscard.company) : ret.data[i].item.businesscard.company, //公司
            buys:ret.data[i].item.businesscard.buys,
            lableList: ret.data[i].item.tags, 
            details: ret.data[i].item.introduce, //信息详情描述
            I_favortie: ret.data[i].item.I_favortie,
            I_agree: ret.data[i].item.I_agree,
            message_Img: //详情图片  后续跟进
              [{
                  message_Image: ret.data[i].item.thumb
                },
                {
                  message_Image: ret.data[i].item.thumb1
                },
                {
                  message_Image: ret.data[i].item.thumb2
                }
              ],
            time: util.formatTime(new Date(ret.data[i].addtime * 1000)), //发布时间
            addtime: ret.data[i].item.addtime, //发布详细时间
            address: ret.data[i].item.address, //货物存放地
            page_view: ret.data[i].item.hits, //浏览量
            favorite: ret.data[i].item.favorite, //收藏
            like: ret.data[i].item.agree //点赞
          })
        }
        console.log("供应", sellList)
        sellList = that.data.sellList.concat(sellList);
        console.log("供应", sellList)
        that.setData({   
          sellList: sellList,
          sell_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url,
        })
        setTimeout(function(){
            that.setData({
              hint_one:'您还未收藏该类信息'
            })
        },1000)
        // console.log(that.data.sellList)
        that.changeMessage();
      }, null)
  },

  getBuyList: function() {

    if (that.data.buy_next_page)
      util.getMyBuyList({
        page: that.data.buy_next_page,
        mid: 6
      }, function(ret) {
        console.log("求购列表", ret);
        var buyList = [];
        for (var i in ret.data) {
          // if (ret.data[i].user)
          buyList.push({
            id: ret.data[i].item.itemid, //信息id
            mid: 6,
            head_portrait_icon: ret.data[i].item.businesscard.avatarUrl, //头像，后面是默认头像
            icon_vip: ret.data[i].item.businesscard.vip, //  0===非vip 1-3==vip             
            name: ret.data[i].item.businesscard.truename, //用户姓名
            userid: ret.data[i].item.businesscard.userid, //userid
            position: ret.data[i].item.businesscard.career, //职位
            mobile: ret.data[i].item.businesscard.mobile, //电话
            demand: '求购', //发布类别  ()
            company: util.hiddenCompany(ret.data[i].item.businesscard.company), //公司
            lableList: ret.data[i].item.tags,
            details: ret.data[i].item.introduce, //信息详情描述
            I_favortie: ret.data[i].item.I_favortie,
            I_agree: ret.data[i].item.I_agree,
            message_Img: //详情图片  后续跟进
              [{
                  message_Image: ret.data[i].item.thumb
                },
                {
                  message_Image: ret.data[i].item.thumb1
                },
                {
                  message_Image: ret.data[i].item.thumb2
                }
              ],
            time: util.formatTime(new Date(ret.data[i].addtime * 1000)), //发布时间
            addtime: ret.data[i].item.addtime, //发布详细时间
            address: ret.data[i].item.address, //货物存放地
            page_view: ret.data[i].item.hits, //浏览量
            favorite: ret.data[i].item.favorite, //收藏
            like: ret.data[i].item.agree //点赞
          })
        }
        console.log("求购", that.data.buyList)
        buyList = that.data.buyList.concat(buyList);
        that.setData({
          buyList: buyList,
          buy_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
        })
        setTimeout(function () {
          that.setData({
            hint_two: '您还未收藏该类信息'
          })
        }, 1000)
        that.changeMessage();
      }, null)
  },

  getFJMYList: function() {

    if (that.data.fjmy_next_page)
      util.getMyFJMYList({
        page: that.data.fjmy_next_page,
        mid: 88
      }, function(ret) {
        console.log("纺机列表", ret);
        var fjmyList = [];
        for (var i in ret.data) {
          // if (ret.data[i].user)
          // console.log(ret.data[i].user)
          fjmyList.push({
            id: ret.data[i].item.itemid, //信息id
            mid: 88,
            head_portrait_icon: ret.data[i].item.businesscard.avatarUrl, //头像，后面是默认头像
            icon_vip: ret.data[i].item.businesscard.vip, //  0===非vip 1-3==vip             
            name: ret.data[i].item.businesscard.truename, //用户姓名
            userid: ret.data[i].item.businesscard.userid, //userid
            position: ret.data[i].item.businesscard.career, //职位
            mobile: ret.data[i].item.businesscard.mobile, //电话
            demand: '纺机', //发布类别  ()
            company: util.hiddenCompany(ret.data[i].item.businesscard.company), //公司
            lableList: ret.data[i].item.tags,
            details: ret.data[i].item.introduce, //信息详情描述
            I_favortie: ret.data[i].item.I_favortie,
            I_agree: ret.data[i].item.I_agree,
            message_Img: //详情图片  后续跟进
              [{
                  message_Image: ret.data[i].item.thumb
                },
                {
                  message_Image: ret.data[i].item.thumb1
                },
                {
                  message_Image: ret.data[i].item.thumb2
                }
              ],
            time: util.formatTime(new Date(ret.data[i].addtime * 1000)), //发布时间
            addtime: ret.data[i].item.addtime, //发布详细时间
            address: ret.data[i].item.address, //货物存放地
            page_view: ret.data[i].item.hits, //浏览量
            favorite: ret.data[i].item.favorite, //收藏
            like: ret.data[i].item.agree //点赞
          })
        }
        fjmyList = that.data.fjmyList.concat(fjmyList);
        console.log("纺机", that.data.fjmyList)

        that.setData({
          fjmyList: fjmyList,
          fjmy_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
        })
        setTimeout(function () {
          that.setData({
            hint_three: '您还未收藏该类信息'
          })
        }, 1000)
        that.changeMessage();
      }, null)
  },


  getCardList: function() {

    if (that.data.card_next_page)
      util.getMyCardList({
        page: that.data.card_next_page,
        mid: 2
      }, function(ret) {
        console.log("名片", ret);
        var cardList = [];
        for (var i in ret.data) {
          // if (ret.data[i].user)
          console.log(ret.data[i])
          if(ret.data[i].item)
          cardList.push({
            userid: ret.data[i].item.userid, //信息id
            mid: 2,
            avatarUrl: ret.data[i].item.avatarUrl, //头像，后面是默认头像
            icon_vip: ret.data[i].item.vip, //  0===非vip 1-3==vip
            name: ret.data[i].item.truename, //用户姓名
            career: ret.data[i].item.career, //职位
            company: ret.data[i].item.buys > 0 ? util.hiddenCompany(ret.data[i].item.company) : ret.data[i].item.company, //公司
            business: ret.data[i].item.business, //主营
            view: ret.data[i].item.view, //浏览量
            favorite: ret.data[i].item.favorite, //收藏
            I_favorite: ret.data[i].item.I_favorite,//收藏数量
          })
        }
        cardList = that.data.cardList.concat(cardList);
        console.log("名片", that.data.cardList)

        that.setData({
          cardList: cardList,
          card_next_page: ret.next_page_url ? ret.next_page_url.split('page=')[1] : ret.next_page_url
        })
        setTimeout(function () {
          that.setData({
            hint_code: '您还未收藏名片'
          })
        }, 1000)
        that.changeMessage();
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
    //获取我的关注
    that.loading()
    //获取我的关注
    //获取我的关注

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
    console.log("触底加载", that.data)
    switch (that.data.nn+'') {
      case '1':
        that.getSellList();
        break;
      case '2':
        that.getBuyList();
        break
      case '3':
        that.getFJMYList();
        break
      case '4':
        that.getCardList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //图片预览
  previewImClick: function (e) {
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
  }

})