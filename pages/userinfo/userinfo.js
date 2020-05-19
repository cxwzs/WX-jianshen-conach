// pages/userinfo/userinfo.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
const back = require("../../utils/back.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder: `请输入您的简介：示例 \n 1. 个人信息介绍 \n 2.曾获奖及持有证书 \n 3.擅长项目介绍 \n 4.过往项目经历经验介绍 \n 5.自我性格总结`,
    head_portrait: '',//头像
    name: '',//姓名
    city:'',//城市
    prizeUrl:[],//奖项图标
    prizeID: [],//奖项id
    describe:'',//简介
    year_num:'',//工作年限
  },
  // 选择奖项
  toJiangXiang:function(){
    let that=this
    wx.navigateTo({
      url: '../jiangxiang-xuanze/jiangxiang-xuanze?prize=' + JSON.stringify(that.data.prizeID) + '&url=' + JSON.stringify(that.data.prizeUrl),
    })
  },
  // 获得简介
  getDescribe: function (e) {
    console.log(e)
    let that = this
    that.setData({
      describe: e.detail.html
    })
  },
  // 获得工作年限
  getYear:function(e){
    let that = this
    that.setData({
      year_num: e.detail.value
    })
  },
  // 选择位置
  getAddress: function () {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          city: res.address
        })
      },
    })
  },
  // 获得姓名
  getName:function(e){
    let that=this
    that.setData({
      name:e.detail.value
    })
  },
  //上传头像
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
          head_portrait: data.data.list[0].abs_url,
        })
        wx.hideLoading()
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
        m_id: userinfo.id
      }
      // 获取个人资料
      req._post(api.my, data).then(function (res) {
        console.log(res)
        that.setData({
          head_portrait: res.data.data.head_portrait,//头像
          name: res.data.data.name,//姓名
          city: res.data.data.city,//城市
          describe: res.data.data.describe,//简介
          year_num: res.data.data.year_num,//工作年限
        })
        that.onEditorReady()
        // 奖项 图标路径 id
        for (let i = 0; i < res.data.data.prize.length; i++) {
          let id = that.data.prizeID.concat(res.data.data.prize[i].id)
          let url = that.data.prizeUrl.concat(res.data.data.prize[i].url)
          that.setData({
            prizeID:id,
            prizeUrl:url
          })
        }
        // console.log(that.data.prizeUrl)
      }).catch(function (res) {
        console.log(res)
      })
    }
  },

  // 富文本编辑器初始化 设置默认值
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      console.log(res)
      that.editorCtx = res.context
      that.editorCtx.setContents({
        html: that.data.describe
      })
    }).exec()
  },
  // 保存个人信息
  baocun:function(){
    let that=this
    let userinfo = wx.getStorageSync('userinfo')
    let prize = that.data.prizeID.join(',')
    let data={
      m_id: userinfo.id,
      head_portrait: that.data.head_portrait,
      name: that.data.name,
      city: that.data.city,
      year_num: that.data.year_num,
      prize: prize,
      describe: that.data.describe
    }
    req._post(api.updateUserinfo,data).then(function(res){
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