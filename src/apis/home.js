import httpInstance from '@/utils/http'

//获取最新上线商品
export const findNewAPI = () => {
  return httpInstance({
    url: '/product/new'
  })
}


export const getHotAPI = () => {
  return httpInstance({
    url: '/product/hot'
  })
}

// /**
//  * @description: 获取所有商品模块
//  * @param {*}
//  * @return {*}
//  */
// export const getGoodsAPI = () => {
//   return httpInstance({
//     url: '/home/goods'
//   })
// }