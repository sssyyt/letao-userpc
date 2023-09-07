// 封装购物车模块
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI } from '@/apis/cart'
export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.data)
  // 1. 定义state - cartList
  const cartList = ref([])
  // 获取最新购物车列表action
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }
  // 2. 定义action - addCart
  const addCart = async (skuone) => {
    const { skuId, number } = skuone
    if (isLogin.value) {
      //console.log('登录后加入购物车');
      await insertCartAPI({ skuId, number })
      updateNewList()
    } else {
      ElMessage.warning('请先登录')

    }
  }


  return {
    cartList,

    addCart,
    // delCart,

    updateNewList
  }
}, {
  persist: true,
})