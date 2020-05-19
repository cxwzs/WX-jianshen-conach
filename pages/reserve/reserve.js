// pages/reserve/reserve.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//预约列表
    page:1,//分页
    phone:'',//手机号
  },
  // 搜索 回车事件搜索
  searchEnter:function(e){
    console.log(e)
    let that=this
    let userinfo = wx.getStorageSync('userinfo')
    that.data.phone = e.detail.value
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
        p: 1,
        phone: e.detail.value || ''
      }
      req._post(api.appointmentList, data).then(function (res) {
        console.log(res)
        that.setData({
          list: res.data.data.list
        })
      }).catch(function (res) {
        console.log(res)
      })
    }
  },
  // 搜索 获得搜索关键词
  getKeyWords:function(e){
    let that=this
    that.data.phone=e.detail.value
  },
  // 搜索
  search:function(){
    let that=this
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
        p: 1,
        phone: that.data.phone || ''
      }
      req._post(api.appointmentList, data).then(function (res) {
        console.log(res)
        that.setData({
          list: res.data.data.list
        })
      }).catch(function (res) {
        console.log(res)
      })
    }
  },
  // 跳转到预约详情
  toReserveDetail:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../reserve-detail/reserve-detail?order_id=' + e.currentTarget.dataset.order_id,
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
        p: 1,
        phone: that.data.phone||''
      }
      req._post(api.appointmentList, data).then(function (res) {
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
    let that = this
    let userinfo = wx.getStorageSync('userinfo')
    that.data.page=1
    that.setData({
      phone:''
    })
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
        p: 1,
        phone: that.data.phone || ''
      }
      req._post(api.appointmentList, data).then(function (res) {
        console.log(res)
        that.setData({
          list: res.data.data.list
        })
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }).catch(function (res) {
        console.log(res)
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this
    let userinfo = wx.getStorageSync('userinfo')
    let data = {
      m_id: userinfo.id,
      p: that.data.page + 1
    }
    req._post(api.appointmentList, data).then(function (res) {
      console.log(res)
      if (res.data.data.list.length != 0) {
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