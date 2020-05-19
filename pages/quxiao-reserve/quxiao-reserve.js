// pages/quxiao-reserve/quxiao-reserve.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: '',//订单id
    m_id: wx.getStorageSync('userinfo').id,//用户id
    appointment_reason:'',//取消原因
  },
  // 获取 取消原因
  getContent:function(e){
    let that=this
    that.setData({
      appointment_reason:e.detail.value
    })
  },
  // 确定 按钮
  queding:function(){
    let that=this
    let data={
      m_id: wx.getStorageSync('userinfo').id,
      order_id: that.data.order_id,
      appointment_reason: that.data.appointment_reason
    }
    wx.showModal({
      title: '提示',
      content: '确定取消当前预约吗',
      success:function(res){
        console.log(res)
        if (res.confirm){
          // 点击了确定
          // 取消预约
          req._post(api.appointmentCancel, data).then(function (res) {
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