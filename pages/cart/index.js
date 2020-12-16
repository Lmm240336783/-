import { getSetting,chooseAddress,openSetting,showModal } from "../../utils/asyncWx.js"
Page({
  data: {
    // 地址
    address:{},
    // 购物车
    cart:[],
    // 全选
    // 总数量
    totalnum:0,
    // 总价格
    totalprice:0,
    Allchecked:true,
    totalinfp:""
  },
  onShow(){
    // 获取本地中的地址内容
    const address=wx.getStorageSync('address')
    this.setData({
      address
    })
    // 获取本地存储中的购物车数据 ||[] 确保返回是个数组
    const cart =wx.getStorageSync('cart')||[];
    // every数组方法 会遍历 会接受一个回调函数 如果每一个回调函数都返回true 那么every方法的方法返回值为true
    // 只要有一个回调函数 返回了false 那么就不会再循环执行 直接返回false
    // 耗费性能
    const Allchecked=cart.length?cart.every(v=>v.checked):false;
    this.setCart(cart);
  },
  // 复选框 函数
  checkChang(e){
    // 获取商品id
    const goods_id=e.currentTarget.dataset.id
    // 获取购物车数组
    let {cart}=this.data;
    // 查找被修改的id
    let index=cart.findIndex(v=>v.goods_id===goods_id)     
    // 选中状态取反
    cart[index].checked=!cart[index].checked
    // 把购物车数据重新设置到data和本地存储中    
    this.setCart(cart);
    
  },  
  // 全选函数
  Allcheckedchang(){
    // 获取data数据
    const {cart,Allchecked}=this.data;
    // 点击取反
     this.Allchecked =!this.Allchecked,
    //循环cart数组
    cart.forEach(v=>v.checked=this.Allchecked);
    // 存值
    this.setCart(cart)    
  },
  // 点击获取地址 第一种方法 
  // getInfo(){
  //   //调用小程序内置api借口 获取用户收货地址
  //   wx.getSetting({
  //       success: (result) => {
  //         const scopeAddress =result.authSetting["scope.address"];
  //         if(scopeAddress===true||scopeAddress===undefined){
  //           wx.chooseAddress({
  //             success: (resultone) => {
  //             },
  //           })
  //         } 
  //         else{
  //           wx.openSetting({
  //             success:(resulttwo)=>{
  //               wx.chooseAddress({
  //                 success: (resultthree) => {},
  //               })
  //             }
  //           })
  //         }
  //     },
  //   })
  // },
  // 第二种方法优化前
  // async getInfo(){
  //   // 获取权限 第二种方法
  //   const resone = await getSetting();
  //   const scopeAddress =resone.authSetting["scope.address"];
  //   // 判断权限状态
  //   if(scopeAddress===true||scopeAddress===undefined){
  //     //调用获取收货地址
  //     const restwo = await chooseAddress();
  //     console.log(restwo);
  //   }else{
  //     // 如果没有权限就 打开授权
  //     await openSetting();
  //     // 授权完成后重新选择地址
  //     const restwo = await chooseAddress();
  //     console.log(成功);
  //   }
  // },  
  // 获取权限 第二种方法 优化后
  async getInfo(){
    const resone = await getSetting();
    const scopeAddress =resone.authSetting["scope.address"];
    
    // 判断权限状态  如果没有权限就 打开授权 然后重新获取地址 如果有权限就 选择地址 
    if(scopeAddress===false){
      await openSetting();
    }
    let address = await chooseAddress();
    address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo
    // 存入到本地缓存中
    wx.setStorageSync('address', address)
  },
  // 将计算价格和数量写成一个函数
  setCart(cart){
    wx.setStorageSync('cart', cart);
    let Allchecked=true
    let totalnum = 0;
    let totalprice = 0;
    //判断是否选中
    cart.forEach(v => {
      if(v.checked){
        totalnum+=v.num*v.goods_price;
        totalprice+=v.num
      }else{
        Allchecked=false
      }
    });
      Allchecked=cart.length!=0?Allchecked:false;  
      this.setData({
        cart,
        totalprice,
        totalnum,
        Allchecked
      })
  },
  // 加减按钮
  itemNumEdit(e){
    // 获取id 和 加减
    const {operation,id}=e.currentTarget.dataset    
    // 获取cart
    let {cart}=this.data;
    // 获取购物车传来的id是本地存储中的第几位
    const index=cart.findIndex(v=>v.goods_id===id)  
    if(cart[index].num===1 && operation===-1||cart[index].num<1){
      wx.showModal({
        title: '提示',
        content: '你还要吗',
        cancelColor: '#576B95',
        cancelText: '我还可以',
        confirmColor: '#33333',
        confirmText: '真没有了',
        success: (res) => {
          if(res.confirm){
            cart.splice(index,1);
            this.setCart(cart)
          }else if(res.cancel){
          }
        },
      })
      // 封装的第二种方法
      // async
      // const res= await showModal({content:"你还要吗"})
      // if(res.confirm){
      //  cart.splice(index,1);
      //  this.setCart(cart)
      // }
    }else{
      cart[index].num+=operation,
      this.setCart(cart);
    }
  },
  // 结算
  Settlement(){
    const {address,totalnum} =this.data
    if(!address.userName){
      wx.showToast({
        title: '您还没选择地址',
        icon:"none",
      })
      return
    }
    if(totalnum===0){
      wx.showToast({
        title: '您还没选择商品',
        icon:"none"
      })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }
})
