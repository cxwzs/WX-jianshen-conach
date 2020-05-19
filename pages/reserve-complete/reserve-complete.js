// pages/reserve-complete/reserve-complete.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    review: [], //评价图id
    review_url: [], //评价图路径
    order_id: '',//订单id
    m_id: wx.getStorageSync('userinfo').id,//用户id
  },
  // 删除图
  delIMG: function (e) {
    console.log(e)
    let that = this
    let index = e.currentTarget.dataset.index
    that.data.review.splice(index, 1)
    that.data.review_url.splice(index, 1)
    that.setData({
      review: that.data.review,
      review_url: that.data.review_url
    })
    console.log(that.data.review, '删除评价图id')
    console.log(that.data.review_url, '删除评价图路径')
  },
  // 上传图片
  scImgOne: function () {
    let that = this
    if (that.data.review.length < 4) {
      // 只能上传4张评价图
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
    } else {
      wx.showToast({
        title: '最多上传4张评价图哦！',
        icon: 'none'
      })
    }
  },
  // 图片本地路径
  chooseWxImage: function (type) {
    var that = this;
    var imgsPaths = that.data.imgOneUrl;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      count: 4,
      success: function (res) {
        console.log(res)
        console.log(res.tempFilePaths);
        that.upImgs(res.tempFilePaths, 0) //调用上传方法
      }
    })
  },
  //上传服务器
  upImgs: function (imgurl, index) {
    var that = this;
    wx.showLoading({
      title: '上传中',
    })
    console.log(imgurl)
    for (let i = 0; i < imgurl.length + 1; i++) {
      // 数组长度+1 是为了多循环一次 关闭加载动画
      console.log('上传图片')
      if (i < imgurl.length) {
        wx.uploadFile({
          url: getApp().dizhitou + 'System/upload',
          filePath: imgurl[i],
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
            let ids = that.data.review.concat(data.data.list[0].id)
            let urls = that.data.review_url.concat(data.data.list[0].abs_url)
            that.setData({
              review: ids,
              review_url: urls
            })
            console.log(that.data.review, '上传图片id')
            console.log(that.data.review_url, '上传图片路径')
          }
        })
      } else {
        console.log('上传图片完毕')
        // 当 i 不小于 图片数组长度的时候 说明上传完毕 关闭加载动画
        wx.hideLoading()
      }
    }
  },
  // 保存 按钮
  baocun:function(){
    let that=this
    let data={
      pictures: JSON.stringify(that.data.review_url),
      m_id: wx.getStorageSync('userinfo').id,
      order_id: that.data.order_id
    }
    wx.showModal({
      title: '提示',
      content: '确定完成当前预约吗',
      success:function(res){
        console.log(res)
        if (res.confirm){
          // 点击了确定
          // 完成预约
          req._post(api.appointmentComplete, data).then(function (res) {
            console.log(res)
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1500,
              success: function (res) {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1500)
              }
            })
          }).catch(function (res) {
            console.log(res)
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this
    that.setData({
      order_id: options.order_id
    })
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