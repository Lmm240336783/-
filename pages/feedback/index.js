Page({
  data: {
    tabs:[
      {
        id:0,
        value:'体验问题',
        inActive:true
      },
      {
        id:1,
        value:'商品、商家投诉',
        inActive:false
      },
    ],
    // 选择的图片
    Imgarr:[],
    // 上传的图片路径数组
    UpImg:[],
    // 文本
    textval:""
  },
  onLoad: function (options) {
  },
  // 选中状态
  handleItemChangs(e){
    const {index}=e.detail
    let {tabs}=this.data;
    // 循环筛选 
    tabs.forEach((v,i) =>i===index?v.inActive=true:v.inActive=false);
    this.setData({
      tabs
    })
  },
  // 选择图片
  handChooseImg(){
    wx.chooseImage({
      count: 0,//最多几张
      sizeType:['original','compressed'],//图片格式  original默认  compressed还是还是压缩后的
      SourceBuffer:['album','camera'],//来源 album相机 camera相册
      success:(result)=>{
 
        this.setData({
          Imgarr:[...this.data.Imgarr,...result.tempFiles] //拼接
        })
      },
    })
  },
  // 删除图片
  handImg(e){
    const {index}=e.currentTarget.dataset
    let {Imgarr}=this.data
    Imgarr.splice(index,1)
    this.setData({
      Imgarr
    })
  },
  // 获取文本
  handleTextval(e){
    this.setData({
      textval:e.detail.value
    })
  },
  // 提交
  sumBit(){
    // 获取文本
    const {textval,Imgarr}=this.data
    // 判断合法性
    if(!textval.trim()){
        wx.showToast({
          title: '输入不合法',
          icon: 'none',
          mask: true,
        });
        return
    }   
    if(this.data.Imgarr.length != 0){
      this.setData({
        Imgarr:[]
      })
      Imgarr.forEach((v,i)=>{
        wx.uploadFile({
          filePath: v,          // 被上传的路径 
          name: 'image',          // 名字 和后端约定好
          url: 'https://images.ac.cn/Home/index/UploadAction',          // 传到哪里
          formData:"",          // 上传时的文本信息
          success:(result)=>{
            let url=JSON.parse(result.data)
            this.UpImg.push(url).url; //被上传的路径的数组
            if(index===Imgarr.length-1){
              wx.showToast({
                title: '提交成功',
              }),
              this.setData({
                textval:"",
                Imgarr:""
              })
              // wx.navigateBack({
              //   delta: 1,
              // })
              
            }
          },
          fail:(err)=>{
            wx.hideLoading()
            wx.showToast({
              title: '提交失败',
            }),
            this.setData({
              textval:"",
              Imgarr:""
            })
            // setTimeout(()=>{
            //   wx.navigateBack({
            //     delta: 1,
            //   })
            // },1000)
          }
        })
      })
    }else{
      wx.showToast({
        title: '只是提交了文字',
      })
        }
  }
})