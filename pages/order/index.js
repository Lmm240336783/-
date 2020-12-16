import { request } from "../../requset/index";
Page({
  data: {
    orders:[
      {
        number:"HMDD20190812123560001104",
        price:"13167",
        data:"2020/11/12下午9:36：25"
      },
      {
        number:"HMDD20190812093856001104",
        price:"123121",
        data:"2020/3/12早上7:36：25"
      },
      {
        number:"HMDD20190812385960001104",
        price:"23213",
        data:"2020/11/12中午10:36：25"
      },
      {
        number:"HMDD20190812295485001104",
        price:"9989",
        data:"2019/12/12中午11:12：25"
      }
    ],
    tabs:[
      {
        id:0,
        value:'全部订单',
        inActive:true
      },
      {
        id:1,
        value:'待付款',
        inActive:false
      },
      {
        id:2,
        value:'代发货',
        inActive:false
      },
      {
        id:3,
        value:'退货/退款',
        inActive:false
      }
      
    ],
  },
  onLoad: function (options) {
    const token=wx.getStorageSync('token')

    if(!token){
      wx.navigateTo({
        url: '/pages/login/index',
    })
      return
    }
  },
  onShow(options){
    // const token=wx.getStorageSync('token')
    // if(!token){
    //   wx.navigateTo({
    //     url: '/pages/login/index',
    // })
    //   return
    // }
      //获取当前的小程序的页面栈-一个数组 长度最长为10页
      let pages=getCurrentPages();
      let currentPage=pages[pages.length-1]    
      const {type}=currentPage.options    
      //页面堆中的type-1变成索引 然后给渲染样式 
      this.changTitleByIndex(type-1)
      this.getOrders(type)
  },
  async getOrders(type){
    // const res =await request({url:"/my/orders/all",data:{type}})    
  },
  changTitleByIndex(index){
    // 获取点击的标题索引 然后循环 将i不等于传过来的索引的选中状态都变成false
    let {tabs}=this.data;
    // 循环筛选 
    tabs.forEach((v,i) =>i===index?v.inActive=true:v.inActive=false);
    this.setData({
      tabs
    })
  },
  handleItemChangs(e){
    // 获取被点击的标题索引
    const {index}=e.detail
    // 然后进行改变这样式
    this.changTitleByIndex(index);
    this.setData({
      orders:resizeBy.orders.map(v=>({...v,caeate_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    })
  }
})