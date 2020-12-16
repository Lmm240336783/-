// pages/category/index.js
import { request } from "../../requset/index";
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({
  data: {
    // 左侧数据
    leftMenuList: [],
    // 右侧数据
    rightMenuList: [],
    // 总数据
    Cates: [],
    // 点击的左侧的按钮样式的索引
    currenIndex: 0,
    // 点击右侧的对应位置
    scrolltop:0
  },

  onLoad: function (options) {
    const Cates =wx.getStorageSync('cates')
    if(!Cates){
          this.getMenuList();
    }else{
      if(Date.now()-Cates.time>1000*5){
          this.getMenuList();
      }else{
        this.Cates=Cates.data;
      }
    }
  },
  async getMenuList() {
    // request({ url: "https://www.uinav.com/api/public/v1/categories" })  第一次写法
    // request({ url: "/categories" })  第二次写法 封装简化
      // .then(result => {
      //   this.setData({
      //     MenuList: result.data.message
      //   })
      // })
      // .then(res => {
      //   this.Cates = res.data.message;
      //   // 获取数据 然后赋值给cates
      //   // 将Cates 进行本地存储 起名叫cates 添加个时间 当前的时间 数据是赋值后的数据
      //   wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
      //   // 循环整个Cates 将满足cat.name的条件的数据 返回给leftMenuList左边部分的数据
      //   let leftMenuList = this.Cates.map(v => v.cat_name);
      //   // 将Cates的第一个数组中的children赋值给rightMenuList右边部分的数据
      //   let rightMenuList = this.Cates[0].children;
      //   this.setData({
      //     // 赋值
      //     leftMenuList,
      //     rightMenuList
      //   })
      // })
      const res = await request({url:"/categories"}) /* es7语法*/
        this.Cates = res;/**简化后 */
        // this.Cates = res.data.message;简化前
        wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightMenuList = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightMenuList
        })
  },
  meuntClick(e) {
    // 定义 index等于 当前元素点击的索引
    const { index } = e.currentTarget.dataset;
    // 然后请求对应的children的数据复制给rightMenuList
    let rightMenuList = this.Cates[index].children;
    this.setData({
      rightMenuList,
      // 将index的值付给currenIndex 然后判断对应元素的索引是不是等于当前元素的索引 如果相等就 给它设置点击样式
      currenIndex: index,
      scrolltop:0

    })

  }
})