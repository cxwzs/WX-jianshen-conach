// pages/mine/mine.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head_portrait:'',//头像
    name:'',//姓名
    prize:[],//获得奖项
    label_name:'',//标签
  },
  // 跳转到钱包
  toCollection:function(){
    wx.navigateTo({
      url: '../mine-wallet/mine-wallet',
    })
  },
  // 跳转到个人中心
  toUser:function(){
    wx.navigateTo({
      url: '../userinfo/userinfo',
    })
  },
  // 跳转到 站内消息
  toMessage: function () {
    wx.navigateTo({
      url: '../message/message',
    })
  },
  // 跳转到 我的评价
  toEvaluate:function(){
    wx.navigateTo({
      url: '../mine-evaluate/mine-evaluate',
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
      // 已登录
      let data = {
        m_id: userinfo.id
      }
      // 获取个人资料
      req._post(api.my, data).then(function (res) {
        console.log(res)
        that.setData({
          head_portrait: res.data.data.head_portrait,//头像
          name: res.data.data.name,//姓名
          prize: res.data.data.prize,
          label_name: res.data.data.label_name
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})