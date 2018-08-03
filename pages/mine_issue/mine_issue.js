// pages/mine_issue/mine_issue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    business_card: [{
      name: '董小姐',
      post: '销售总监',
      phone: '13666666666',
      company: '南通纺织银源科技有限公司',
      address: '江苏省南通市滨水路6号',
      The_main: '条干13.56,环纺普纱21,普纱28支',
      browse: '888',
      Like: '169',
      collect: '198',
      transpond: '68',
    }],
    information: [{ id: '0', lable_one: '混纺纱', lable_two: '纺织用纱', lable_three: '混纺纱', content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S', time: '2018-07-12 14:45', browse: '880', like: '68', transpond: '126' }, { id: '1', lable_one: '混纺纱', lable_two: '纺织用纱', lable_three: '混纺纱', content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S', time: '2018-07-12 14:45', browse: '880', like: '68', transpond: '126' }, { id: '2', lable_one: '混纺纱', lable_two: '纺织用纱', lable_three: '混纺纱', content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S', time: '2018-07-12 14:45', browse: '880', like: '68', transpond: '126' },]
  },
  //信息栏选择
  selectClick: function (e) {
    var that = this;
    // console.log(e)
    if (e.target.dataset.nn == 1) {
      that.setData({
        all_color: '#01C46C',
        supply_color: '#9B9B9B',
        buy_color: '#9B9B9B',
        equipment_color: '#9B9B9B',
      })
    } else if (e.target.dataset.nn == 2) {

      that.setData({
        all_color: '#9B9B9B',
        supply_color: '#01C46C',
        buy_color: '#9B9B9B',
        equipment_color: '#9B9B9B',
      })
    } else if (e.target.dataset.nn == 3) {

      that.setData({
        all_color: '#9B9B9B',
        supply_color: '#9B9B9B',
        buy_color: '#01C46C',
        equipment_color: '#9B9B9B',
      })
    } else if (e.target.dataset.nn == 4) {

      that.setData({
        all_color: '#9B9B9B',
        supply_color: '#9B9B9B',
        buy_color: '#9B9B9B',
        equipment_color: '#01C46C',
      })
    }
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