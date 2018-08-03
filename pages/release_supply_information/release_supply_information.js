// pages/release_supply_information/release_supply_information.js
const app = getApp();

const util = require('../../utils/util.js');
let count;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content://页面内容
            {
                catid: null,
                address: null,
                content: null,
                tags: [],
                thumbs: []
            },

        hint_details: '请认真发布信息，发布的内容尽可能描述完整。如支数、库存数量、关键指标的信息，切勿虚报乱写加入黑名单并通报全网。',
        array: ['供应', '求购', '供应', '求购'],
        objectArray: [],
        index: '',

        lable: [
            {id: 0, lable_Info: '面纱', setlableChoose: false},
            {id: 1, lable_Info: '进口棉', setlableChoose: false},
            {id: 2, lable_Info: '包漂', setlableChoose: false},
            {id: 3, lable_Info: '面纱', setlableChoose: false},
            {id: 4, lable_Info: '气流纺', setlableChoose: false},
            {id: 5, lable_Info: '针织纱用', setlableChoose: false},
            {id: 6, lable_Info: '涡流纺', setlableChoose: false},
            {id: 7, lable_Info: '环锭纱', setlableChoose: false},
            {id: 8, lable_Info: '免费拿样', setlableChoose: false},
            {id: 9, lable_Info: '送货上门', setlableChoose: false},
            {id: 10, lable_Info: '面纱', setlableChoose: false},
            {id: 11, lable_Info: '进口棉', setlableChoose: false},
        ],

        MessageImgList: [],

        gold_coin_balance: '5',
        gold_coin_pay: '1',
        lable_color: '',
        lable_background: ''//#01C46C
    },

    getEdit: function () {
        var that = this
        util.sellEdit_get({}, function (ret) {
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
    },

    //类别选择
    bindPickerChange: function (e) {


        var content = this.data.content;
        content.catid = this.data.objectArray[e.detail.value].id
        this.setData({
            index: e.detail.value,
            content: content
        })

    },
    changeAddress: function (e) {

        var content = this.data.content;
        content.address = e.detail.value
        this.setData({
            content: content
        })
    },
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

    AddImgClick: function () {
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
                success: function (res) {
                    console.log(res, typeof (res.tempFiles[0]));
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    for (let i in res.tempFilePaths) {
                        util.uploadImage({
                            file: res.tempFilePaths[i]
                        }, function (ret) {
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
    previewImClick: function (event) {
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
    DelClick: function (e) {
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

    submitClick: function () {

        var content = this.data.content;
        content.thumbs = []
        for (var i in this.data.MessageImgList) {
            content.thumbs.push(this.data.MessageImgList[i].MessageImg);
        }
        this.setData({
            content: content
        })

        console.log(content);
    },

    //个人信息详情
    personal_data_click: function () {
        wx.navigateTo({
            url: '../personal_data/personal_data',
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

    }
})