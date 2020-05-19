// pages/message/message.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//消息列表
    page:1,//分页
  },
  // 跳转到消息详情
  toMessageDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../messgage-detail/messgage-detail?id=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let userinfo = wx.getStorageSync('userinfo')
    if (wx.getStorageSync('userinfo') == '') {
      // 未登录 跳转到登录页
      wx.showModal({
        title: '提示',
        content: '请先去登录或者注册',
        showCancel: false,
        success: function (res) {
          console.log(res)
          if (res.confirm) {
            // 点击了确定
            wx.reLaunch({
              url: '../regiser/regiser',
            })
          }
        }
      })
    } else {
      let data = {
        m_id: userinfo.id,
        // p:1
      }
      req._post(api.messageList, data).then(function (res) {
        console.log(res)
        that.setData({
          list: res.data.data.list
        })
      }).catch(function (res) {
        console.log(res)
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
    // let that=this
    // let data = {
    //   m_id: wx.getStorageSync('userinfo').id,
    //   p: that.data.page+1
    // }
    // req._post(api.messageList, data).then(function (res) {
    //   console.log(res)
    //   if(res.data.data.list.length!=0){
    //     let content = that.data.list.concat(res.data.data.list)
    //     that.setData({
    //       list: content,
    //       page:that.data.page+1
    //     })
    //   }
    // }).catch(function (res) {
    //   console.log(res)
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})