// pages/personal_data/personal_data.js
const app = getApp();
const util = require('../../utils/util.js');
var that

let count;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sending_cd: 0,

    thumb: [], //公司图片
    avatar: [], //头像
    wxqr: [], //二维码
    businesscard: {
      truename: "",
      mobile: "",
      company: "",
      career: "",
      ywlb: [],
      address: "",
      business: "",
      introduce: ""
    },
    verification_code: false
  },


  //业务类别
  promptClick: function() {
    wx.navigateTo({
      url: '../class_of_business/class_of_business?ywlb=' +
        JSON.stringify(that.data.businesscard.ywlb) +
        "&ywlbs=" + JSON.stringify(that.data.ywlbs),
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //地图位置选择
  addressClick: function() {
    wx.chooseLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        console.log(res)
        var name = res.name
        var address = res.address
        var latitude = res.latitude
        var longitude = res.longitude
        that.data.businesscard.address = address
        that.setData({
          businesscard: that.data.businesscard
        })
      }
    })
  },
  //上传头像

  AddImgClick_one: function() {
    let b = [];
    if (that.data.avatar.length < 1) {
      count = 1 - that.data.avatar.length;
      console.log('当前展示的图片数' + that.data.avatar.length);
      console.log('还可添加的图片数' + count);

      wx.chooseImage({
        count: count, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          console.log(res, typeof(res.tempFiles[0]));

          const src = res.tempFilePaths[0]

          wx.navigateTo({
            url: `../upload/upload?src=${src}`
          })
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          // for (let i in res.tempFilePaths) {
          //   util.uploadImage({
          //     file: res.tempFilePaths[i]
          //   }, function(ret) {
          //     console.log("上传成功", ret)
          //     that.data.avatar.push(
          //       ret
          //     );
          //     that.setData({
          //       avatar: that.data.avatar
          //     })
          //   }, null);
          // }

        }
      })

    }
  },
  // 图片预览
  previewImClick_one: function(event) {

    // wx.previewImage({
    // current: '', // 当前显示图片的http链接
    // urls: [] // 需要预览的图片http链接列表
    // })
    var id = event.currentTarget.dataset.id
    var getArr = that.data.avatar;
    for (var i in getArr) {
      if (id == getArr[i].id) {
        // that.setData({
        // popupBc:'block',
        // showPic: getArr[i].companyProduct
        // })
        // console.log(getArr[i])
        wx.previewImage({
          // current: getArr[i].id, // 当前显示图片的http链接
          urls: [getArr[i]] // 需要预览的图片http链接列表
        })

      }
    }
  },
  //删除图片
  DelClick_one: function(e) {
    let MIL = that.data.avatar;
    for (let i in MIL) {
      if (e.currentTarget.dataset.id == MIL[i].id) {
        MIL.splice(i, 1)
      }
    }
    that.setData({
      avatar: MIL
    })

  },


  //添加图片
  AddImgClick_two: function() {
    let b = [];

    if (that.data.thumb.length < 6) {
      count = 6 - that.data.thumb.length;
      console.log('当前展示的图片数' + that.data.thumb.length);
      console.log('还可添加的图片数' + count);

      wx.chooseImage({
        count: count, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          for (let i in res.tempFilePaths) {
            util.uploadImage({
              file: res.tempFilePaths[i]
            }, function(ret) {
              console.log("上传成功", ret)
              that.data.thumb.push(
                ret
              );
              that.setData({
                thumb: that.data.thumb
              })
            }, null);
          }

        }
      })
    }

  },
  // 图片预览
  previewImClick_two: function(e) {

    // wx.previewImage({
    // current: '', // 当前显示图片的http链接
    // urls: [] // 需要预览的图片http链接列表
    // })
    var index = e.currentTarget.dataset.id
    var getArr = that.data.thumb;
    wx.previewImage({
      // current: getArr[i].id, // 当前显示图片的http链接
      urls: [getArr[index]] // 需要预览的图片http链接列表
    })
  },
  //删除图片
  DelClick_two: function(e) {
    var index = e.currentTarget.dataset.id
    let MIL = that.data.thumb;
    MIL.splice(index, 1)


    that.setData({
      thumb: MIL
    })

  },

  //上传二维码

  AddImgClick_three: function() {
    let b = [];

    if (that.data.wxqr.length < 1) {
      count = 1 - that.data.wxqr.length;
      console.log('当前展示的图片数' + that.data.wxqr.length);
      console.log('还可添加的图片数' + count);

      wx.chooseImage({
        count: count, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          for (let i in res.tempFilePaths) {
            util.uploadImage({
              file: res.tempFilePaths[i]
            }, function(ret) {
              console.log("上传成功", ret)
              that.data.wxqr.push(
                ret
              );
              that.setData({
                wxqr: that.data.wxqr
              })
            }, null);
          }

        }
      })

      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: [] // 需要预览的图片http链接列表
      })

    }

  },
  // 图片预览
  previewImClick_three: function(event) {

    // wx.previewImage({
    // current: '', // 当前显示图片的http链接
    // urls: [] // 需要预览的图片http链接列表
    // })
    var id = event.currentTarget.dataset.id
    var getArr = that.data.wxqr;
    for (var i in getArr) {
      if (id == getArr[i].id) {
        // that.setData({
        // popupBc:'block',
        // showPic: getArr[i].companyProduct
        // })
        // console.log(getArr[i])
        wx.previewImage({
          // current: getArr[i].id, // 当前显示图片的http链接
          urls: [getArr[i]] // 需要预览的图片http链接列表
        })

      }
    }
  },
  //删除图片
  DelClick_three: function(e) {
    let MIL = that.data.wxqr;
    for (let i in MIL) {
      if (e.currentTarget.dataset.id == MIL[i].id) {
        MIL.splice(i, 1)
      }
    }

    that.setData({
      wxqr: MIL
    })

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
    that.getBusinessCard()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    // that.setData({
    // ywlb: wx.getStorageSync('ClassSer')
    // })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getBusinessCard: function() {
    console.log("请求名片中")
    util.editInfo_get({}, function(ret) {

      console.log("请求成功", ret, that.data)
      that.setData({

        avatar: app.globalData.DTuserInfo.avatarUrl ? [app.globalData.DTuserInfo.avatarUrl] : [], //头像
        ywlbs: ret.ywlb
      })
      if (ret.businesscard) {
        that.setData({
          businesscard: ret.businesscard,
          mobile: ret.businesscard.mobile,
          thumb: ret.businesscard.thumb ? ret.businesscard.thumb.split(',') : [], //公司图片
          wxqr: ret.businesscard.wxqr ? [ret.businesscard.wxqr] : [],
        })
      }
      console.log("业务类别", that.data.businesscard, that.data.businesscard.ywlb)
    })
  },

  //发布
  submitClick: function(e) {
    var ywlb_ids = []
    for (var i in that.data.businesscard.ywlb) {
      ywlb_ids.push(that.data.businesscard.ywlb[i].ywlb_id);
    }
    var param = {
      company: that.data.businesscard.company,
      career: that.data.businesscard.career,
      address: that.data.businesscard.address,
      introduce: that.data.businesscard.introduce,
      business: that.data.businesscard.business,
      mobile: that.data.businesscard.mobile,
      vertify_code: that.data.businesscard.vertify_code,
      truename: that.data.businesscard.truename,
      ywlb_ids: ywlb_ids.join(','),
      thumb: that.data.thumb.join(','),
      avatarUrl: that.data.avatar[0],
      wxqr: that.data.wxqr[0]
    }
    var toast_content={
      company: "公司名称",
      career: "职位",
      address: "详细地址",
      introduce: "公司简介",
      business: "主营产品",
      mobile: "手机",
      truename: "姓名",
      ywlb_ids: "业务类别",
      thumb: "公司照片",
      avatarUrl: "头像",
    }
    if (that.data.verification_code){
      toast_content.vertify_code="验证码"
    }

    for (var i in toast_content){
      if(!param[i]){
        var title = '请填写'+toast_content[i]+'！'
        wx.showToast({
          title: title,
          icon: 'none'
        })
        return;
      }
    }
    
    var name_bytes = util.get_string_bytes(param.truename);
    if (name_bytes>12){
      wx.showToast({
        title: "姓名长度在12字节以内！",
        icon: 'none'
      })
      return;
    }


    util.editInfo_post(param, function(ret) {
      console.log(ret);
      app.globalData.DTuserInfo.credit -= that.data.gold_coin_pay;
      wx.showToast({
        title: "已受理，3个工作日内完成审核",
        icon: "none",
        success: function() {
          app.globalData.DTuserInfo.updating=true;
          setTimeout(function() {
          wx.navigateBack()
          }, 2000)
        }
      })
    }, null)
  },

  changeBusinesscard: function(e) {
    console.log(11111, e.detail.value)
    var key = e.currentTarget.dataset.key;
    var value = e.detail.value;
    that.data.businesscard[key] = value;
    that.setData({
      businesscard: that.data.businesscard,
    })
    console.log(2222, that.data.businesscard)
  },

  changeMobile: function(e) {
    
    var verification_code = that.data.verification_code
    if (e.detail.value != that.data.mobile && util.phonenum_verify(e.detail.value)) {
      verification_code = true
    } else {
      verification_code = false
    }
    that.setData({
      verification_code: verification_code
    })
  },

  // >>获取验证码
  getVerificationCode: function() {

    if (!util.phonenum_verify(that.data.businesscard.mobile)) {
      wx.showToast({
        title: "请输入正确的手机号",
        icon: "none",
      })
    } else {
      wx.showLoading({
        title: '发送中',
        mask:true
      })
      util.sendVertifyCode({
        phonenum: that.data.businesscard.mobile
      }, function(ret) {
        console.log("发送读秒")
        wx.hideLoading()
        var num = 61;
        var timer = setInterval(function() {
          num--;
          if (num <= 0) {
            clearInterval(timer);
            that.setData({
              sending_cd: num
            })

          } else {
            that.setData({
              sending_cd: num
            })
          }
        }, 1000)
        console.log(888, ret);
        wx.showToast({
          title: "发送成功",
          icon: "success",
        })
      }, null)

      // util.sendVertifyCode({
      //   phonenum: that.data.businesscard.mobile
      // }, function (ret) {



      //   console.log(888, ret);
      //   wx.showToast({
      //     title: "发送成功",
      //     icon: "success",
      //   })
      // }, null)
    }
  },
  onPullDownRefresh: function() {
    console.log('下拉刷新')
      wx.stopPullDownRefresh();
    // that.setData({
    //   avatar: app.globalData.DTuserInfo.avatarUrl ? [app.globalData.DTuserInfo.avatarUrl] : []
    // })
  },
})