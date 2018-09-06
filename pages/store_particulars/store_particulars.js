// pages/store_particulars/store_particulars.js
const app = getApp();
const util = require('../../utils/util.js');
var that;
Page({

    /**
     * 页面的初始数据
     */
    data: {

        id: null,
        business_card: [],
        introduceShow: false,

        specific: '宁纺集团棉纺分公司，1987年新上一万枚纱锭，从而使企业结束了有织，无染，无纺的历史，形成了从纺纱、织布、染整一条龙生产格局。经过近几年的发展，目前棉纺分公司拥有细纱机53台，粗纱机11台，并条机24台，梳棉机44台，精简机10台，清',

        messageList: [],

        message: [{
            id: '0',
            head_portrait_icon: '../../images/index/head_portrait.png',
            icon_vip: '../../images/index/vip.png',
            name: '董晓珺',
            position: '销售总监',
            demand: '供应',
            company: '董南通金源纺织科技有限公司',
            lable_three: '混纺纱',
            lable_four: '纺织用纱',
            lable_five: '混纺纱',
            details: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支',
            message_Img: [{message_Image: '../../images/index/Image_details1.png'}, {message_Image: '../../images/index/Image_details2.png'}, {message_Image: '../../images/index/Image_details3.png'}],
            time: '2018-6-28 14:25',
            address: '南通、柳橙、诸暨',
            page_view: '888',
            like: '888'
        }, {
            id: '1',
            head_portrait_icon: '../../images/index/head_portrait.png',
            icon_vip: '../../images/index/vip.png',
            name: '董晓珺',
            position: '销售总监',
            demand: '供应',
            company: '董南通金源纺织科技有限公司',
            lable_three: '混纺纱',
            lable_four: '纺织用纱',
            lable_five: '混纺纱',
            details: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支',
            message_Img: [{message_Image: '../../images/index/Image_details1.png'}, {message_Image: '../../images/index/Image_details2.png'}, {message_Image: '../../images/index/Image_details3.png'}],
            time: '2018-6-28 14:25',
            address: '南通、柳橙、诸暨',
            page_view: '888',
            like: '888'
        }, {
            id: '2',
            head_portrait_icon: '../../images/index/head_portrait.png',
            icon_vip: '../../images/index/vip.png',
            name: '董晓珺',
            position: '销售总监',
            demand: '供应',
            company: '董南通金源纺织科技有限公司',
            lable_three: '混纺纱',
            lable_four: '纺织用纱',
            lable_five: '混纺纱',
            details: '精疏紧密60支,条干13.56,棉结50强力180,气流纺织21,环纺普纱28支，气流纺织21,环纺普纱28支',
            message_Img: [{message_Image: '../../images/index/Image_details1.png'}, {message_Image: '../../images/index/Image_details2.png'}, {message_Image: '../../images/index/Image_details3.png'}],
            time: '2018-6-28 14:25',
            address: '南通、柳橙、诸暨',
            page_view: '888',
            like: '888'
        },]
    },

    //用户名片
    visitingCardInfo: function () {
        var param = {
            userid: wx.getStorageSync('UserInfo').userid,
            _token: wx.getStorageSync('UserInfo')._token,
            user_id: that.data.id
        };
        util.visitingCardInfo(param, function (ret) {
            console.log('userinfo', ret)
            that.setData({
                business_card: ret
            })

            var query = wx.createSelectorQuery();
            //选择id
            query.select('.specific_css').boundingClientRect(function (rect) {
                console.log('获取高度', rect.height)

                if (rect.height >= 90) {
                    that.setData({
                        introduceShow: true,
                    })
                }

            }).exec();

        });
    },

    //供应信息
    supplyByUserid: function () {
        var conditions = JSON.stringify({key: ['userid', 'status'], value: [that.data.id, '3']});
        var param = {
            userid: wx.getStorageSync('UserInfo').userid,
            _token: wx.getStorageSync('UserInfo')._token,
            conditions: conditions
        };
        util.supplyByUserid(param, function (ret) {
            console.log('供应信息', ret)
            // that.data.messageList.push(ret.data)
            for (var i in ret.data) {
                that.data.messageList.push({
                    id: ret.data[i].itemid, //信息id
                    mid: 5,
                    head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
                    icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
                    name: ret.data[i].businesscard.truename, //用户姓名
                    position: ret.data[i].businesscard.career, //职位
                    demand: '供应', //发布类别  ()
                    mobile: ret.data[i].mobile,
                    company: ret.data[i].businesscard.company, //公司
                    lableList: ret.data[i].tags,

                    details: ret.data[i].introduce, //信息详情描述
                    message_Img: //详情图片  后续跟进
                        [{
                            message_Image: ret.data[i].thumb
                        },
                            {
                                message_Image: ret.data[i].thumb1
                            },
                            {
                                message_Image: ret.data[i].thumb2
                            }
                        ],
                    time: ret.data[i].adddate, //发布时间
                    addtime: ret.data[i].addtime, //发布详细时间
                    address: ret.data[i].address, //货物存放地
                    page_view: ret.data[i].hits, //浏览量
                    I_agree: ret.data[i].I_agree, //我点赞
                    like: ret.data[i].agree, //点赞
                })
            }
            that.data.messageList = that.sort(that.data.messageList)
            that.setData({
                messageList: that.data.messageList
            })
        });
    },

    //求购信息
    PurchaseByUserid: function () {
        var conditions = JSON.stringify({key: ['userid', 'status'], value: [that.data.id, '3']});
        var param = {
            userid: wx.getStorageSync('UserInfo').userid,
            _token: wx.getStorageSync('UserInfo')._token,
            conditions: conditions
        };
        util.PurchaseByUserid(param, function (ret) {
            console.log('求购信息', ret)
            // that.data.messageList.push(ret.data)
            for (var i in ret.data) {
                that.data.messageList.push({
                    id: ret.data[i].itemid, //信息id
                    mobile: ret.data[i].mobile,
                    mid: 6,
                    head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
                    icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
                    name: ret.data[i].businesscard.truename, //用户姓名
                    position: ret.data[i].businesscard.career, //职位
                    demand: '求购', //发布类别  ()
                    company: ret.data[i].businesscard.company, //公司
                    lableList: ret.data[i].tags,
                    details: ret.data[i].introduce, //信息详情描述
                    message_Img: //详情图片  后续跟进
                        [{
                            message_Image: ret.data[i].thumb
                        },
                            {
                                message_Image: ret.data[i].thumb1
                            },
                            {
                                message_Image: ret.data[i].thumb2
                            }
                        ],
                    time: ret.data[i].adddate, //发布时间
                    addtime: ret.data[i].addtime, //发布详细时间
                    address: ret.data[i].address, //货物存放地
                    page_view: ret.data[i].hits, //浏览量
                    I_agree: ret.data[i].I_agree, //我点赞
                    like: ret.data[i].agree //点赞
                })
            }
            that.data.messageList = that.sort(that.data.messageList)
            that.setData({
                messageList: that.data.messageList
            })
        });
    },

    //纺织贸易
    tradeByUserid: function () {
        var conditions = JSON.stringify({key: ['userid', 'status'], value: [that.data.id, '3']});
        var param = {
            userid: wx.getStorageSync('UserInfo').userid,
            _token: wx.getStorageSync('UserInfo')._token,
            conditions: conditions
        };
        util.tradeByUserid(param, function (ret) {
            console.log('纺织贸易', ret)
            for (var i in ret.data) {
                that.data.messageList.push({
                    id: ret.data[i].itemid, //信息id
                    mid: 88,
                    head_portrait_icon: ret.data[i].user.avatarUrl ? ret.data[i].user.avatarUrl : '../../images/index/head_portrait.png', //头像，后面是默认头像
                    icon_vip: ret.data[i].vip, //  0===非vip 1-3==vip  
                    name: ret.data[i].businesscard.truename, //用户姓名
                    position: ret.data[i].businesscard.career, //职位
                    demand: '纺机', //发布类别  ()
                    mobile: ret.data[i].mobile,
                    company: ret.data[i].businesscard.company, //公司
                    lableList: ret.data[i].tags,
                    details: ret.data[i].introduce, //信息详情描述
                    message_Img: //详情图片  后续跟进
                        [{
                            message_Image: ret.data[i].thumb
                        },
                            {
                                message_Image: ret.data[i].thumb1
                            },
                            {
                                message_Image: ret.data[i].thumb2
                            }
                        ],
                    time: ret.data[i].adddate, //发布时间
                    addtime: ret.data[i].addtime, //发布详细时间
                    address: ret.data[i].address, //货物存放地
                    page_view: ret.data[i].hits, //浏览量
                    I_agree: ret.data[i].I_agree, //我点赞
                    like: ret.data[i].agree //点赞
                })
            }
            that.data.messageList = that.sort(that.data.messageList)
            that.setData({
                messageList: that.data.messageList
            })

        });
    },

    //排序
    sort: function (messageALL) {
        var that = this;
        var arr = messageALL;
        console.log("排序", arr);
        for (var i = 0; i < arr.length; i++)
            for (var u = i + 1; u < arr.length; u++) {
                if (arr[i].addtime < arr[u].addtime) {
                    //如果 array[i] > <array[u] ，就声明一个缓存遍历 num 存放大的数据，然后把两个数据的下标进行更换，达到升序排序的效果。
                    var num = arr[i];
                    arr[i] = arr[u];
                    arr[u] = num;
                }
            }

        for (var i = 0; i < arr.length; i++) {
            for (var u = i + 1; u < arr.length; u++) {
                if (arr[i].icon_vip < arr[u].icon_vip) {
                    //如果 array[i] > <array[u] ，就声明一个缓存遍历 num 存放大的数据，然后把两个数据的下标进行更换，达到升序排序的效果。
                    var num = arr[i];
                    arr[i] = arr[u];
                    arr[u] = num;
                }

            }

        }

        return arr;
    },


    //查看详情
    view_details_click: function (e) {
        wx.navigateTo({
            url: '../shops_intro/shops_intro?introduce=' + e.currentTarget.dataset.introduce,
        })
    },

    //查看详情
    see_details_click: function (e) {
        wx.setStorageSync('businessCard', that.data.business_card)
        wx.navigateTo({
            url: '../particulars/particulars?id=' + e.currentTarget.dataset.id + '&mid=' + e.currentTarget.dataset.mid,
        })
    },

    //返回首页
    back_homepage_click: function () {
        wx.switchTab({
            url: '../index/index',
        })
    },

    //拨打电话
    making_call_click: function () {
        wx.makePhoneCall({
            phoneNumber: that.data.business_card.mobile //仅为示例，并非真实的电话号码
        })
    },

    //排行榜
    ranking_list_click: function () {
        wx.navigateTo({
            url: '../ranking_list/ranking_list',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;
        if (options.id) {
            that.setData({
                id: options.id
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        that.visitingCardInfo();
        that.supplyByUserid();
        that.PurchaseByUserid();
        that.tradeByUserid();
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
        return {
            title: '我分享了' + that.data.business_card.truename + '的名片',
            path: 'pages/store_particulars/store_particulars?id=' + that.data.id,
            success: function (res) {
                // 转发成功
                wx.showToast({
                    title: '分享成功',
                    duration: 1500
                })
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    setLikeClick: function (e) {

        console.log(e.currentTarget.dataset.mid, e.currentTarget.dataset.id)
        var param = {
            // userid: wx.getStorageSync('UserInfo').userid.userid,
            // _token: wx.getStorageSync('UserInfo')._token,
            item_mid: e.currentTarget.dataset.mid,
            item_id: e.currentTarget.dataset.id
        };
        util.setLike(param, function (res) {
            console.log('点击点赞', res, that.data.messageList);
            for (var i in that.data.messageList) {
                if (that.data.messageList[i].id == res.itemid && that.data.message[i].mid == e.currentTarget.dataset.mid) {
                    that.data.messageList[i].I_agree = true;
                    that.data.messageList[i].like = res.agree;
                }
            }
            that.setData({
                messageList: that.data.messageList
            })
        }, null)

    },
})