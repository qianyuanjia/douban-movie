Page({
  data:{
    detail:{}
  },
  onLoad: function (param){
    let _this=this
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url: `http://localhost:3000/v2/movie/subject/${param.id}`,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({
          detail:res.data
        })
        wx.hideToast()
      }
    })
  }
})