// pages/login/index.js
Page({
  data: {
    appId:"",
    code:"",
    appSecret:"4c6a1ccdc5fe81417654280a1264c12a",
    iv:"",
    encryptedData:"",
    token:""
  },
  handgetuserInfo(e){
    const {userInfo}=e.detail    
    wx.setStorageSync('userInfo', userInfo)
    wx.navigateBack({
      delta: 1,
    })
    // const appid=wx.getAccountInfoSync()
    // const {iv,encryptedData}=e.detail
    // this.setData({
    //   encryptedData,
    //   iv
    // })
    
    // wx.login({
    //   success:(res)=>{
    //     this.setData({
    //       appId:appid.miniProgram.appId,
    //       code:res.code
    //     })
    //     wx.request({
    //       url: 'http://192.168.137.124:3000/token',
    //       method:"POST",
    //       data:{
    //         appId:this.data.appId,
    //         code:this.data.code,
    //         appSecret:this.data.appSecret
    //       },
    //       success:(res)=>{
    //         console.log("成功");
    //         wx.setStorageSync('token', res.data.token)
    //         const token=wx.getStorageSync('token')
    //         this.setData({
    //           token
    //         })
    //       },
    //     })
    //   }
    // }) 
  },
  // ass(){
  //   wx.request({
  //     url: 'http://192.168.137.124:3000/token/detail',
  //     method:"POST",
  //     data:{
  //       iv:this.data.iv,
  //       encryptedData:this.data.encryptedData,
  //     },
  //     header:{
  //       token:this.data.token
  //     },
  //     success:(res)=>{
  //     },
  //   })
  // }
})