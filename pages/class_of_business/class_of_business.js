// pages/class_of_business/class_of_business.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { id: 1, value: '棉花', name: '棉花', checked:false},
      { id: 2, value: '纱线', name: '纱线', checked: true},
      { id: 3, value: '化纤', name: '化纤', checked: ''},
      { id: 4, value: '胚布', name: '胚布', checked: ''},
      { id: 5, value: '面料', name: '面料', checked: ''},
      { id: 6, value: '辅料', name: '辅料', checked: ''},
      { id: 7, value: '服装', name: '服装', checked: ''},
      { id: 8, value: '机配件', name: '机配件', checked: ''}
    ],
    
    ids:[]
  },

  checkboxChange: function(e) {
    // console.log("111111111",e.detail.value)
    var checked = e.detail.value;
    for (var i in this.data.items){
      this.data.items[i].checked = (checked.indexOf(i) >= 0)  
    }
    this.setData({
      items: this.data.items
    })
  },

  submitClick: function () {
    const that = this;
    var pages=getCurrentPages();
    var prepage=pages[pages.length-2];
    var bussinesscard = prepage.data.bussinesscard;
    var checked=[];
    for (var i in this.data.items){
      if(this.data.items[i].checked)
        checked.push(this.data.items[i])
    }
    bussinesscard.value_prompt = checked//改成获取到的数组
    prepage.setData({
      bussinesscard: bussinesscard
    })
    wx.navigateBack({
      delta: 1
    })
  },
  setCheck:function(){
    var ids = this.data.ids;
    for (var i in this.data.items) {
      this.data.items[i].checked = (ids.indexOf(this.data.items[i].id) >= 0)
    }
    this.setData({
      items: this.data.items
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var arr = JSON.parse(options.value_prompt)
    var ids=[]
    
    for (var i in arr){
      ids.push(arr[i].id)
    }
    this.setData({
      ids: ids
    })

    this.setCheck()
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