// 封装购物车模块
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'
export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userToken.code)
  // 1. 定义state - cartList
  const cartList = ref([])
  const totalprice = ref(0)


  // 获取最新购物车列表action
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res
    totalprice.value = 0
    console.log('获取最新购物车', cartList.value);
    cartList.value.data.forEach(item => {

      const itemTotal = item.number * item.cartPrice;

      totalprice.value += itemTotal;

    })
    console.log('计算最新总价', totalprice.value);

  }
  // 2. 定义action - addCart
  const addCart = async (skuone) => {
    const { skuId, number } = skuone
    if (isLogin.value===1) {

      await insertCartAPI({ skuId, number })

      updateNewList()

    } else {
      ElMessage.warning('请先登录')
      console.log('想加入购物车但是还没有登录');
    }
  }

  // 删除购物车
  const delCart = async (skuId) => {

    if (isLogin.value===1) {
      // 调用接口实现接口购物车中的删除功能
      await delCartAPI(skuId)
      ElMessage.success('删除成功')
      updateNewList()
    } else {
      ElMessage.warning('请先登录')
      
    }
  }

  const clearInfo = () => {

    totalprice.value = 0
    // cartList.value.data.length = 0

    console.log('cart clear', cartList, 'login', isLogin.value);
  }


  return {
    isLogin,
    cartList,
    //cartListlength,
    addCart,
    delCart,
    totalprice,
    updateNewList,
    clearInfo
  }
}, {
  persist: true,
})