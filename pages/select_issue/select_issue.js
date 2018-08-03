// pages/select_issue/select_issue.js
const app = getApp()
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
      selectImg:'../../images/personal_center/btn_yuangou_pre.png',
      The_main: '条干13.56,环纺普纱21,普纱28支',
    }],

    select_Info: [{ id: 0, type: '供应', selectImg: '../../images/personal_center/btn_yuangou_pre.png', content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S', time: '2018-07-12 14:45', }, { id: 1, type: '求购', selectImg: '../../images/personal_center/btn_yuangou_pre.png', content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S', time: '2018-07-12 14:45', }, { id: 2, type: '供应', selectImg: '../../images/personal_center/btn_yuangou_pre.png', content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S', time: '2018-07-12 14:45', }, { id: 3, type: '设备', selectImg: '../../images/personal_center/btn_yuangou_pre.png', content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S', time: '2018-07-12 14:45', }, { id: 4, type: '设备', selectImg: '../../images/personal_center/btn_yuangou_pre.png', content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S', time: '2018-07-12 14:45', }, { id: 5, type: '供应', selectImg: '../../images/personal_center/btn_yuangou_pre.png', content: '精疏紧密60支，条干13支，56棉结50强力180，气流纺织21、环纺普纱21支，竹纤维21-60S、竹棉炭32-40S', time: '2018-07-12 14:45', },]
  },

//发布名片
  select_card_Click:function(){
    var that = this;
    var newArr = that.data.business_card;
    var newArr1 = that.data.select_Info;
    if (newArr[0].selectImg == '../../images/personal_center/btn_yuangou_pre.png'){
      newArr[0].selectImg = '../../images/personal_center/btn_yuangou.png';
      for (var i in newArr1) {
        newArr1[i].selectImg = '../../images/personal_center/btn_yuangou_pre.png';
      }
    }else{
      newArr[0].selectImg = '../../images/personal_center/btn_yuangou_pre.png'
    }
    that.setData({
      business_card: newArr,
      select_Info: newArr1,
    })
  },


//选择发布
  selectClick: function (e) {
    var that = this;
    var newArr = that.data.select_Info;
    var newArr1 = that.data.business_card;
    for (var i in newArr) {
      if (newArr[i].id == e.currentTarget.dataset.id) {
        console.log(newArr[i]);
        if (newArr[i].selectImg == '../../images/personal_center/btn_yuangou_pre.png') {
          newArr[i].selectImg ='../../images/personal_center/btn_yuangou.png'
          
        } else {
          newArr[i].selectImg = '../../images/personal_center/btn_yuangou_pre.png'
        }
      } else {
        newArr[i].selectImg = '../../images/personal_center/btn_yuangou_pre.png'
        newArr1[0].selectImg = '../../images/personal_center/btn_yuangou_pre.png'
      }
   }
    that.setData({
      select_Info: newArr,
      business_card: newArr1,
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