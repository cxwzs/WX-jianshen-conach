// pages/order/order.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: '',//选中的导航 1全部 2待付款 3进行中 4已完成
    list:[],//订单数据
    page:1,//分页
    m_id: wx.getStorageSync('userinfo').id,//用户id
    stay_pay:0,//待付款数量
  },
  // 删除订单
  orderDel:function(e){
    console.log(e)
    let that=this
    wx.showModal({
      title: '提示',
      content: '确定删除当前订单吗',
      success:function(res){
        console.log(res)
        if (res.confirm){
          // 点击了确定
          let data={
            order_id: e.currentTarget.dataset.order_id
          }
          req._post(api.orderDel,data).then(function(res){
            console.log(res)
            wx.showToast({
              title: res.data.message,
              icon:'none',
              success:function(){
                that.onLoad()
              }
            })
          }).catch(function(res){
            console.log(res)
          })
        }
      }
    })
  },
  // 跳转到订单详情
  toOrderDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../order-detail/order-detail?order_id=' + e.currentTarget.dataset.order_id,
    })
  },
  // 选择导航
  xzNav: function (e) {
    let that = this
    console.log(e)
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
    }else{
      that.setData({
        nav: e.currentTarget.dataset.nav || '',
        page: 1
      })
      let data = {
        coach_id: wx.getStorageSync('userinfo').id,
        status: that.data.nav,
        p: that.data.page
      }
      req._post(api.orderList, data).then(function (res) {
        console.log(res)
        that.setData({
          list: res.data.data.list,
        })
      }).catch(function (res) {
        console.log(res)
      })
    }
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
        coach_id: userinfo.id,
        status: that.data.nav,
        p: 1
      }
      req._post(api.orderList, data).then(function (res) {
        console.log(res)
        that.setData({
          list: res.data.data.list,
          stay_pay: res.data.data.stay_pay
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
        coach_id: userinfo.id,
        status: that.data.nav,
        p: 1
      }
      req._post(api.orderList, data).then(function (res) {
        console.log(res)
        that.setData({
          list: res.data.data.list,
          stay_pay: res.data.data.stay_pay
        })
        //页面加载完毕事件
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
      coach_id: userinfo.id,
      status: that.data.nav,
      p: that.data.page+1
    }
    req._post(api.orderList, data).then(function (res) {
      console.log(res)
      if(res.data.data.list.length!=0){
        let content = that.data.list.concat(res.data.data.list)
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