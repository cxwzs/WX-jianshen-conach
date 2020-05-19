// pages/youxiaozhengjian/youxiaozhengjian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgOneId: '',//身份证正面照id
    imgOneUrl: '',//身份证正面照
    imgTwoId: '',//身份证反面照id
    imgTwoUrl: '',//身份证反面照
    imgThreeId: '',//手持身份证照id
    imgThreeUrl: '',//手持身份证照
  },
  //上传身份证正面照
  scImgOne: function () {
    let that = this
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function (res) {
        console.log(res)
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  // 图片本地路径
  chooseWxImage: function (type) {
    var that = this;
    var imgsPaths = that.data.imgOneUrl;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      count:1,
      sourceType: [type],
      success: function (res) {
        console.log(res.tempFilePaths[0]);
        that.upImgs(res.tempFilePaths[0], 0) //调用上传方法
      }
    })
  },
  //上传服务器
  upImgs: function (imgurl, index) {
    var that = this;
    wx.uploadFile({
      url: getApp().dizhitou + 'System/upload',
      filePath: imgurl,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: {
        folder: '1'
      },
      success: function (res) {
        console.log(res) //接口返回网络路径
        var data = JSON.parse(res.data)
        console.log(data)
        that.setData({
          imgOneUrl: data.data.list[0].abs_url,
          imgOneId: data.data.list[0].id
        })
        console.log(that.data.imgOneUrl)
      }
    })
  },

  //上传身份证反面照
  scImgTwo: function () {
    let that = this
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function (res) {
        console.log(res)
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImageTwo('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImageTwo('camera')
          }
        }
      }
    })
  },
  // 图片本地路径
  chooseWxImageTwo: function (type) {
    var that = this;
    var imgsPaths = that.data.imgTwoUrl;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      count: 1,
      sourceType: [type],
      success: function (res) {
        console.log(res)
        console.log(res.tempFilePaths[0]);
        that.upImgsTwo(res.tempFilePaths[0], 0) //调用上传方法
      }
    })
  },
  //上传服务器
  upImgsTwo: function (imgurl, index) {
    var that = this;
    wx.uploadFile({
      url: getApp().dizhitou + 'System/upload',
      filePath: imgurl,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: {
        folder: '1'
      },
      success: function (res) {
        console.log(res) //接口返回网络路径
        var data = JSON.parse(res.data)
        console.log(data)
        that.setData({
          imgTwoUrl: data.data.list[0].abs_url,
          imgTwoId: data.data.list[0].id
        })
        console.log(that.data.imgTwoUrl)
      }
    })
  },

  //上传手持身份证照
  scImgThree: function () {
    let that = this
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function (res) {
        console.log(res)
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImageThree('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImageThree('camera')
          }
        }
      }
    })
  },
  // 图片本地路径
  chooseWxImageThree: function (type) {
    var that = this;
    var imgsPaths = that.data.imgTwoUrl;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      count: 1,
      sourceType: [type],
      success: function (res) {
        console.log(res)
        console.log(res.tempFilePaths[0]);
        that.upImgsThree(res.tempFilePaths[0], 0) //调用上传方法
      }
    })
  },
  //上传服务器
  upImgsThree: function (imgurl, index) {
    var that = this;
    wx.uploadFile({
      url: getApp().dizhitou + 'System/upload',
      filePath: imgurl,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: {
        folder: '1'
      },
      success: function (res) {
        console.log(res) //接口返回网络路径
        var data = JSON.parse(res.data)
        console.log(data)
        that.setData({
          imgThreeUrl: data.data.list[0].abs_url,
          imgThreeId: data.data.list[0].id
        })
        console.log(that.data.imgThreeUrl)
      }
    })
  },

  // 确定上传
  queding: function () {
    let that = this
    let pages = getCurrentPages(); // 获取页面栈
    let prevPage = pages[pages.length - 2]; // 上一个页面
    if (that.data.imgOneId != '' && that.data.imgTwoId != '' && that.data.imgThreeId!='') {
      prevPage.setData({
        card_just: that.data.imgOneUrl,
        card_back: that.data.imgTwoUrl,
        card_hand: that.data.imgThreeUrl
      })
      wx.navigateBack({
        delta: 1
      })
    } else {
      if (that.data.imgOneId == '') {
        wx.showToast({
          title: '未上传正面身份证照',
          icon: 'none'
        })
      } else if (that.data.imgTwoId == '') {
        wx.showToast({
          title: '未上传反面身份证照',
          icon: 'none'
        })
      } else if (that.data.imgThreeId==''){
        wx.showToast({
          title: '未上传手持身份证照',
          icon: 'none'
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this
    if(JSON.stringify(options)!='{}'){
      that.setData({
        imgOneUrl: options.imgOneUrl,//身份证正面照
        imgTwoUrl: options.imgTwoUrl,//身份证反面照
        imgThreeUrl: options.imgThreeUrl,//手持身份证照
      })
    }
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