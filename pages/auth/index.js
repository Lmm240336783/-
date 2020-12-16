import {  login,requestPayment,showModal  } from "../../utils/asyncWx.js"
Page({
  data: {
    code:"",
    encryptedData:"",
    iv:"",
    appId:""
  },
   async handleGetUserInfo(e){ 
    try {
    // 获取用户信息
    // const {encryptedData,iv} =e.detail;    
    // this.setData({
    //   encryptedData:encryptedData,
    //   iv:iv,
    // })
    //获取appid
    // const accountInfo = wx.getAccountInfoSync();
    // this.setData({
    //   appId:accountInfo.miniProgram.appId
    // })
    // wx.login({
    //   success:(res)=>{        
    //     const code=res.code
    //     this.setData({
    //       code:code
    //     })
        // wx.request({
        //   url:'http:192.168.137.124:3000/token',
        //   method:"POST",
        //   data:{
        //     code:res.code,
        //     encryptedData:encryptedData,
        //     iv:iv
        //   },
        //   success:(data)=>{
        //   }
        // })
    //   }
    // })
    // const {encryptedData,rawData,iv,signature} =e.detail;    
    // console.log(encryptedData,rawData,iv,signature);
    // // 获取登录后的code
    // const {code}=await login();
    // const loginParams={encryptedData,rawData,iv,signature,code}   
    // console.log(loginParams);
    // // 需要企业级微信 暂时无用 请求头参数
    // const {token} =await request({url:"/users/wxlogin",data:loginParams,method:"POST"});    
    // wx.setStorageSync('token', token)
    // 自己定义的token码 应该是请求数据获得的token码
    wx.setStorageSync('token', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo");    
    wx.showToast({
      title: '授权成功',
      duration:1500
    })
    setTimeout(()=>{
      wx.navigateBack({
        delta: 1,
      }) 
    },1000)
  } catch (error) {
    console.log(error);
    } 
  }, 
  
})