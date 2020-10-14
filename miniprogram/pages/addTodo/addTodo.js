
const db = wx.cloud.database();
const todos = db.collection('todos')

Page({
  data:{
    image:null
  },
  pageData:{
    locationObj:{}
  },
  onSubmit:function(event){
    //console.log(event.detail.formId)
    //console.log(event.detail.value.title)
    todos.add({
      data:{
        title:event.detail.value.title,
        image:this.data.image,
        location:this.pageData.locationObj
      }
    }).then(res=>{
      wx.cloud.callFunction({
        name:'msgMe',
        data:{
          formId: event.detail.formId,
          taskId: res._id
        }
      })
      wx.showToast({
        title: '添加成功',
        icon:'success',
        success:res2=>{
          wx.redirectTo({
            url: `../todoInfo/todoInfo?id=${res._id}`,
          })
        }
      })
    })
  },
  selectImage:function(e){
    wx.chooseImage({
      //success: function(res){
        success: res => {
        console.log(res.tempFilePaths[0]);
        wx.cloud.uploadFile({
          cloudPath : `${Math.floor(Math.random()*10000000)}.png`,
          filePath: res.tempFilePaths[0],
        }).then(res=>{
          console.log(res.fileID);
          this.setData({
            image: res.fileID
          })
        }).catch(err=>{
          console.error(err);
        })
      },
    })
  },
  chooseLocation:function(e){
    wx.chooseLocation({
      //latitude: 0,
      success: res=> {
        let locationObj = {
          latitude: res.latitude,
          longitude: res.longitude,
          name: res.name,
          address: res.address
        }
        this.pageData.locationObj = locationObj
      }
    })
  }
})