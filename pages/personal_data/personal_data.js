// pages/personal_data/personal_data.js
const app = getApp();
const util = require('../../utils/util.js');

let count;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        MessageImgList: [],
        MessageImgList_one: [],
        MessageImgList_three: [],
        bussinesscard: {
            truename: "name",
            mobile: "123456",
            company: "company",
            career: "career",
            address: "",
            bussiness:"aabbc",
            introduce:"简介"
        }
    },

    //地图位置选择
    addressClick: function () {
        const that = this;
        wx.chooseLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success: function (res) {
                console.log(res)
                var name = res.name
                var address = res.address
                var latitude = res.latitude
                var longitude = res.longitude
                that.data.bussinesscard.address = address
                that.setData({
                    bussinesscard: bussinesscard,
                })
            }
        })
    },
    //上传头像

    AddImgClick_one: function () {
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
    }
    ,
    // 图片预览
    previewImClick_one: function (event) {
        var that = this;
        // wx.previewImage({
        // current: '', // 当前显示图片的http链接
        // urls: [] // 需要预览的图片http链接列表
        // })
        var id = event.currentTarget.dataset.id
        var getArr = that.data.MessageImgList_one;
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
    }
    ,
    //删除图片
    DelClick_one: function (e) {
        const that = this;
        let MIL = that.data.MessageImgList_one;
        for (let i in MIL) {
            if (e.currentTarget.dataset.id == MIL[i].id) {
                MIL.splice(i, 1)
            }
        }

        that.setData({
            MessageImgList_one: MIL
        })

    }
    ,


    //添加图片
    AddImgClick_two: function () {
        const that = this;
        let b = [];

        if (that.data.MessageImgList.length < 6) {
            count = 6 - that.data.MessageImgList.length;
            console.log('当前展示的图片数' + that.data.MessageImgList.length);
            console.log('还可添加的图片数' + count);

            wx.chooseImage({
                count: count, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    for (let i in res.tempFilePaths) {
                        that.data.MessageImgList.push(
                            b = {
                                id: that.data.MessageImgList[that.data.MessageImgList.length - 1] ? that.data.MessageImgList[that.data.MessageImgList.length - 1].id + 1 : 0,
                                MessageImg: res.tempFilePaths[i]
                            }
                        );
                    }
                    that.setData({
                        MessageImgList: that.data.MessageImgList
                    })
                }
            })

            wx.previewImage({
                current: '', // 当前显示图片的http链接
                urls: []// 需要预览的图片http链接列表
            })

        }

    }
    ,
    // 图片预览
    previewImClick_two: function (event) {
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
    }
    ,
    //删除图片
    DelClick_two: function (e) {
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

    }
    ,

    //上传二维码

    AddImgClick_three: function () {
        const that = this;
        let b = [];

        if (that.data.MessageImgList_three.length < 3) {
            count = 3 - that.data.MessageImgList_three.length;
            console.log('当前展示的图片数' + that.data.MessageImgList_three.length);
            console.log('还可添加的图片数' + count);

            wx.chooseImage({
                count: count, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    for (let i in res.tempFilePaths) {
                        that.data.MessageImgList_three.push(
                            b = {
                                id: that.data.MessageImgList_three[that.data.MessageImgList_three.length - 1] ? that.data.MessageImgList_three[that.data.MessageImgList_three.length - 1].id + 1 : 0,
                                MessageImg: res.tempFilePaths[i]
                            }
                        );
                    }
                    that.setData({
                        MessageImgList_three: that.data.MessageImgList_three
                    })
                }
            })

            wx.previewImage({
                current: '', // 当前显示图片的http链接
                urls: []// 需要预览的图片http链接列表
            })

        }

    }
    ,
    // 图片预览
    previewImClick_three: function (event) {
        var that = this;
        // wx.previewImage({
        // current: '', // 当前显示图片的http链接
        // urls: [] // 需要预览的图片http链接列表
        // })
        var id = event.currentTarget.dataset.id
        var getArr = that.data.MessageImgList_three;
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
    }
    ,
    //删除图片
    DelClick_three: function (e) {
        const that = this;
        let MIL = that.data.MessageImgList_three;
        for (let i in MIL) {
            if (e.currentTarget.dataset.id == MIL[i].id) {
                MIL.splice(i, 1)
            }
        }

        that.setData({
            MessageImgList_three: MIL
        })

    }
    ,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    }
    ,

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    }
    ,

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    }
    ,

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
    ,

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})