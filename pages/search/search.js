// pages/search/search.js
const app = getApp();
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  array: ['全部', '供应', '求购', '纺机'],
    objectArray: [
      {
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
      }
    ],
    index: '0',

    recently_history: [],

    hot_word: [],


    lable: [{ id: '0', lable_Info: '面纱' }, {
      id: '1', lable_Info: '进口棉'
    }, { id: '2', lable_Info: '包漂' }, { id: '3', lable_Info: '面纱' }, { id: '4', lable_Info: '气流纺' }, { id: '5', lable_Info: '针织纱用' }, {
      id: '6', lable_Info: '涡流纺'
    }, { id: '7', lable_Info: '环锭纱' }, { id: '8', lable_Info: '免费拿样' }, { id: '9', lable_Info: '送货上门' }, { id: '10', lable_Info: '面纱' }, {
      id: '11', lable_Info: '进口棉'
    },],

    messageList:[],

  },

  seekInput:function(e){
    const that = this;
    that.setData({
      seekInp: e.detail.value
    })

  },

  addHistory: function () {
    const that = this;
    let s = new Set();
    let arrb = [];
    let arr = wx.getStorageSync('history') ? wx.getStorageSync('history') : []
    s=arr;
    
    arr.push(that.data.seekInp);
    
    s.forEach(function(data){
      arrb.push(data)
    })
    
    console.log(arrb)
    that.setData({ recently_history: arrb });
    wx.setStorage({
      key: 'history',
      data: arrb,
    })
  },

  sethistoryClick:function(e){
    const that=this;
    that.data.seekInp = e.currentTarget.dataset.history;
    that.seekClick();
    that.setData({
      seekInp: that.data.seekInp
    })
  },


  clear: function () {
    var that = this;
    that.setData({ recently_history: [] });
    wx.setStorage({
      key: 'history',
      data: [],
    })
  },

  seekClick:function(){
    const that = this;
    console.log('点击搜索')
    that.data.messageList=[];
    switch (that.data.index){
      case '0':
        that.SupplySearch();
        that.BuySearch();
        that.FrameSearch();
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
    }
    that.addHistory();

  },


  SupplySearch: function () {
    const that = this;
    console.log('供应搜索')
    let param = {
      userid: wx.getStorageSync('UserInfo').userid,
      _token: wx.getStorageSync('UserInfo')._token,
      keyword: that.data.seekInp
    };
    util.SupplySearch(param, function (ret) {
      console.log('供应信息', ret)
      // that.data.messageList.push(ret.data)
      for (let i in ret.data) {
        that.data.messageList.push({
          id: ret.data[i].itemid, //信息id
          mid: 5,
          head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
          icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
          name: ret.data[i].businesscard.truename, //用户姓名
          position: ret.data[i].businesscard.career, //职位
          demand: '供应', //发布类别  ()
          mobile: ret.data[i].mobile,
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
          addtime: ret.data[i].addtime, //发布详细时间
          address: ret.data[i].address, //货物存放地
          page_view: ret.data[i].hits, //浏览量
          like: ret.data[i].agree //点赞
        })
      }
      that.data.messageList = that.sort(that.data.messageList)
      that.setData({
        messageList: that.data.messageList
      })
    });
  },

  BuySearch: function () {
    const that = this;
    console.log('求购搜索')
    let param = {
      userid: wx.getStorageSync('UserInfo').userid,
      _token: wx.getStorageSync('UserInfo')._token,
      keyword: that.data.seekInp
    };
    util.BuySearch(param, function (ret) {
      console.log('求购信息', ret)
      // that.data.messageList.push(ret.data)
      for (let i in ret.data) {
        that.data.messageList.push({
          id: ret.data[i].itemid, //信息id
          mid: 6,
          head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
          icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
          name: ret.data[i].businesscard.truename, //用户姓名
          position: ret.data[i].businesscard.career, //职位
          demand: '求购', //发布类别  ()
          mobile: ret.data[i].mobile,
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
          addtime: ret.data[i].addtime, //发布详细时间
          address: ret.data[i].address, //货物存放地
          page_view: ret.data[i].hits, //浏览量
          like: ret.data[i].agree //点赞
        })
      }
      that.data.messageList = that.sort(that.data.messageList)
      that.setData({
        messageList: that.data.messageList
      })
    });
  },

  FrameSearch: function () {
    const that = this;
    console.log('纺机搜索')
    let param = {
      userid: wx.getStorageSync('UserInfo').userid,
      _token: wx.getStorageSync('UserInfo')._token,
      keyword: that.data.seekInp
    };
    util.FrameSearch(param, function (ret) {
      console.log('纺机贸易信息', ret)
      // that.data.messageList.push(ret.data)
      for (let i in ret.data) {
        that.data.messageList.push({
          id: ret.data[i].itemid, //信息id
          mid: 88,
          head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
          icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
          name: ret.data[i].businesscard.truename, //用户姓名
          position: ret.data[i].businesscard.career, //职位
          demand: '纺机贸易', //发布类别  ()
          mobile: ret.data[i].mobile,
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
          addtime: ret.data[i].addtime, //发布详细时间
          address: ret.data[i].address, //货物存放地
          page_view: ret.data[i].hits, //浏览量
          like: ret.data[i].agree //点赞
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

  getSystemKeyValue:function(){
    const that=this;
    util.getSystemKeyValue({
      id: 7
    }, function (ret) {
      console.log(ret)
      let arrb=[];
      if (ret.value) { arrb = ret.value.split(",")}
      that.setData({
        hot_word: arrb,
      })
    }, null)

  },

//选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that=this;
    var history = wx.getStorageSync("history") ? wx.getStorageSync("history") : [];
    that.setData({ recently_history: history })
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
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //查看详情
  see_details_click: function (e) {
    wx.navigateTo({
      url: '../particulars/particulars?id=' + e.currentTarget.dataset.id + '&mid=' + e.currentTarget.dataset.mid,
    })
  },
})