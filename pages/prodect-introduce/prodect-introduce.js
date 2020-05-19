// pages/prodect-introduce/prodect-introduce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder: `请输入项目简介：示例 \n 1. 个人信息介绍 \n 2.曾获奖及持有证书 \n 3.项目详情介绍 \n 4.自我性格总结`,
    describe: '', //简介
    formats: {},
    readOnly: false,
    // placeholder: '开始输入...',
    editorHeight: 240,
    keyboardHeight: 0,
    isIOS: false,
    images: []
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  // 获得简介
  getDescribe: function(e) {
    console.log(e)
    let that = this
    that.setData({
      describe: e.detail.html
    })
  },
  // 确定
  queding: function() {
    let that = this
    let pages = getCurrentPages(); // 获取页面栈
    let prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      describe: that.data.describe
    })
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 如果options.describe不为空 则说明editor编辑器有默认值
    console.log(options)
    if (options.describe != '') {
      this.setData({
        describe: decodeURIComponent(options.describe)
      })
    }
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({
      isIOS
    })
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)

    })
  },
  updatePosition(keyboardHeight) {
    const toolbarHeight = 50
    const {
      windowHeight,
      platform
    } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({
      editorHeight,
      keyboardHeight
    })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const {
      statusBarHeight,
      platform
    } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  // edito编辑器初始化 设置 默认值
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function(res) {
      that.editorCtx = res.context
      that.editorCtx.setContents({
        html: that.data.describe
      })
    }).exec()
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let {
      name,
      value
    } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({
      formats
    })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function() {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function(res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res.tempFilePaths, '上传图片')
        wx.uploadFile({
          url: getApp().dizhitou + 'System/upload',
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {
            folder: '1'
          },
          success: function(res) {
            console.log(res.data, '图片上传之后的数据')
            var data = JSON.parse(res.data)
            console.log(data)
            that.editorCtx.insertImage({
              src: data.data.list[0].abs_url,
              data: {
                id: 'abcd',
                role: 'god'
              },
              width: '100%',
              success: function() {
                console.log('insert image success')
              }
            })
          }
        })
      }
    })
    // wx.chooseImage({
    //   count: 1,
    //   success: function(res) {
    //     that.editorCtx.insertImage({
    //       src: res.tempFilePaths[0],
    //       data: {
    //         id: 'abcd',
    //         role: 'god'
    //       },
    //       width: '100%',
    //       success: function(res) {
    //         console.log(res, 'insert image success')
    //       }
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})