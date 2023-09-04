// 封装所有和用户相关的接口函数
import request from '@/utils/http'

export function getRSA() {
  return request({
    url: '/base/rsa'
  })
}

export const loginAPI = ({ phoneNumber, password }) => {
  console.log(999,phoneNumber, password)
  return request({
    url: '/user/login',
    method: 'POST',
    data: {
      phoneNumber,
      password
    }
  })
}


export const getLikeListAPI = ({ limit = 4 }) => {
  return request({
    url: '/goods/relevant',
    params: {
      limit
    }
  })
}