module.exports = {
  // 返回上一页 刷新
  refresh:function(){
    setTimeout(function () {
      let pages = getCurrentPages(); // 获取页面栈
      let prevPage = pages[pages.length - 2]; // 上一个页面
      prevPage.onLoad()
      wx.navigateBack({
        delta: 1
      })
    }, 1500)
  }
}