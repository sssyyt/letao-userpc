import httpInstance from '@/utils/http'


export const findNewAPI = () => {
  return httpInstance({
    url: '/product/new'
  })
}

/**
 * @description: 获取高销量推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
  return httpInstance({
    url: '/home/hot'
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