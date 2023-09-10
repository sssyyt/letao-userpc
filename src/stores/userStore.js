// 管理用户数据相关

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { mloginAPI } from '@/apis/user'
import { getUserInfo, changeUserInfo } from '@/apis/user'
import { ElMessage } from 'element-plus'
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

    const res = await getUserInfo()
    userInfo.value = res

  }

  const changeUserData = async ({ editedUserInfo, isEditing }) => {
    const { account,
      sex,
      email } = editedUserInfo.value
    const res = await changeUserInfo({
      account,
      sex,
      email
    })
    if (res.code === 1) {
      console.log('修改用户信息????', res);

      userInfo.value = res
      const res2 = await getUserInfo()

      console.log('获取用户信息', res2);

      userInfo.value = res2
      ElMessage.success('修改用户信息成功')
      isEditing.value = false;
      console.log('修改用户信息成功', userInfo.value);
    }
    else {
      console.log('修改用户信息失败', res);
      ElMessage.warning('修改用户信息失败')
    }

  }


  
  // 退出时清除用户信息
  const clearUserInfo = () => {
    userToken.value = {}
    userInfo.value = {}
    userToken.value.code = 0
    // cartStore.clearInfo()

  }
  // 3. 以对象的格式把state和action return
  return {
    userToken,
    userInfo,
    getUserToken,
    getUserTokentwo,
    getUserData,
    clearUserInfo,
    changeUserData
  }
}, {
  persist: true,
})