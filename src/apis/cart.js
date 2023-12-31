// 封装购物车相关接口
import request from '@/utils/http'

// 加入购物车
export const insertCartAPI = ({ skuId, number }) => {
  return request({
    url: '/user/cart',
    method: 'POST',
    data: {
      skuId,
      number
    }
  })
}

// 获取最新的购物车列表
export const findNewCartListAPI = () => {
  return request({
    url: '/user/cart'
  })
}

// 删除购物车
export const delCartAPI = (skuId) => {
  return request({
    url: '/user/cart',
    method: 'DELETE',
    params: {
      skuId
    }
  })
}


export const sendorderAPI = ({ orderInfo: {
  paymentMethod,
  deliveryMethod,
  shopId
} }) => {
  return request({
    url: '/order',
    method: 'POST',
    data: {
      orderInfo: {
        paymentMethod,
        deliveryMethod,
        shopId
      }
    }
  })
}


// 合并购物车

// export const mergeCartAPI = (data) => {
//   return request({
//     url: '/member/cart/merge',
//     method: 'POST',
//     data
//   })
// }