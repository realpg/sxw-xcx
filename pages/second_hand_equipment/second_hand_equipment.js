// pages/release_supply_information/release_supply_information.js
const app = getApp();
const util = require('../../utils/util.js');
let count;
var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    mid: '',
    content: //页面内容
    {
      catid: null,
      address: null,
      content: null,
      tags: [],
      thumbs: []
    },

    hint_details: '请认真发布信息，发布的内容尽可能描述完整。如支数、库存数量、关键指标的信息，切勿虚报乱写加入黑名单并通报全网。',

    objectArray: [],
    index: '',

    lable: [],

    MessageImgList: [],

    gold_coin_balance: '5',
    gold_coin_pay: '1',
    lable_color: '',
    lable_background: '' //#01C46C
  },

  getEdit: function() {
    var that = this;
    //获得类别和标签
    util.fjmyEdit_get({}, function(ret) {
      console.log("求购编辑所需内容", ret);
      var objectArray = [];
      for (var i in ret.catids) {
        objectArray.push({
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
        objectArray: objectArray,
        lable: lable
      })
    }, null)

    util.getSystemKeyValue({
      id: 4
    }, function(ret) {
      that.setData({
        gold_coin_pay: ret.value,
        gold_coin_balance: app.globalData.userInfo.credit
      })
    }, null)
  },


  //类别选择
  bindPickerChange: function(e) {


    var content = this.data.content;
    content.catid = this.data.objectArray[e.detail.value].id
    this.setData({
      index: e.detail.value,
      content: content
    })
  },
  changeAddress: function(e) {

    var content = this.data.content;
    content.address = e.detail.value
    this.setData({
      content: content
    })
  },
  changeContent: function(e) {

    var content = this.data.content;
    content.content = e.detail.value
    this.setData({
      content: content
    })

    console.log(content);
  },

  //标签选择
  lableClick: function(e) {
    var that = this;
    // console.log(e.currentTarget.dataset.id)
    var content = this.data.content;
    content.tags = []

    let arr = that.data.lable;
    for (let i in arr) {
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

  AddImgClick: function() {
    const that = this;
    let b = [];

    if (that.data.MessageImgList.length < 9) {
      count = 9 - that.data.MessageImgList.length;
      console.log('当前展示的图片数' + that.data.MessageImgList.length);
      console.log('还可添加的图片数' + count);

      wx.chooseImage({
        count: count, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          console.log(res, typeof(res.tempFiles[0]));
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          for (let i in res.tempFilePaths) {
            util.uploadImage({
              file: res.tempFilePaths[i]
            }, function(ret) {
              console.log("上传成功", ret)
              that.data.MessageImgList.push(
                b = {
                  id: that.data.MessageImgList[that.data.MessageImgList.length - 1] ? that.data.MessageImgList[that.data.MessageImgList.length - 1].id + 1 : 0,
                  MessageImg: ret
                }
              );
              that.setData({
                MessageImgList: that.data.MessageImgList
              })
            }, null);

          }

        }
      })

    }

  },
  // 图片预览
  previewImClick: function(event) {
    var that = this;
    // wx.previewImage({
    // current: '', // 当前显示图片的http链接
    // urls: [] // 需要预览的图片http链接列表
    // })
    var id = event.currentTarget.dataset.id
    var getArr = that.data.MessageImgList;
    for (var i in getArr) {
      if (id == getArr[i].id) {
        // that.setData({
        // popupBc:'block',
        // showPic: getArr[i].companyProduct
        // })
        // console.log(getArr[i])
        wx.previewImage({
          // current: getArr[i].id, // 当前显示图片的http链接
          urls: [getArr[i].MessageImg] // 需要预览的图片http链接列表
        })

      }
    }
  },
  //删除图片
  DelClick: function(e) {
    const that = this;
    let MIL = that.data.MessageImgList;
    for (let i in MIL) {
      if (e.currentTarget.dataset.id == MIL[i].id) {
        MIL.splice(i, 1)
      }
    }

    that.setData({
      MessageImgList: MIL
    })

  },

  submitClick: function() {

    var that = this
    var content = that.data.content;
    content.thumbs = ""
    for (var i in that.data.MessageImgList) {
      content.thumbs = content.thumbs + (that.data.MessageImgList[i].MessageImg) + ",";
    }
    that.setData({
      content: content
    })

    if (content.catid && content.address &&
      content.content &&
      content.tags.length > 0 &&
      content.thumbs.length > 0 &&
      that.data.gold_coin_balance >= that.data.gold_coin_pay &&
      app.globalData.userInfo.groupid == '6'
      // && app.globalData.userInfo.mobile
    ) {
      var param = {
        title: "供应信息",
        introduce: content.content.length > 100 ? content.content.substring(0, 100) + "……" : content.content,
        catid: content.catid,
        content: content.content,
        thumb: content.thumbs,
        telephone: app.globalData.userInfo.mobile ? app.globalData.userInfo.mobile : "100000000",
        address: content.address,
        tag: content.tags.join(",")
      };
      console.log('验证通过', param);
      util.fjmyEdit_post(param, function(ret) {
        console.log(ret);
        app.globalData.userInfo.credit -= that.data.gold_coin_pay;
        wx.showToast({
          title: "提交成功",
          icon: "success",
          success: function() {
            setTimeout(function() {
              wx.reLaunch({
                url: "../index/index",
              })
            }, 2000)
          }
        })
      }, null)
    } else
      wx.showToast({
        title: "验证失败，请确保信息填写完整",
        icon: "none"
      })
    //     console.log('aaaaa content.catid\n' + content.catid +
    //         '            && content.address\n' + content.address +
    //         '            && content.content\n' + content.content +
    //         '            && content.tags\n' + (content.tags.length > 0) +
    //         '            && content.thumbs\n' + (content.thumbs.length > 0) +
    //         '            && this.data.gold_coin_balance >= this.data.gold_coin_pay\n' + (this.data.gold_coin_balance >= this.data.gold_coin_pay) +
    //         '            && app.globalData.userInfo.groupid == \'5\'' + (app.globalData.userInfo.groupid == 5))
    // console.log(content);

  },

  //个人信息详情
  personal_data_click: function() {
    wx.navigateTo({
      url: '../personal_data/personal_data',
    })
  },

  //获取金币
  acquireClick: function() {
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },
  //发布须知
  Release_notes_Click: function() {
    wx.navigateTo({
      url: '../release_notes/release_notes',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    console.log("opt:", options)
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    that.getEdit();

  },
  //供应信息
  sellInfoDetails: function() {

  },
  //求购信息  
  buyInfoDetails: function() {

  },
  //纺机贸易
  tradeInfoDetails: function() {

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