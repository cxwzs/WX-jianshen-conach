// pages/add-project/add-project.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
const back = require("../../utils/back.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cover:'',//封面
    name:'',//项目名称
    class_id:'',//所属类别
    describe:'',//简介
    prices:[],//价格
    address:'',//位置
    video:'',//视频
    status:1,//项目 状态 1 添加 2 编辑
    id:'',//项目id  编辑项目时存在
  },
  // 删除上传的 展示视频
  del:function(){
    let that=this
    that.setData({
      video:''
    })
  },
  //上传封面图
  scImgTwo: function () {
    let that = this
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function (res) {
        console.log(res)
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImageTwo('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImageTwo('camera')
          }
        }
      }
    })
  },
  // 图片本地路径
  chooseWxImageTwo: function (type) {
    var that = this;
    var imgsPaths = that.data.imgTwoUrl;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      count: 1,
      sourceType: [type],
      success: function (res) {
        console.log(res)
        console.log(res.tempFilePaths[0]);
        that.upImgsTwo(res.tempFilePaths[0], 0) //调用上传方法
      }
    })
  },
  //上传服务器
  upImgsTwo: function (imgurl, index) {
    var that = this;
    wx.showLoading({
      title: '上传中',
    })
    wx.uploadFile({
      url: getApp().dizhitou + 'System/upload',
      filePath: imgurl,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: {
        folder: '1'
      },
      success: function (res) {
        console.log(res) //接口返回网络路径
        var data = JSON.parse(res.data)
        console.log(data)
        that.setData({
          cover: data.data.list[0].abs_url,
        })
        wx.hideLoading()
      }
    })
  },

  //上传 展示视频
  scImgOne: function () {
    let that = this
    wx.showActionSheet({
      itemList: ['从视频中选择', '录像'],
      itemColor: "#00000",
      success: function (res) {
        console.log(res)
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  // 展示视频本地路径
  chooseWxImage: function (type) {
    var that = this;
    var imgsPaths = that.data.imgOneUrl;
    wx.chooseVideo({
      // sourceType: ['album', 'camera'],
      // count: 1,
      sourceType: [type],
      success: function (res) {
        // console.log(res)
        console.log(res.tempFilePath);
        that.upImgs(res.tempFilePath, 0) //调用上传方法
      }
    })
  },
  //上传服务器
  upImgs: function (imgurl, index) {
    var that = this;
    wx.showLoading({
      title: '上传中',
    })
    wx.uploadFile({
      url: getApp().dizhitou + 'System/upload',
      filePath: imgurl,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: {
        folder: '5'
      },
      success: function (res) {
        console.log(res) //接口返回网络路径
        var data = JSON.parse(res.data)
        console.log(data)
        that.setData({
          video: data.data.list[0].abs_url,
        })
        wx.hideLoading()
      }
    })
  },

  // 获得项目名称
  getName:function(e){
    let that=this
    that.setData({
      name:e.detail.value
    })
  },
  // 选择位置
  getAddress:function(){
    let that=this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          address: res.address
        })
      },
    })
  },
  // 跳转到项目简介
  toJieShao:function(){
    let that=this
    wx.navigateTo({
      url: '../prodect-introduce/prodect-introduce?describe=' + encodeURIComponent(that.data.describe),
    })
  },
  // 跳转到价格设置
  toPriceSet:function(){
    let that=this
    wx.navigateTo({
      url: '../project-price/project-price?prices=' + JSON.stringify(that.data.prices),
    })
  },
  // 跳转到所属类别
  toSSLB:function(){
    let that=this
    wx.navigateTo({
      url: '../suosu-leibie/suosu-leibie?class_id=' + that.data.class_id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that=this
    if (JSON.stringify(options)!='{}'){
      console.log('编辑项目')
      // 编辑项目
      that.setData({
        id: options.id
      })
      let data={
        id: options.id
      }
      req._post(api.projectDetails,data).then(function(res){
        console.log(res)
        that.setData({
          cover: res.data.data.image,//封面
          name: res.data.data.name,//项目名称
          class_id: res.data.data.class_id,//所属类别
          describe: res.data.data.describe,//简介
          prices: res.data.data.prices,//价格
          address: res.data.data.address,//位置
          video: res.data.data.video,//视频
        })
        console.log(that.data.prices)
      }).catch(function(res){
        console.log(res)
      })
    }
  },
  // 确定 添加/编辑 项目
  queding:function(){
    let that=this
    let userinfo = wx.getStorageSync('userinfo')
    let data={
      name: that.data.name,
      class_id: that.data.class_id,
      describe: that.data.describe,
      address: that.data.address,
      image: that.data.cover,
      video: that.data.video,
      prices: JSON.stringify(that.data.prices),
      m_id: userinfo.id,
      id: that.data.id
    }
    // 添加/编辑 项目
    req._post(api.projectUpdate,data).then(function(res){
      console.log(res)
      wx.showToast({
        title: res.data.message,
        icon:'none',
        duration:1500,
        success: function (res) {
          // 返回上一页刷新
          back.refresh()
        }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})