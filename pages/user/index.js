Page({
  data: {
    userInfo:{},
    AllcollectNum:0
  },
  onLoad: function (options) {
  },
  onShow: function () {
    const collect=wx.getStorageSync('collect')||[]
   const userInfo= wx.getStorageSync('userInfo')
   this.setData({
    userInfo,
    AllcollectNum:collect.length
   })   
  },

  
})