// pages/reserve-detail/reserve-detail.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: '',//订单id
    m_id: wx.getStorageSync('userinfo').id,//用户id
    details: '',//订单详情
  },
  // 取消预约
  qxReserve:function(){
    let that=this
    wx.navigateTo({
      url: '../quxiao-reserve/quxiao-reserve?order_id=' + that.data.order_id,
    })
  },
  // 预约完成
  complete:function(){
    let that = this
    wx.navigateTo({
      url: '../reserve-complete/reserve-complete?order_id=' + that.data.order_id,
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
    let that=this
    let data = {
      order_id: that.data.order_id
    }
    req._post(api.orderDetail, data).then(function (res) {
      console.log(res)
      that.setData({
        details: res.data.data
      })
    }).catch(function (res) {
      console.log(res)
    })
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