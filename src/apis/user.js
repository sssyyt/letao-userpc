// 封装所有和用户相关的接口函数
import request from '@/utils/http'
//获取rsa公钥
export function getRSA() {
  return request({
    url: '/base/rsa'
  })
}

//校验后获取用户信息
export function getUserInfo() {
 // console.log('getUserInfo开始')
  return request({
    url: '/user'
  })
  
}

//获取手机登录验证码
export function getCaptcha(phoneNumber) {
  return request({
    url: '/user/code',
    params: {
      phoneNumber
    }
  })
}

//注册接口
// export function postRegister() {
//   return request({
//     url: '/user'
//   })

// }

//登录获取token
export const loginAPI = ({ phoneNumber, password }) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: {
      phoneNumber,
      password
    }
  })
}

export const mloginAPI = ({ phoneNumber, code }) => {
  return request({
    url: '/user/mlogin',
    method: 'POST',
    data: {
      phoneNumber,
      code
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