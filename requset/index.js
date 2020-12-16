let ajaxTime=0;
// 定义请求次数
export const request=(params)=>{
  // 每次执行一次就++一次
  ajaxTime++;
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  const baseUrl="https://www.uinav.com/api/public/v1"
  // resolve 成功的时候执行的函数
  // reject 失败的时候执行的函数
  //封装请求函数 Promise 
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseUrl+params.url,
      success: (result) => {
        resolve(result.data.message);
      },
      fail: (err) => {
        reject(err)
      },
      // 不管是失败还是成功都执行
      complete: (res) => {
        // 不管成功还是失败都减一次
        ajaxTime--;
        if(ajaxTime===0){
          // 关闭当前loading图标
          wx.hideLoading();
        }
      },
    })
  })
}