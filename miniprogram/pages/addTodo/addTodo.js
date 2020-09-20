
const db = wx.cloud.database();
const todos = db.collection('todos')

Page({
  onSubmit:function(event){
    //console.log(event.detail.value.title)
    todos.add({
      data:{
        title:event.detail.value.title
      }
    }).then(res=>{
      wx.showToast({
        title: 'Success',
        icon:'success'
      })
    })
  },
  selectImage:function(e){
    wx.chooseImage({
      success: function(res){
        console.log(res.tempFilePaths[0]);
        wx.cloud.uploadFile({
          cloudPath : `${Math.floor(Math.random()*10000000)}.png`,
          filePath: res.tempFilePaths[0],
        }).then(res=>{
          console.log(res.fileID);
        }).catch(err=>{
          console.error(err);
        })
      },
    })
  }
})