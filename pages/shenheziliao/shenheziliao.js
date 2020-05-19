// pages/shenheziliao/shenheziliao.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender:1,//性别 1 男 2 女
    genderList:[
      { id: 1, name: '先生' },
      { id: 2, name: '女士' }
    ],//性别
    shareIF: false,//分享弹窗
    card_just: '',//正面身份证
    card_back: '',//反面身份证
    card_hand: '',//手持身份证
    name:'',//姓名
    head_portrait:'',//头像
    phone:'',//手机号
    password:'',//密码
  },
  //上传头像
  touxiang: function () {
    let that = this
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
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
  // 图片本地路径
  chooseWxImage: function (type) {
    var that = this;
    var imgsPaths = that.data.imgOneUrl;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      count: 1,
      sourceType: [type],
      success: function (res) {
        console.log(res.tempFilePaths[0]);
        that.upImgs(res.tempFilePaths[0], 0) //调用上传方法
      }
    })
  },
  //上传服务器
  upImgs: function (imgurl, index) {
    var that = this;
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
          head_portrait: data.data.list[0].abs_url
        })
        console.log(that.data.head_portrait)
      }
    })
  },
  // 获得用户输入的姓名
  getName:function(e){
    let that=this
    that.setData({
      name:e.detail.value
    })
  },
  // 点击复制 微信号
  copy:function(e){
    console.log(e)
    // 复制功能  复制的东西必须为字符串
    let wechat = e.currentTarget.dataset.wechat.toString()
    console.log(wechat,'wechat')
    wx.setClipboardData({
      data: wechat,
      success:function(res){
        console.log(res)
        wx.getClipboardData({
          success:function(res){
            console.log(res)
          }
        })
      }
    })
  },
  // 选择性别
  xzGender:function(e){
    console.log(e)
    let that=this
    that.setData({
      gender: e.currentTarget.dataset.id
    })
  },
  // 跳转到上传证件
  toSCZJ:function(){
    let that=this
    let imgOneUrl = that.data.card_just
    let imgTwoUrl = that.data.card_back
    let imgThreeUrl = that.data.card_hand
    wx.navigateTo({
      url: '../youxiaozhengjian/youxiaozhengjian?imgOneUrl=' + imgOneUrl + '&imgTwoUrl=' + imgTwoUrl + '&imgThreeUrl=' + imgThreeUrl,
    })
  },
  // 提交
  getuserinfo:function(e){
    console.log(e)
    let that=this
    wx.login({
      success:function(res){
        console.log(res)
        let data={
          code:res.code
        }
        // 获取openid
        req._post(api.openid,data).then(function(res){
          console.log(res,'openid')
          // 注册
          let data={
            phone: that.data.phone,
            password: that.data.password,
            openid: res.data.data.openid,
            name: that.data.name,
            head_portrait: that.data.head_portrait,
            sex: that.data.gender,
            card_just: that.data.card_just,
            card_back: that.data.card_back,
            card_hand: that.data.card_hand,
          }
          req._post(api.register,data).then(function(res){
            console.log(res)
            // that.setData({
            //   shareIF:true
            // })
            wx.reLaunch({
              url: '../login/login',
            })
          }).catch(function (res) {
            console.log(res)
          })
        }).catch(function(res){
          console.log(res)
        })
      }
    })
  },
  // 隐藏分享弹窗
  hideShare: function () {
    let that = this
    that.setData({
      shareIF: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that=this
    if(JSON.stringify(options)!='{}'){
      that.setData({
        phone: options.account,//手机号
        password: options.password,//密码
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