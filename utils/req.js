module.exports = {
  // 请求数据 方法
  _post: function (url, data) {
    let promise = new Promise(function (resolve, reject) {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: url,
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
        success: function (res) {
          wx.hideLoading()
          if(res.data.flag=='success'){
            resolve(res)
          }else{
            wx.showToast({
              title: res.data.message,
              icon:'none'
            })
          }
        },
        fail: function (res) {
          reject(res)
        }
      })
    })
    return promise;
  }
}