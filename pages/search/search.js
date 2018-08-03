// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  array: ['全部', '供应', '求购', '设备'],
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
    index: 1,

    recently_history: [{ id: 0, record: '环锭纺' }, { id: 1, record: '赛格纺' }, { id: 2, record: '包芯纺' },],

    hot_word: [{ id: 0, word: '环锭纺热销' }, { id: 1, word: '环锭纺热销' }, { id: 2, word: '环锭纺热销' }, { id: 3, word: '环锭纺热销' }, { id: 4, word: '环锭纺热销热销' }, { id: 5, word: '环锭纺热销' }, { id: 6, word: '环锭销' }, { id: 7, word: '环锭纺热销' }, { id: 8, word: '环锭纺热销' },],


    lable: [{ id: '0', lable_Info: '面纱' }, {
      id: '1', lable_Info: '进口棉'
    }, { id: '2', lable_Info: '包漂' }, { id: '3', lable_Info: '面纱' }, { id: '4', lable_Info: '气流纺' }, { id: '5', lable_Info: '针织纱用' }, {
      id: '6', lable_Info: '涡流纺'
    }, { id: '7', lable_Info: '环锭纱' }, { id: '8', lable_Info: '免费拿样' }, { id: '9', lable_Info: '送货上门古' }, { id: '10', lable_Info: '面纱' }, {
      id: '11', lable_Info: '进口棉'
    },],
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