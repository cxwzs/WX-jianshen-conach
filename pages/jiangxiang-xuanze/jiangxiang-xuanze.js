// pages/jiangxiang-xuanze/jiangxiang-xuanze.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],//奖项列表
    ids: [],//选中的奖项id
    listID:[],//奖项id列表
    idUrl:[],//选中的奖项图标
  },
  // 选择奖项
  xzHook: function (e) {
    console.log(e)
    let that = this
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.ids
    let url=e.currentTarget.dataset.url
    // console.log(that.data.ids,'ids')
    if (that.data.ids.includes(id)){
      // console.log('有')
      // 选中的奖项中已经有当前点击的奖项
      let idx = that.data.ids.indexOf(id)
      that.data.ids.splice(idx,1)
      that.data.idUrl.splice(idx, 1)
      let status = 'list[' + index + '].status'
      that.setData({
        [status]: 0
      })
      // console.log(that.data.ids,'删除ids')
    }else{
      // console.log('无')
      // 选中的奖项中没有当前点击的奖项
      that.data.ids.push(id)
      that.data.idUrl.push(url)
      let status = 'list[' + index + '].status'
      that.setData({
        [status]: 1
      })
      // console.log(that.data.ids,'压入ids')
    }
    console.log(that.data.ids,'ids')
    console.log(that.data.idUrl,'idUrl')
  },
  // 确定 选择奖项
  queding: function () {
    let that = this
    let pages = getCurrentPages(); // 获取页面栈
    let prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      prizeID: that.data.ids,
      prizeUrl: that.data.idUrl
    })
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this
    // 获取奖项列表
    req._post(api.icon).then(function (res) {
      console.log(res)
      that.setData({
        list: res.data.data.list,//奖项列表
      })
      // 奖项列表 对应的奖项id数组 为后面判断上个页面是否带奖项id做默认选中效果铺垫
      for (let j = 0; j < res.data.data.list.length;j++){
        let content = that.data.listID.concat(res.data.data.list[j].id)
        that.setData({
          listID: content
        })
      }
      // 判断从上个页面有没有传过来 奖项id
      if (JSON.parse(options.prize).length!=0) {
        // console.log(JSON.parse(options.prize),'prize')
        let prize = JSON.parse(options.prize)
        let url = JSON.parse(options.url)
        that.setData({
          ids: prize,
          idUrl:url
        })
        // 上个页面带的奖项id 默认选中效果
        for (let i = 0; i<prize.length;i++){
          let index = (that.data.listID || []).findIndex((item) => item == prize[i])
          let status = 'list[' + index +'].status'
          that.setData({
            [status]:1
          })
        }
      }
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