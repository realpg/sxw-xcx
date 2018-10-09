// pages/recharge/recharge.js
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount:[],
    pergold: 1,
    perprice: 1.0,
    zsgold: '0',
    pay_amount: "0"
  },


  //选择金额
  selectClick: function (e) {
    var that = this;
    var newArr = that.data.amount;
    var zsgold = 0;
    var buy_golds = '';
    var pay_amount = 0;
    // console.log(e.currentTarget.dataset.id);
    for (var i in newArr) {
      if (newArr[i].id == e.currentTarget.dataset.id) {
        console.log(newArr[i]);
        if (newArr[i].background == '') {
          newArr[i].background = '#01C46C';
          newArr[i].color = 'white';
          zsgold = newArr[i].zsgold;
          buy_golds = newArr[i].num;
          pay_amount = that.getPayAmount(buy_golds);
        } else {
          newArr[i].background = '';
          newArr[i].color = 'black';
        }
      } else {
        newArr[i].background = '';
        newArr[i].color = 'black';
      }
    }
    that.setData({
      amount: newArr,
      zsgold: zsgold,
      buy_golds: buy_golds,
      pay_amount,
      pay_amount
    })
    // if (e.currentTarget.dataset.id == 1 ) {
    //   that.setData({

    //   })
    // }else{

    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.getpointprice();
    that.getpointtype();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  getpointtype() {
    wx.login({
      success: function (res) {
        console.log(res.code)
        //发送请求
        app.util.request({
          url: 'entry/wxapp/pointtype', //接口地址
          data: {
            m: "jf_aa",
          },
          success: function (res) {
            console.log(res.data.message, res)
            var amount = [];
            for (var i in res.data.data.data) {
              var t = res.data.data.data[i];
              // console.log(''t)/
              amount.push({
                id: t.id,
                num: t.mpoint,
                background: '',
                zsgold: t.record
              })
              console.log("买" + t.mpoint + "赠" + t.record)
            }
            that.setData({
              amount: amount
            })
          }
        })
      }
    })
  },
  getpointprice: function () {
    //发送请求
    app.util.request({
      url: 'entry/wxapp/pointprice', //接口地址
      data: {
        m: "jf_aa",
      },
      success: function (res) {
        console.log(res.data.message, res)
        console.log(res.data.data.point + "金币" + res.data.data.price + "元")
        that.setData({
          unit_id: res.data.data.unit_id,
          pergold: res.data.data.point,
          perprice: res.data.data.price,
        })
      }
    })
  },
  /**
   * 测试支付购买积分
   */
  getJf(result) {
    var app = getApp();
    app.util.request({
      url: 'entry/wxapp/pay', //调用wxapp.php中的doPagePay方法获取支付参数
      // method:'post',
      data: {
        //     orderid: options.orderid,
        m: "jf_aa",
        unit_id: 1,
        mpoint: that.data.buy_golds
      },
      'cachetime': '0',
      success(res) {
        console.log(res.data.message, res);
        if (res.data && res.data.data && !res.data.errno) {
          //发起支付
          wx.requestPayment({
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': 'MD5',
            'paySign': res.data.data.paySign,
            'success': function (res) {
              //执行支付成功提示
              console.log('支付成功');
              wx.showModal({
                title: '支付成功',
                content: '购买的金币将于三分钟内到账',
                showCancel: false,
                confirmText: "确认",
                success(res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                }
              })
            },
            'fail': function (res) {
              wx.showToast({
                title: '支付失败',
              })
              backApp()
              
            }
          })
        }
      },
      fail(res) {
        wx.showModal({
          title: '系统提示',
          content: res.data.message ? res.data.message : '错误',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              backApp()
            }
          }
        })
      }
    })
  },
  changeinput: function (e) {
    console.log("e", e, e.detail.value)
    var buy_golds = e.detail.value
    var pay_amount = that.getPayAmount(buy_golds)
    var num = 0;
    var zsgold = 0;
    for (var i in that.data.amount) {
      var level = that.data.amount[i];
      if (buy_golds >= parseInt(level.num) && num < parseInt(level.num)) {
        num = level.num;
        zsgold = level.zsgold;
        console.log("到达档次", num, "赠送", zsgold)
      }
    }
    that.setData({
      buy_golds: buy_golds,
      pay_amount: pay_amount,
      zsgold: zsgold
    })

  },
  getPayAmount(gold) {
    return gold / that.data.pergold * that.data.perprice
  }

})