// pages/regiser/regiser.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',//手机号
    password:'',//登录密码
  },
  // 我要注册
  login:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  // 获得手机号
  getPhone:function(e){
    let that=this
    that.setData({
      phone:e.detail.value
    })
  },
  // 获得登录密码
  getPasswored:function(e){
    let that = this
    that.setData({
      password: e.detail.value
    })
  },
  // 登录
  regiser:function(){
    let that=this
    let data={
      phone: that.data.phone,
      password: that.data.password
    }
    req._post(api.login,data).then(function(res){
      console.log(res)
      wx.setStorageSync('userinfo',res.data.data )
      wx.reLaunch({
        url: '../index/index',
      })
    }).catch(function(res){
      console.log(res)
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