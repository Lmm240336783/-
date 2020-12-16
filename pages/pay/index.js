import {requestPayment } from "../../utils/asyncWx.js"
import { request } from "../../requset/index";

Page({
  data: {
    // 地址
    address:{},
    // 购物车
    cart:[],
    // 总数量
    totalnum:0,
    // 总价格
    totalprice:0,
  },
  onShow(){
    // 获取本地中的地址内容
    const address=wx.getStorageSync('address')
    this.setData({
      address
    })
    // 获取本地存储中的购物车数据 ||[] 确保返回是个数组
    let cart =wx.getStorageSync('cart')||[];
    // 过滤被选中的商品
    cart=cart.filter(v=>v.checked)
    this.setCart(cart);
  }, 
  // 将计算价格和数量写成一个函数
  setCart(cart){
    let totalnum = 0;
    let totalprice = 0;
    //判断是否选中
    cart.forEach(v => {
        totalnum+=v.num*v.goods_price;
        totalprice+=v.num
    });
      this.setData({
        cart,
        totalprice,
        totalnum,
      })
  },
   async paymoney(){
    const token=wx.getStorageSync('token')
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    }
    // 准备请求需要的参数 token 码 价格 地址
    // const header={Authorization:token};
    // const order_price=this.data.totalPrice;
    // const consignee_addr =this.data.address;
    // const cart=this.data.cart;
    // console.log(header);
    
    // let goods=[];
    // cart.forEach(v=>goods.push({
    //   goods_id:v.goods_id, //id号
    //   goods_number:v.num,//数量
    //   goods_price:v.goods_price//价格
    // }))
    // const orderParams = {order_price,consignee_addr,goods};    //传的值
    // // 准备发送请求 创建订单 获取订单编号
    // const {order_number} = await request ({url:"/my/orders/create",method:"POST",data:orderParams,header})
    // console.log(order_number);    
    // 发起预支付
    // const {pay}=await request({url:"/my/orders/req_unifiedorder",method:"POST",header,data:"{order_number}"})
    //   // 将pay的值传入微信小程序内置api内
    // const res= await requestPayment(pay);
    // // 查看订单是否成功
    // const res =await request({url:"/my/orders/chkOrder",method:"POST",header,data:"{{order_number}}"})
    if(this.data.cart.length===0){
      wx.showToast({
        title: '请先选择商品',
        icon:"none"
      })
    }else{
      wx-wx.showModal({
        cancelText: '取消支付',
        confirmText: '确定支付',
        content: '你确定要付钱嘛',
        showCancel: true,
        title: '确定是否支付',
        success: (res) => {
          if(res.confirm){
            wx.showToast({
              title: '支付成功',
            })
            // 获取缓存中的数据 将没有选中的数据保留下来
            let newCart=wx.getStorageSync('cart')
            newCart=newCart.filter(v=>!v.checked)
            wx.setStorageSync('cart', newCart)
            setTimeout(()=>{
              wx.navigateTo({
                url: '/pages/order/index',
              },3000)
            })
          }else if(res.cancel){
            wx.showToast({
              title: '支付失败',
              icon:'none'
            })
          }
        },
      })
    }  
  }
})
