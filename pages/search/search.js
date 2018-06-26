Page({
  data:{
    msg:'搜索电影',
    movies:{},
    haveMore:true,
    start:0,
    val:'',
    query:''
  },
  focusFn:function(){
    this.setData({
      query:''
    })
  },
  searchBlur:function(ev){
    let val=ev.detail.value
    let _this=this
    this.setData({
      val
    })
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url: 'http://localhost:3000/v2/movie/search?q='+val,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({
          movies: res.data.subjects,
        })
        wx.hideToast()
      }
    })
  },
  requestMovies:function(){
    let _this = this
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url: 'http://localhost:3000/v2/movie/search?q=' + _this.data.val+'&count=10&start='+_this.data.start,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.data.subjects.length>0){
          _this.setData({
            movies: _this.data.movies.concat(res.data.subjects)
          })
          wx.hideToast()
        }else{
          _this.setData({
            haveMore: false
          })
        } 
      }
    })
  },
  onReachBottom: function () {

    if (this.data.haveMore) {
      this.setData({
        count: this.data.count + 10,
        start: this.data.start+10
      })
      this.requestMovies()
    }else{
      wx.showToast({
        title: '没有更多了...',
        icon:'none'
      })
    }
  }
})