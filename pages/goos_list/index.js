import { request } from "../../requset/index";
Page({
  data: {
    tabs:[
      {
        id:0,
        value:'综合',
        inActive:true
      },
      {
        id:1,
        value:'销量',
        inActive:false
      },
      {
        id:2,
        value:'价格',
        inActive:false
      }
    ],
    QueryParams:{
      query:"",
      cid:"5",
      pagenum:1,
      pagesize:10
    },
    // 所有数据
    AllData:[
    ],
    // 
    totalPages:1,
  },
  onLoad: function (options) {
    this.data.QueryParams.cid=options.cid||'';
    this.data.QueryParams.query=options.query||'';

    this.getGoodsList();        
  },
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.data.QueryParams}) /* es7语法*/
    // 获取数据数量    
    const total=res.total
    this.setData({
      // 拼接数组
      AllData:[...this.data.AllData,...res.goods],
      // 计算页面页数
      totalPages:Math.ceil(total/(this.data.QueryParams.pagesize))
        }) 
        wx.stopPullDownRefresh()   
  },
  // 上拉 获取更多数据
  onReachBottom(){
    // 判断当前页面的页数是否大于等于当前获取的总页面页数
    if(this.data.QueryParams.pagenum>=this.data.totalPages){
      // 如果小于等于就提示内容
      wx:wx.showToast({
        title: '没有小蝌蚪了',
        duration: 1500,
      })
    }
    else(
      // 否则就页面的页数++ 然后重新请求数据
      this.data.QueryParams.pagenum++,
      this.getGoodsList()
    )
  },
  // 下拉刷新清空数组将页面页数改成1 重新获取数据 然后提示个内容
  onPullDownRefresh(){
    this.setData({
      AllData:[]
    })
    this.data.QueryParams.pagenum=1
    this.getGoodsList();
  },
  // 子组件传递过来的实践 标题点击事件
  handleItemChangs(e){
    const {index}=e.detail
    let {tabs}=this.data;
    // 循环筛选 
    tabs.forEach((v,i) =>i===index?v.inActive=true:v.inActive=false);
    this.setData({
      tabs
    })
  }
})