// pages/mine-wallet/mine-wallet.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    m_id: wx.getStorageSync('userinfo').id,//用户id
    total_price:0,//总金额
    list:[],//收支明细
    page:1,//分页
  },
  // 跳转到申请提现
  shenqingtixian:function(){
    wx.navigateTo({
      url: '../shenqing-tixian/shenqing-tixian',
    })
  },
  // 跳转到提现记录
  tixianjilu:function(){
    wx.navigateTo({
      url: '../tixian-jilu/tixian-jilu',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    that.data.page=1
    let data={
      m_id: wx.getStorageSync('userinfo').id,
      p:1
    }
    req._post(api.myWallet,data).then(function(res){
      console.log(res)
      that.setData({
        list: res.data.data.list.list,
        total_price: res.data.data.total_price
      })
    }).catch(function(res){
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
    let that=this
    let data = {
      m_id: wx.getStorageSync('userinfo').id,
      p: that.data.page+1
    }
    req._post(api.myWallet, data).then(function (res) {
      console.log(res)
      if (res.data.data.list.list.length!=0){
        let content = that.data.list.concat(res.data.data.list.list)
        that.setData({
          list: content,
          page: that.data.page+1
        })
      }
    }).catch(function (res) {
      console.log(res)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})