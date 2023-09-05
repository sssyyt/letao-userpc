// 管理用户数据相关

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { mloginAPI } from '@/apis/user'
import { getUserInfo } from '@/apis/user'

export const useUserStore = defineStore('user', () => {


  const userToken = ref({})
  const getUserToken = async ({ phoneNumber, password }) => {

    const res = await loginAPI({ phoneNumber, password })
    userToken.value = res
  }

  const getUserTokentwo = async ({ phoneNumber, code }) => {

    const res = await mloginAPI({ phoneNumber, code })
    userToken.value = res
  }
  const userInfo = ref({})


  const getUserData = async () => {
    //console.log('get user info')

    const res = await getUserInfo()
    // console.log(222, res)
    userInfo.value = res

  }

  // 退出时清除用户信息
  const clearUserInfo = () => {
    userToken.value = {}
    userInfo.value = {}
  }
  // 3. 以对象的格式把state和action return
  return {
    userToken,
    userInfo,
    getUserToken,
    getUserTokentwo,
    getUserData,
    clearUserInfo
  }
}, {
  persist: true,
})