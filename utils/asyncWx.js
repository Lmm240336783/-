// 查看地址授权状态
export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}
// 选择地址
export const chooseAddress=()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}
// 授权
export const openSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}
/**
 * 
 * @param {{content}} param0 
 */
export const showModal=({content})=>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      content:content,
      success:(res)=>{
        resolve(res);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}
/**
 * Promise形式的login
 */
export const login=()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }

    })
  })

}
/**
 * Promise 形式的requestPayment 支付必要的参数 微信支付
 * @param {object} pay  
 */
export const requestPayment=(pay)=>{
  return new Promise((resolve,reject)=>{
    wx.requestPayment({
      ...pay
    })
    success:(result)=>{
      resolve(result)
    }
    fail:(err)=>{
      reject(err)
    }
  })

}