// pages/release_supply_information/release_supply_information.js
const app = getApp();

const util = require('../../utils/util.js');
var count;
var that;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: //页面内容
      {
        catid: null,
        address: null,
        content: null,
        tags: [],
        thumbs: [],

      },
    fbxy: true,

    hint_details: '请认真发布信息，发布的内容尽可能描述完整。如支数、库存数量、关键指标的信息，切勿虚报乱写加入黑名单并通报全网。',
    categories: [],
    index: '',
    lable: [],
    ImageList: [],
    gold_coin_balance: '0',
    gold_coin_pay: '1',
  },

  getEdit: function () {
    var that = this;
    //获得类别和标签
    var param = {}
    if (that.data.itemid) {
      param.itemid = that.data.itemid
    }
    util.fjmyEdit_get(param, function (ret) {
      console.log("求购编辑所需内容", ret);
      var categories = [];
      for (var i in ret.catids) {
        categories.push({
          id: ret.catids[i].catid,
          name: ret.catids[i].catname
        })
      }
      var lable = [];
      for (var i in ret.tags) {
        lable.push({
          id: ret.tags[i].tagid,
          lable_Info: ret.tags[i].tagname,
          setlableChoose: false
        })
      }

      that.setData({
        categories: categories,
        lable: lable
      })

      if (typeof (ret.item) != 'undefined') {
        that.setData({
          content: //页面内容
            {
              catid: ret.item.catid,
              address: ret.item.address,
              content: ret.item.content,
              tags: ret.item.tag.split(','),
              thumbs: ret.item.thumbs,
            }
        })
        that.sync();
      }
    }, null)

    util.getSystemKeyValue({
      id: 4
    }, function (ret) {
      that.setData({
        gold_coin_pay: ret.value,
        gold_coin_balance: app.globalData.DTuserInfo.credit
      })
    }, null)
  },


  //类别选择
  bindPickerChange: function (e) {
    var content = this.data.content;
    content.catid = this.data.categories[e.detail.value].id
    this.setData({
      index: e.detail.value,
      content: content
    })
  },
  //地址
  changeAddress: function (e) {
    var content = this.data.content;
    content.address = e.detail.value
    this.setData({
      content: content
    })
  },
  //内容
  changeContent: function (e) {
    var content = this.data.content;
    content.content = e.detail.value
    this.setData({
      content: content
    })
    console.log(content);
  },

  //标签选择
  lableClick: function (e) {
    var that = this;
    // console.log(e.currentTarget.dataset.id)
    var content = this.data.content;
    content.tags = []
    var arr = that.data.lable;
    for (var i in arr) {
      if (e.currentTarget.dataset.id == arr[i].id) {
        arr[i].setlableChoose = !arr[i].setlableChoose;
      }
      if (arr[i].setlableChoose) {
        content.tags.push(arr[i].id)
      }
    }
    that.setData({
      lable: arr,
      content: content
    })
    console.log(content, arr);
  },
  /**
   * 添加图片
   * */

  AddImgClick: function () {
    const that = this;
    var b = [];
    if (that.data.ImageList.length < 9) {
      count = 9 - that.data.ImageList.length;
      console.log('当前展示的图片数' + that.data.ImageList.length);
      console.log('还可添加的图片数' + count);
      wx.chooseImage({
        count: count, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log(res, typeof (res.tempFiles[0]));
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          for (var i in res.tempFilePaths) {
            util.uploadImage({
              file: res.tempFilePaths[i]
            }, function (ret) {
              console.log("上传成功", ret)
              that.data.ImageList.push(ret);
              that.setData({
                ImageList: that.data.ImageList
              })
            }, null);

          }

        }
      })

    }

  },
  // 图片预览
  previewImClick: function (event) {
    var that = this;
    // wx.previewImage({
    // current: '', // 当前显示图片的http链接
    // urls: [] // 需要预览的图片http链接列表
    // })
    var current = event.currentTarget.dataset.src
    var urls = that.data.ImageList;
    wx.previewImage({
      current: current,
      urls: urls // 需要预览的图片http链接列表
    })
  },
  //删除图片
  DelClick: function (e) {
    const that = this;
    var MIL = that.data.ImageList;

    MIL.splice(e.currentTarget.dataset.index, 1)

    that.setData({
      ImageList: MIL
    })

  },

  fbxyClick: function () {
    var that = this;
    that.data.fbxy = !that.data.fbxy;
    that.setData({
      fbxy: that.data.fbxy
    })
  },
  submitClick: function () {
    var that = this;
    var content = that.data.content;
    content.thumbs = ""
    for (var i in that.data.ImageList) {
      content.thumbs = content.thumbs + (that.data.ImageList[i]) + ",";
    }
    that.setData({
      content: content
    })
    if (!that.data.fbxy) {
      console.log(55555555555555555555)
      wx.showToast({
        icon: 'none',
        title: '未接受发布协议',
        duration: 1500
      })
      return
    }
    if (content.catid && content.address &&
      content.content &&
      content.tags.length > 0 &&
      content.thumbs.length > 0 &&
      that.data.gold_coin_balance >= that.data.gold_coin_pay &&
      app.globalData.DTuserInfo.groupid == '6'
      // && app.globalData.DTuserInfo.mobile
    ) {
      var param = {
        title: "供应信息",
        introduce: content.content.length > 100 ? content.content.substring(0, 100) + "……" : content.content,
        catid: content.catid,
        content: content.content,
        thumb: content.thumbs.replace(/^,+/, "").replace(/,+$/, ""),
        telephone: app.globalData.DTuserInfo.mobile ? app.globalData.DTuserInfo.mobile : "100000000",
        address: content.address,
        tag: content.tags.join(",")
      };
      if (that.data.itemid) {
        param.itemid = that.data.itemid
      }
      console.log('验证通过', param);
      util.fjmyEdit_post(param, function (ret) {
        console.log(ret);
        app.globalData.DTuserInfo.credit -= that.data.gold_coin_pay;
        wx.showToast({
          title: "已受理，3个工作日内完成审核",
          icon: "none",
          success: function () {
            setTimeout(function () {
              wx.reLaunch({
                url: "../index/index",
              })
            }, 2000)
          }
        })
      }, null)
    } else
    {
      var param = {
        catid: content.catid,
        address: content.address,
        content: content.content,
        tags: content.tags.length,
        thumbs: content.thumbs.length,
        gold_coin_balance: that.data.gold_coin_balance >= that.data.gold_coin_pay
      }
      var toast_content = {
        catid: "请选择类别",
        address: "请填写地址",
        content: "请填写内容描述",
        tags: "请选择标签",
        thumbs: "请上传图片",
        gold_coin_balance: "余额不足"
      }


      for (var i in toast_content) {
        if (!param[i]) {
          var title = toast_content[i] + '！'
          wx.showToast({
            title: title,
            icon: 'none'
          })
          return;
        }
      }
    //     console.log('aaaaa content.catid\n' + content.catid +
    //         '            && content.address\n' + content.address +
    //         '            && content.content\n' + content.content +
    //         '            && content.tags\n' + (content.tags.length > 0) +
    //         '            && content.thumbs\n' + (content.thumbs.length > 0) +
    //         '            && this.data.gold_coin_balance >= this.data.gold_coin_pay\n' + (this.data.gold_coin_balance >= this.data.gold_coin_pay) +
    //         '            && app.globalData.DTuserInfo.groupid == \'5\'' + (app.globalData.DTuserInfo.groupid == 5))
    // console.log(content);
    }
  },

  //个人信息详情
  personal_data_click: function () {
    wx.navigateTo({
      url: '../personal_data/personal_data',
    })
  },
  //我要推广
  personal_click: function () {
    wx.navigateTo({
      url: '../mine_promotion/mine_promotion',
    })
  },
  //获取金币
  acquireClick: function () {
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },
  //发布须知
  Release_notes_Click: function () {
    wx.navigateTo({
      url: '../release_notes/release_notes',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.setData({
      gold_coin_balance: app.globalData.DTuserInfo.credit
    })
    console.log('参数', options)
    if (options.itemid) {
      that.setData({
        itemid: options.itemid,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    that.getEdit();
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
  sync: function () {
    var index = 0;
    for (var i in that.data.categories) {
      if (that.data.categories[i].id == that.data.content.catid) {
        index = i
      }
    }

    var lable = that.data.lable
    for (var i in that.data.lable) {
      for (var j in that.data.content.tags) {
        if (that.data.lable[i].id == that.data.content.tags[j])
          that.data.lable[i].setlableChoose = true
      }
    }

    var ImageList = that.data.content.thumbs ? that.data.content.thumbs.replace(/^,+/, "").replace(/,+$/, "").split(',') : [];

    that.setData({
      index: index,
      lable: that.data.lable,
      ImageList: ImageList
    })

  }
})