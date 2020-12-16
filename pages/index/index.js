import { request } from "../../requset/index";
Page({
  data: {
    //轮播图数组
    swiperList: [
    ],
    // 导航数组
    catesList: [
    ],
    // 楼层数据
    floorList: [
    ]
  },
  onLoad: function (options) {
    // 第一种基础写法
    // wx.request({
    //   url: 'https://www.uinav.com/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    // })
    // 第二种封装方法  优化
    // request({url:"https://www.uinav.com/api/public/v1/home/swiperdata"})
    // .then(result=>{
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    // })
    // 请求轮播图数据
    this.getswiperList();
    // 请求分类数据
    this.getcatesList();
    // 请求楼层数据
    this.getfloorList();
  },
  // 请求轮播图数据
  getswiperList() {
    // request({ url: "https://www.uinav.com/api/public/v1/home/swiperdata" })
    request({ url: "/home/swiperdata" })
      .then(result => {
        result.forEach(v=>v.navigator_url=v.navigator_url.replace("main","index"))
        this.setData({
          swiperList: result
          // swiperList: result.data.message
        })
      })
  },
  // 请求分类数据
  getcatesList() {
    // request({ url: "https://www.uinav.com/api/public/v1/home/catitems" })
    request({ url: "/home/catitems" })
      .then(result => {
        // result.forEach(v=>v.navigator_url=v.navigator_url.replace("main","index"))
        this.setData({
          catesList: result
          // catesList: result.data.message
        })
      })
  },
  // 请求楼层数据
  getfloorList() {
    // request({ url: "https://www.uinav.com/api/public/v1/home/floordata" })
    request({ url: "/home/floordata" })
      .then(result => {
        this.setData({
          floorList: result
        })
      })
  }

})