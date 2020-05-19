// pages/suosu-leibie/suosu-leibie.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//项目分类列表
    ids:'',//选中的分类
  },
  // 选择所属类别
  xzHook:function(e){
    console.log(e)
    let that=this
    that.setData({
      ids: e.currentTarget.dataset.ids
    })
  },
  // 确定 选择的所属类别
  queding:function(){
    let that=this
    let pages = getCurrentPages(); // 获取页面栈
    let prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      class_id: that.data.ids
    })
    wx.navigateBack({
      delta:1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that=this
    // 获取项目分类列表
    req._post(api.projectClass).then(function(res){
      console.log(res)
      that.setData({
        list: res.data.data.list,//项目分类列表
        ids: res.data.data.list[0].id,//选中的分类
      })
      if (options.class_id!=''){
        that.setData({
          ids: options.class_id
        })
      }
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