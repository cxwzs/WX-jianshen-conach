// pages/project-price/project-price.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project:[
      { key: '', value: '' }
    ],//价格设置
  },
  // 添加 价格
  add:function(){
    let that=this
    let content = that.data.project.concat({ key: '', value: '' })
    that.setData({
      project: content
    })
    // console.log(that.data.project)
  },
  // 课程时长
  kecheng:function(e){
    console.log(e)
    let that=this
    let index = e.currentTarget.dataset.index
    let key = 'project[' + index +'].key'
    that.setData({
      [key]:e.detail.value
    })
    console.log(that.data.project)
  },
  // 课程价格
  jiage: function (e) {
    console.log(e)
    let that = this
    let index = e.currentTarget.dataset.index
    let value = 'project[' + index + '].value'
    that.setData({
      [value]: e.detail.value
    })
    console.log(that.data.project)
  },
  // 确定添加 价格
  queding:function(){
    let that=this
    // let price = JSON.stringify(that.data.project)
    // console.log(price)
    if (that.data.project.every(item => item.key !== '' && item.value !== '')){
      let pages = getCurrentPages(); // 获取页面栈
      let prevPage = pages[pages.length - 2]; // 上一个页面
      prevPage.setData({
        prices: that.data.project
      })
      wx.navigateBack({
        delta: 1
      })
    }else{
      wx.showToast({
        title: '值不能为空',
        icon:'none'
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that=this
    if(JSON.stringify(options)!='{}'){
      if (JSON.parse(options.prices).length!=0){
        that.setData({
          project: JSON.parse(options.prices)
        })
      }
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