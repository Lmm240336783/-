Page({
  data: {
    tabs:[
      {
        id:0,
        value:'收藏的店铺',
        inActive:true
      },
      {
        id:1,
        value:'收藏的商店',
        inActive:false
      },
      {
        id:2,
        value:'关注的商品',
        inActive:false
      },
      {
        id:3,
        value:'我的足迹',
        inActive:false
      }
      
    ],
    collect:[],
    // token:"",
    // date:{
    //   cid:"395"
    // }
  },
  // onLoad:function(){
  //   //395 38
  //   let collect = wx.getStorageSync('collect')||[]
  //   let data=collect.map(v=>v.goods_id)

  //   const token=wx.getStorageSync('token')
  //   console.log(token);
  //   this.setData({
  //     collect,
  //     data,
  //     token
  //   })
  //   wx.request({
  //     url: 'http://192.168.137.124:3000/favorites',
  //     method:"PUT",
  //     header:{
  //       token
  //     },
  //     data:{
  //       cid:this.data.date.cid
  //     },
  //     success(res){
  //       console.log(res.data);
  //     },
  //   })
  // },
  
  onShow:function(){
  let collect = wx.getStorageSync('collect')||[]
  this.setData({
    collect
  })
  },
  handleItemChangs(e){
    // 获取被点击的标题索引
    const {index}=e.detail 
    // 然后进行改变这样式
    // 获取点击的标题索引 然后循环 将i不等于传过来的索引的选中状态都变成false
    // 循环筛选 

    let {tabs}=this.data;
    tabs.forEach((v,i) =>i===index?v.inActive=true:v.inActive=false);
    this.setData({
      tabs
    })
  }
})