// pages/shenqing-tixian/shenqing-tixian.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
const back = require("../../utils/back.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amounts:0,//提现金额
    m_id: wx.getStorageSync('userinfo').id,//用户id
    total_price:'',//可提现金额
    rule:'',//提现注意
  },
  // 获得提现金额
  getNum:function(e){
    let that=this
    that.setData({
      amounts:e.detail.value
    })
  },
  // 提现
  tixian:function(){
    let that=this
    let data={
      m_id: wx.getStorageSync('userinfo').id,
      amounts: that.data.amounts
    }
    req._post(api.withdraw,data).then(function(res){
      console.log(res)
      wx.showToast({
        title: res.data.message,
        icon:'none',
        duration:1500,
        success:function(res){
          // 返回上一页刷新
          back.refresh()
        }
      })
    }).catch(function(res){
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let data = {
      m_id: wx.getStorageSync('userinfo').id
    }
    req._post(api.myWallet, data).then(function (res) {
      console.log(res)
      that.setData({
        rule: res.data.data.cash_cycle,
        total_price: res.data.data.total_price
      })
    }).catch(function (res) {
      console.log(res)
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