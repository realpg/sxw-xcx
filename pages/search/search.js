// pages/search/search.js
const app = getApp();
const util = require('../../utils/util.js')
var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    supply_next_page: [{
      mid: 5,
      next_page: 1
    }],
    buy_next_page: [{
      mid: 6,
      next_page: 1
    }],
    fjmy_next_page: [{
      mid: 88,
      next_page: 1
    }],
    all_next_page: [{
      mid: 5,
      next_page: 1
    }, {
      mid: 6,
      next_page: 1
    }, {
      mid: 88,
      next_page: 1
    },],
    hint: '',
    array: ['全部', '供应', '求购', '纺机', '名片'],
    objectArray: [{
      id: 0,
      name: '全部'
    },
    {
      id: 1,
      name: '供应'
    },
    {
      id: 2,
      name: '求购'
    },
    {
      id: 3,
      name: '设备'
    },
    {
      id: 4,
      name: '名片'
    }
    ],
    index: '0',
    recently_history: [],
    hot_word: [],
    lable: [{
      id: '0',
      lable_Info: '面纱'
    }, {
      id: '1',
      lable_Info: '进口棉'
    }, {
      id: '2',
      lable_Info: '包漂'
    }, {
      id: '3',
      lable_Info: '面纱'
    }, {
      id: '4',
      lable_Info: '气流纺'
    }, {
      id: '5',
      lable_Info: '针织纱用'
    }, {
      id: '6',
      lable_Info: '涡流纺'
    }, {
      id: '7',
      lable_Info: '环锭纱'
    }, {
      id: '8',
      lable_Info: '免费拿样'
    }, {
      id: '9',
      lable_Info: '送货上门'
    }, {
      id: '10',
      lable_Info: '面纱'
    }, {
      id: '11',
      lable_Info: '进口棉'
    },],

    messageList: [],
    searching: false,
  },

  seekInput: function (e) {

    that.setData({
      seekInp: e.detail.value
    })

  },

  addHistory: function () {
    var s = new Set();
    var arrb = [];
    var arr = wx.getStorageSync('history') ? wx.getStorageSync('history') : []
    s = arr;

    arr.push(that.data.seekInp);

    s.forEach(function (data) {
      arrb.push(data)
    })

    console.log(arrb)
    that.setData({
      recently_history: arrb
    });
    wx.setStorage({
      key: 'history',
      data: arrb,
    })
  },

  sethistoryClick: function (e) {
    that.data.seekInp = e.currentTarget.dataset.history;
    that.seekClick();
    that.setData({
      seekInp: that.data.seekInp
    })
  },


  clear: function () {
    that.setData({
      recently_history: []
    });
    wx.setStorage({
      key: 'history',
      data: [],
    })
  },

  seekClick: function () {
    console.log('点击搜索', that.data.index)
    that.setData({
      messageList: []
    });
    switch (that.data.index) {
      case '0':
        that.ALLSearch();
        break;
      case '1':
        that.setData({
          sell_next_page: 1
        })
        that.SupplySearch();
        break;

      case '2':
        that.BuySearch();
        break;

      case '3':
        that.FrameSearch();
        break;
      case '4':
        that.BussinessCardSearch();
        break
    }
    that.addHistory();

  },

  //查询全部 
  ALLSearch: function () {
    console.log('搜索全部')
    that.setData({
      searching: true
    })
    var interfaces = [];
    for (var i in that.data.all_next_page) {
      interfaces.push({
        param: {
          keyword: that.data.seekInp,
          page: that.data.all_next_page[i].next_page
        },
        func: that.data.all_next_page[i].mid == 5 ? util.SupplySearch : (
          that.data.all_next_page[i].mid == 6 ? util.BuySearch : (
            that.data.all_next_page[i].mid == 88 ? util.FrameSearch : null
          )
        )
      })
    }
    var checkparam = function (Interface) {
      if (Interface.param.page)
        return true;
      else
        return false;
    }
    var callback = function (rets) {
      console.log("全部列表获取完成", rets)
      wx.hideLoading()
      var messageList = []
      var all_next_page = that.data.all_next_page;

      for (var idx in rets) {
        var ret = rets[idx];
        if (ret) {
          for (var i in ret.data)
            if (ret.data[i].businesscard)
              messageList.push({
                id: ret.data[i].itemid, //信息id
                mid: that.data.all_next_page[idx].mid,
                userid: ret.data[i].businesscard.userid, //userid
                head_portrait_icon: ret.data[i].businesscard ? (ret.data[i].businesscard.avatarUrl ? ret.data[i].businesscard.avatarUrl : '../../images/index/head_portrait.png') : '../../images/index/head_portrait.png', //头像，后面是默认头像
                icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
                name: ret.data[i].businesscard ? ret.data[i].businesscard.truename : "未知", //用户姓名
                position: ret.data[i].businesscard ? ret.data[i].businesscard.career : "", //职位
                demand: '纺机贸易', //发布类别  ()
                mobile: ret.data[i].mobile,
                company: ret.data[i].businesscard ? ret.data[i].businesscard.company : "", //公司
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
        all_next_page[idx].next_page = ret ? (ret.current_page < ret.last_page ? ret.current_page + 1 : null) : null
      }
      messageList = that.sort(messageList)
      messageList = that.data.messageList.concat(messageList)
      that.setData({
        all_next_page: all_next_page,
        messageList: messageList,

      })

    }
    util.showLoading();
    that.requestInterfaces(interfaces, checkparam, callback)
  },
  SupplySearch: function () {
    console.log('搜索供应')
    that.setData({
      searching: true
    })
    var interfaces = [];
    for (var i in that.data.supply_next_page) {
      interfaces.push({
        param: {
          keyword: that.data.seekInp,
          page: that.data.supply_next_page[i].next_page
        },
        func: that.data.supply_next_page[i].mid == 5 ? util.SupplySearch : (
          that.data.supply_next_page[i].mid == 6 ? util.BuySearch : (
            that.data.supply_next_page[i].mid == 88 ? util.FrameSearch : null
          )
        )
      })
    }
    var checkparam = function (Interface) {
      if (Interface.param.page)
        return true;
      else
        return false;
    }
    var callback = function (rets) {
      console.log("供应列表获取完成", rets)
      wx.hideLoading()
      var messageList = []
      var supply_next_page = that.data.supply_next_page;

      for (var idx in rets) {
        var ret = rets[idx];
        if (ret) {
          for (var i in ret.data)
            if (ret.data[i].businesscard)
              messageList.push({
                id: ret.data[i].itemid, //信息id
                mid: that.data.supply_next_page[idx].mid,
                userid: ret.data[i].businesscard.userid, //userid
                head_portrait_icon: ret.data[i].businesscard ? (ret.data[i].businesscard.avatarUrl ? ret.data[i].businesscard.avatarUrl : '../../images/index/head_portrait.png') : '../../images/index/head_portrait.png', //头像，后面是默认头像
                icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
                name: ret.data[i].businesscard ? ret.data[i].businesscard.truename : "未知", //用户姓名
                position: ret.data[i].businesscard ? ret.data[i].businesscard.career : "", //职位
                demand: '纺机贸易', //发布类别  ()
                mobile: ret.data[i].mobile,
                company: ret.data[i].businesscard ? ret.data[i].businesscard.company : "", //公司
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
        supply_next_page[idx].next_page = ret ? (ret.current_page < ret.last_page ? ret.current_page + 1 : null) : null
      }
      messageList = that.sort(messageList)
      messageList = that.data.messageList.concat(messageList)
      that.setData({
        supply_next_page: supply_next_page,
        messageList: messageList,

      })

    }
    util.showLoading();
    that.requestInterfaces(interfaces, checkparam, callback)
  },

  BuySearch: function () {
    console.log('搜索求购')
    that.setData({
      searching: true
    })
    var interfaces = [];
    for (var i in that.data.buy_next_page) {
      interfaces.push({
        param: {
          keyword: that.data.seekInp,
          page: that.data.buy_next_page[i].next_page
        },
        func: that.data.buy_next_page[i].mid == 5 ? util.SupplySearch : (
          that.data.buy_next_page[i].mid == 6 ? util.BuySearch : (
            that.data.buy_next_page[i].mid == 88 ? util.FrameSearch : null
          )
        )
      })
    }
    var checkparam = function (Interface) {
      if (Interface.param.page)
        return true;
      else
        return false;
    }
    var callback = function (rets) {
      console.log("求购列表获取完成", rets)
      wx.hideLoading()
      var messageList = []
      var buy_next_page = that.data.buy_next_page;

      for (var idx in rets) {
        var ret = rets[idx];
        if (ret) {
          for (var i in ret.data)
            if (ret.data[i].businesscard)
              messageList.push({
                id: ret.data[i].itemid, //信息id
                mid: that.data.buy_next_page[idx].mid,
                userid: ret.data[i].businesscard.userid, //userid
                head_portrait_icon: ret.data[i].businesscard ? (ret.data[i].businesscard.avatarUrl ? ret.data[i].businesscard.avatarUrl : '../../images/index/head_portrait.png') : '../../images/index/head_portrait.png', //头像，后面是默认头像
                icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
                name: ret.data[i].businesscard ? ret.data[i].businesscard.truename : "未知", //用户姓名
                position: ret.data[i].businesscard ? ret.data[i].businesscard.career : "", //职位
                demand: '纺机贸易', //发布类别  ()
                mobile: ret.data[i].mobile,
                company: ret.data[i].businesscard ? ret.data[i].businesscard.company : "", //公司
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
        buy_next_page[idx].next_page = ret ? (ret.current_page < ret.last_page ? ret.current_page + 1 : null) : null
      }
      messageList = that.sort(messageList)
      messageList = that.data.messageList.concat(messageList)
      that.setData({
        buy_next_page: buy_next_page,
        messageList: messageList,

      })

    }
    util.showLoading();
    that.requestInterfaces(interfaces, checkparam, callback)
  },

  FrameSearch: function () {
    console.log('搜索纺机贸易')
    that.setData({
      searching: true
    })
    var interfaces = [];
    for (var i in that.data.fjmy_next_page) {
      interfaces.push({
        param: {
          keyword: that.data.seekInp,
          page: that.data.fjmy_next_page[i].next_page
        },
        func: that.data.fjmy_next_page[i].mid == 5 ? util.SupplySearch : (
          that.data.fjmy_next_page[i].mid == 6 ? util.BuySearch : (
            that.data.fjmy_next_page[i].mid == 88 ? util.FrameSearch : null
          )
        )
      })
    }
    var checkparam = function (Interface) {
      if (Interface.param.page)
        return true;
      else
        return false;
    }
    var callback = function (rets) {
      console.log("纺机贸易获取完成", rets)
      wx.hideLoading()
      var messageList = []
      var fjmy_next_page = that.data.fjmy_next_page;

      for (var idx in rets) {
        var ret = rets[idx];
        if (ret) {
          for (var i in ret.data)
            if (ret.data[i].businesscard)
              messageList.push({
                id: ret.data[i].itemid, //信息id
                mid: that.data.fjmy_next_page[idx].mid,
                userid: ret.data[i].businesscard.userid, //userid
                head_portrait_icon: ret.data[i].businesscard ? (ret.data[i].businesscard.avatarUrl ? ret.data[i].businesscard.avatarUrl : '../../images/index/head_portrait.png') : '../../images/index/head_portrait.png', //头像，后面是默认头像
                icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
                name: ret.data[i].businesscard ? ret.data[i].businesscard.truename : "未知", //用户姓名
                position: ret.data[i].businesscard ? ret.data[i].businesscard.career : "", //职位
                demand: '纺机贸易', //发布类别  ()
                mobile: ret.data[i].mobile,
                company: ret.data[i].businesscard ? ret.data[i].businesscard.company : "", //公司
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
        fjmy_next_page[idx].next_page = ret ? (ret.current_page < ret.last_page ? ret.current_page + 1 : null) : null
      }
      messageList = that.sort(messageList)
      messageList = that.data.messageList.concat(messageList)
      that.setData({
        fjmy_next_page: fjmy_next_page,
        messageList: messageList,

      })

    }
    util.showLoading();
    that.requestInterfaces(interfaces, checkparam, callback)
  },

  BussinessCardSearch: function () {
    console.log('名片信息')
    var param = {
      userid: wx.getStorageSync('UserInfo').userid,
      _token: wx.getStorageSync('UserInfo')._token,
      keyword: that.data.seekInp
    };
    util.showLoading();
    that.setData({
      searching: true
    })
    util.BussinessCardSearch(param, function (ret) {
      console.log('名片信息', ret)
      // that.data.messageList.push(ret.data)
      if (ret)
        for (var i in ret.data) {
          that.data.messageList.push({
            id: ret.data[i].businesscard.userid, //信息id
            //   mid: 2,
            head_portrait_icon: ret.data[i].businesscard ? (ret.data[i].businesscard.avatarUrl ? ret.data[i].businesscard.avatarUrl : '../../images/index/head_portrait.png') : '../../images/index/head_portrait.png', //头像，后面是默认头像
            //   icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
            name: ret.data[i].businesscard ? ret.data[i].businesscard.truename : "未知", //用户姓名
            position: ret.data[i].businesscard ? ret.data[i].businesscard.career : "", //职位
            //   demand: '纺机贸易', //发布类别  ()
            //   mobile: ret.data[i].mobile,
            company: ret.data[i].businesscard ? ret.data[i].businesscard.company : "", //公司
            //   lableList: ret.data[i].tags,
            business: ret.data[i].businesscard.business,
            //   details: ret.data[i].introduce, //信息详情描述
            //   message_Img: //详情图片  后续跟进
            //     [{
            //       message_Image: ret.data[i].thumb
            //     },
            //     {
            //       message_Image: ret.data[i].thumb1
            //     },
            //     {
            //       message_Image: ret.data[i].thumb2
            //     }
            //     ],
            //   time: ret.data[i].adddate, //发布时间
            //   addtime: ret.data[i].addtime, //发布详细时间
            //   address: ret.data[i].address, //货物存放地
            //   page_view: ret.data[i].hits, //浏览量
            //   like: ret.data[i].agree //点赞
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

  getSystemKeyValue: function () {
    util.getSystemKeyValue({
      id: 7
    }, function (ret) {
      console.log(ret)
      var arrb = [];
      if (ret.value) {
        arrb = ret.value.split(",")
      }
      that.setData({
        hot_word: arrb,
      })
    }, null)

  },

  //选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      index: '' + e.detail.value,
      messageList: []
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    var index = options.index
    that.setData({
      index: '' + (index ? index : 0)
    })
    console.log(33333333333, index, that.data.index);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var history = wx.getStorageSync("history") ? wx.getStorageSync("history") : [];
    that.setData({
      recently_history: history
    })
    that.getSystemKeyValue();
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    console.log("触底加载", that.data.index)
    switch (that.data.index) {
      case '0':
        that.ALLSearch();
        break;
      case '1':
        that.SupplySearch();
        break;
      case '2':
        that.BuySearch();
        break;
      case '3':
        that.FrameSearch();
        break;
      case '4':
        that.BussinessCardSearch();
        break;
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //查看
  messageList_click: function (e) {
    wx.navigateTo({
      url: '../store_particulars/store_particulars?id=' + e.currentTarget.dataset.id,
    })
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
      for (var i in that.data.messageList) {
        if (that.data.messageList[i].id == res.itemid&&that.data.message[i].mid == e.currentTarget.dataset.mid) {
          that.data.messageList[i].I_agree = true;
          that.data.messageList[i].like++;
        }
      }
      that.setData({
        messageList: that.data.messageList
      })
    }, null)

  },

    //关注 取消
    enshrineClick: function (e) {
        const that = this;
        var index = e.currentTarget.dataset.index
        console.log("改变收藏信息",index,that.data.messageList[index])
        console.log(e.currentTarget.dataset.mid, e.currentTarget.dataset.id)

        if (that.data.messageList[index].id == e.currentTarget.dataset.id && that.data.messageList[index].mid == e.currentTarget.dataset.mid) {
            if (that.data.messageList[index].I_favortie == false) {
                var param = {
                    // userid: wx.getStorageSync('UserInfo').userid.userid,
                    // _token: wx.getStorageSync('UserInfo')._token,
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
                    // userid: wx.getStorageSync('UserInfo').userid.userid,
                    // _token: wx.getStorageSync('UserInfo')._token,
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
  see_details_click: function (e) {
    wx.navigateTo({
      url: '../particulars/particulars?id=' + e.currentTarget.dataset.id + '&mid=' + e.currentTarget.dataset.mid,
    })
  },
  searching: function () {
    that.setData({
      searching: false
    })
  },

  //点击头像查看名片
  messageList_click: function (e) {
    wx.navigateTo({
      url: '../store_particulars/store_particulars?id=' + e.currentTarget.dataset.id,
    })
  },

  requestInterfaces: function (interfaces, checkparam, callback, rets) {
    if (typeof (rets) == 'undefined') {
      rets = [];
      //默认返回数组为空
    }

    if (interfaces.length == 0) {
      //全部接口请求完，执行函数
      callback(rets)
    } else {

      var IFC = interfaces.shift()
      //取出首个接口
      if (!checkparam(IFC)) {
        rets.push(null)
        that.requestInterfaces(interfaces, checkparam, callback, rets)
      } else IFC.func(IFC.param,
        function (ret) {
          rets.push(ret)
          that.requestInterfaces(interfaces, checkparam, callback, rets)
        },
        function (ret) {
          rets.push(null)
          that.requestInterfaces(interfaces, checkparam, callback, rets)
        });

    }
  }
})