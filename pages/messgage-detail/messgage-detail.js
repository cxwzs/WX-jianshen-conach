// pages/messgage-detail/messgage-detail.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',//
    content:'',//内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that=this
    let data={
      id:options.id,
      m_id: wx.getStorageSync('userinfo').id
    }
    req._post(api.messageDetails,data).then(function(res){
      console.log(res)
      that.setData({
        title: res.data.data.info.title,//
        content: res.data.data.info.content,//内容
      })
      let pages = getCurrentPages(); // 获取页面栈
      let prevPage = pages[pages.length - 2]; // 上一个页面
      prevPage.onLoad()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})