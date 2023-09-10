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
  return request({
    url: '/user'
  })

}
export function changeUserInfo({ account,
  sex,
  email }) {

  return request({
    url: '/user',
    method: 'PUT',
    params: {
      account,
      sex,
      email

    }
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
export const postRegister = ({ account, phoneNumber, password, sex, email }) => {
  return request({
    url: '/user/register',
    method: 'POST',
    data: {
      account,
      phoneNumber,
      password,
      sex,
      email
    }
  })
}
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


// export const getLikeListAPI = ({ limit = 4 }) => {
//   return request({
//     url: '/goods/relevant',
//     params: {
//       limit
//     }
//   })
// }


//获取用户默认地址
export const getdefaultAdrAPI = () => {
  return request({
    url: '/user/address',
    method: 'GET'
  })
}


export const uploadimgAPI = (file) => {
  var form = new FormData();
  form.append("file", file);
  // console.log('form', form)
  return request({
    url: '/upload/userImage',
    method: 'POST',
    data: form
  })
}


export const senddefaultAdrAPI = ({ consigneeName, consigneePhoneNumber, consigneeSex, detail }) => {
  return request({
    url: '/user/address',
    method: 'PUT',
    data: {
      provinceId: 0,
      consigneeName,
      consigneePhoneNumber,
      consigneeSex,
      detail
    }
  })
}

