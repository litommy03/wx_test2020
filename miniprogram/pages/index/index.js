const db = wx.cloud.database();
const todos = db.collection('todos');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onReachBottom:function(){
    // console.log('event')
    this.getData();
  },
  onPullDownRefresh:function(){
    this.getData(res=>{
      //停止刷新
      wx.stopPullDownRefresh();
      this.pageData.skip = 0;
    });

  },
  getData:function(callback){
    if(!callback){
      callback= res => {};
    }
    wx.showLoading({
      title: '数据加载中',
    })
    todos.skip(this.pageData.skip).get().then(res=>{
      let oldData = this.data.tasks;
      this.setData({
        tasks: oldData.concat(res.data)
      },res=>{
        this.pageData.skip = this.pageData.skip+20;
        wx.hideLoading();
        callback();
      })
    })
  },
  pageData: {
    skip:0
  }
})