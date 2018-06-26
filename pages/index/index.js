Page({
  data:{
    msg:"加载中...",
    movies:{},
    textClass:'',
    count:10
  },
  onLoad:function(){
    let _this=this
    wx.showToast({
      title: '加载中...',
      icon:'loading',
      duration:10000
    })
    wx.request({
      url: 'http://localhost:3000/v2/movie/top250',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({
          movies:res.data,
          msg:res.data.title,
          textClass:'text-black'
        })
        wx.hideToast()
      }
    })
  },
  requestMovies:function(){
    let _this=this
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url: 'http://localhost:3000/v2/movie/top250?count='+this.data.count,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({
          movies: res.data,
        })
        wx.hideToast()
      }
    })
  },
  onReachBottom:function(){
    if(this.data.count<250){
      this.setData({
        count: this.data.count + 10
      })
      this.requestMovies()
      console.log(1)
    }else{
      wx.showToast({
        title: '没有更多了...',
        icon: 'none'
      })
    }  
  }
})