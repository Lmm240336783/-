import { request } from "../../requset/index";
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({
  data: {
    // 筛选后的的值
    goodsInfo:{
    },
    isCollect:false,
    // 整个数组的值
    goodobj:{
    }
  },
  onShow: function () {    
    // 获取页面栈中的 索引id 
    let Ages= getCurrentPages();
    let currentPage=Ages[Ages.length-1];
    let options=currentPage.options    
    const {goods_id}=options 
    // 执行获取函数并且传个id
    this.goodsInfo(goods_id);
  },
  // 图片点击事件
  imageFda(e){
    // 获取要放大的图片数组 从e中获取然后筛选符合中屏的图片返回
    const urls =this.data.goodobj.pics.map(v=>v.pics_mid)    
    const current=e.currentTarget.dataset.url
    //  图片方法
    wx.previewImage({
      // 从第几位开始显示
      current,
      // 图片地址
      urls
    })
  },  
  // 请求数据
  async goodsInfo(goods_id){  
    const goodsInfo = await request({url:"/goods/detail",data:{goods_id}})
    this.goodsInfo=goodsInfo
    this.data.goodobj=goodsInfo;
    //获取本地存储中的收藏数组 
    let collect = wx.getStorageSync('collect')||[];
    // some 会接受一个回调函数 只要返回一个true 就等于true
    // 判断获取的本地存储中和这个页面的id是否相等 如果相等就是被选
    let isCollect=collect.some(v=>v.goods_id===this.goodsInfo.goods_id)
     this.setData({
      goodsInfo:{
        goods_name:goodsInfo.goods_name,
        goods_price:goodsInfo.goods_price,
        goods_introduce:goodsInfo.goods_introduce.replace(/\.webp/g,".jpg"),
        pics:goodsInfo.pics
      },
      isCollect
    })        
  },
  handCatAdd(){
    // 转换格式 确保是个数组格式
    let cart=wx.getStorageSync("cart") ||[];
    // 判断当前数组对象是否存在 如果存在的话 返回当前对象真正的索引 ，否则返回-1
    let index=cart.findIndex(v=>v.goods_id===this.data.goodobj.goods_id)
    if(index===-1){
      //不存在 就第一次添加 定义 次数=1 然后push到本地存储cart中
      this.data.goodobj.num=1
      this.data.goodobj.checked=true;
      cart.push( this.data.goodobj)
    }
    // 否则 本地存储中相对应的次数++
    else{
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '已经添加了',
      // 防止用户乱点
      mask:true,
      icon:'success',
    })
  },
  // 收藏
  handCollect(){
    let isCollect=false;
    let collect = wx.getStorageSync('collect')||[]    
    let index = collect.findIndex(v=>v.goods_id===this.goodsInfo.goods_id)
    console.log(index)
    if(!index){
      // 已经收藏过了 变成未收藏 并且删除该内容
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '已取消收藏',
        mask:true
      })
    }else{
      // 未收藏 变成已收藏 并且添加该内容
      collect.push(this.goodsInfo)
       isCollect=true;
      wx.showToast({
        title: '已添加至收藏',
        mask:true

      })
    }
    wx.setStorageSync('collect', collect) 
    this.setData({
      isCollect
    })   
  }
  /**
   *     let isCollect=false;
    // let collect = wx.getStorageSync('collect')||[] 
    const token=wx.getStorageSync('token')
    let cid=this.goodsInfo.goods_id
    this.setData({
      token,
      cid
    })
    let that=this
    if(check){
      this.data.check=true
      wx.request({
        // url: 'http://192.168.137.124:3000/favorites',
        url:`http://192.168.137.124:3000/favorites/${this.goodsInfo.goods_id}`,
        method:"GET",
        header:{
          token
        },
        data:{
          // cid:this.data.cid
        },
        success(res){
          that.setData({
            check:res.data.favorites ? true : false
        }) 
        },
      })
    }else{

    }
   */
})