// pages/recharge/recharge.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount: [{ id: '0', number: '10', background: '' }, { id: '1', number: '20', background: '', color: '' }, { id: '2', number: '30', background: '', color: '' }, { id: '3', number: '50', background: '', color: '' }, { id: '4', number: '100', background: '', color: '' }, { id: '5', number: '200', background: '', color: '' }, { id: '6', number: '300', background: '', color: '' }, { id: '7', number: '500', background: '', color: '' },],

    gold: '10',

  },


  //选择金额
  selectClick: function (e) {
    var that = this;
    var newArr = that.data.amount;
    // console.log(e.currentTarget.dataset.id);
    for (var i in newArr) {
      if (newArr[i].id == e.currentTarget.dataset.id) {
        console.log(newArr[i]);
        if (newArr[i].background == '') {
          newArr[i].background = '#01C46C';
          newArr[i].color = 'white';
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
      amount: newArr
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

  }
})