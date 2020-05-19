//index.js
//获取应用实例
const app = getApp()
import api from '../../utils/api.js';
const req = require("../../utils/req.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,//分页
    list:[],//项目列表
  },
  // 跳转到 添加 项目
  addProject:function(){
    wx.navigateTo({
      url: '../add-project/add-project',
    })
  },
  // 跳转到 编辑 项目
  bianji:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../add-project/add-project?id=' + e.currentTarget.dataset.id,
    })
  },
  // 删除项目
  delProject:function(e){
    console.log(e)
    let that=this
    wx.showModal({
      title: '提示',
      content: '确定删除当前项目吗',
      success:function(res){
        console.log(res)
        if (res.confirm){
          // 点击了确定
          let data={
            id: e.currentTarget.dataset.id
          }
          req._post(api.projectDelete,data).then(function(res){
            console.log(res)
            that.onLoad()
          }).catch(function(res){
            console.log(res)
          })
        }
      }
    })
  },
  // 上架 下架 项目
  upProject:function(e){
    console.log(e)
    let that=this
    wx.showModal({
      title: '提示',
      content: e.currentTarget.dataset.tsy,
      success:function(res){
        console.log(res)
        if (res.confirm){
          // 点击了确定
          let data = {
            id: e.currentTarget.dataset.id,
            status: e.currentTarget.dataset.status
          }
          req._post(api.projectStatus, data).then(function (res) {
            console.log(res)
            wx.showToast({
              title: res.data.message,
              icon:'none'
            })
            that.onLoad()
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
        m_id: userinfo.id,
        p: 1
      }
      // 获取项目列表
      req._post(api.project, data).then(function (res) {
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
    let that=this
    let userinfo = wx.getStorageSync('userinfo')
    that.data.page=1
    let data = {
      m_id: userinfo.id,
      p: 1
    }
    req._post(api.project, data).then(function (res) {
      console.log(res)
      that.setData({
        list: res.data.data.list
      })
      //页面加载完毕事件
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }).catch(function (res) {
      console.log(res)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that=this
    let userinfo = wx.getStorageSync('userinfo')
    let data = {
      m_id: userinfo.id,
      p: that.data.page+1
    }
    req._post(api.project, data).then(function (res) {
      console.log(res)
      if (res.data.data.list.length!=0){
        let content = that.data.list.concat(res.data.data.list)
        that.setData({
          list: content,
          page: that.data.page + 1
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