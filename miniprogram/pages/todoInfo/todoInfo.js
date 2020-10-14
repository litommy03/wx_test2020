
const db = wx.cloud.database();
const todos = db.collection("todos");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    task:null
  },

  pageData:{

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.pageData.id = options.id;
    todos.doc(options.id).get().then(res=>{
      this.setData({
        task: res.data
      })
    })
  },

  viewLocation:function(){
    wx.openLocation({
      latitude: this.data.task.location.latitude,
      longitude: this.data.task.location.longitude,
      name:this.data.task.location.name,
      address:this.data.task.location.address
    })
  }
})