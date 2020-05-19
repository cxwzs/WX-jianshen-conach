// pages/login/login.js

import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeIF:false,//是否启动了倒计时
    timer:'',//定时器
    timeNum:60,//倒计时 时间
    account:'',//手机号
    verifyUSER:'',//用户输入的验证码
    password:'',//密码
    passwordQR:'',//确认密码
  },
  // 获得用户输入输入的确认密码
  getPasswordQR:function(e){
    let that = this
    that.setData({
      passwordQR: e.detail.value
    })
  },
  // 获得用户输入的密码
  getPassword:function(e){
    let that=this
    that.setData({
      password:e.detail.value
    })
  },
  // 获得用户输入的验证码
  getVerifyNum:function(e){
    console.log(e)
    let that=this
    that.setData({
      verifyUSER:e.detail.value
    })
  },
  // 获得手机号
  getPhone:function(e){
    let that=this
    that.setData({
      account:e.detail.value
    })
  },
  // 获得验证码
  getVerify:function(){
    let that=this
    let data = {
      unique_code:'register',
      account: that.data.account
    }
    req._post(api.verify,data).then(function(res){
      console.log(res)
      wx.showToast({
        title: '发送成功',
        icon:'none'
      })
      that.timer()
    }).catch(function(res){
      console.log(res)
    })
  },
  // 获得验证码 倒计时 定时器
  timer:function(){
    let that=this
    that.setData({
      timer:setInterval(function(){
        if (that.data.timeNum > 0) {
          that.setData({
            timeNum: that.data.timeNum - 1,
            timeIF: true
          })
        }else{
          that.setData({
            timeNum: 60,
            timeIF: false
          })
          clearInterval(that.data.timer)
        }
      },1000)
    })
  },
  // 下一步
  next:function(){
    let that=this
    if (that.data.account != '' && that.data.verifyUSER != '' && that.data.password != '' && that.data.passwordQR!=''){
      if (that.data.password == that.data.passwordQR){
        let data = {
          account: that.data.account,
          code: that.data.verifyUSER
        }
        req._post(api.checkVerify, data).then(function(res){
          console.log(res)
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500,
            success: function () {
              setTimeout(function () {
                wx.navigateTo({
                  url: '../shenheziliao/shenheziliao?account=' + that.data.account + '&password=' + that.data.password,
                })
              }, 1500)
            }
          })
        })
      }else{
        wx.showToast({
          title: '两次输入的密码不一致哦!',
          icon: 'none'
        })
      }
    }else{
      if (that.data.account==''){
        wx.showToast({
          title: '手机号不能为空',
          icon:'none'
        })
      } else if (that.data.verifyUSER == '') {
        wx.showToast({
          title: '验证码不能为空',
          icon: 'none'
        })
      } else if (that.data.password == '') {
        wx.showToast({
          title: '密码不能为空',
          icon: 'none'
        })
      } else if (that.data.passwordQR == '') {
        wx.showToast({
          title: '确认密码不能为空',
          icon: 'none'
        })
      }
    }
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
    // 清除 获取验证码 倒计时 定时器
    let that=this
    clearInterval(that.data.timer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // 清除 获取验证码 倒计时 定时器
    let that = this
    clearInterval(that.data.timer)
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