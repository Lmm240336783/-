import { request } from "../../requset/index";
Page({
  data: {
    // 所有请求的数据
    allData:[
    ],
    // 防抖参数 随便写
    TImeid:-1,
    isFocus:false,
    value:'',
  },
  handinput(e){
    const {value}=e.detail
    // trim检验字符是否合法 去除左右两边的空字符
    if(!value.trim()){
      this.setData({
        isFocus:false,
        allData:[],
      }) 
    }else{
      this.setData({
        isFocus:true   
      })
    }
    // 防抖 确定输入完后进行请求
    clearTimeout(this.TImeid)
    this.TImeid=setTimeout(()=>{
      this.qsearch(value)
    },1000)
  },
  async qsearch(query){
    const res=await request({url:"/goods/qsearch",data:{query}})
    this.setData({
      allData:res
    })
  },
  cancel(){
    this.setData({
      allData:[],
      isFocus:false,
      value:''
    }) 
  }
})