// 封装购物车模块
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'
export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.data)
  // 1. 定义state - cartList
  const cartList = ref([])
  const totalprice = ref(0)


  // 获取最新购物车列表action
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res
    console.log('获取最新购物车', cartList.value);
    cartList.value.data.forEach(item => {
      // 计算每一项的 number 与 cartPrice 相乘后的结果
      const itemTotal = item.number * item.cartPrice;

      totalprice.value += itemTotal;

    })
    console.log('计算总价', totalprice.value);

  }
  // 2. 定义action - addCart
  const addCart = async (skuone) => {
    const { skuId, number } = skuone
    if (isLogin.value) {
      //console.log('登录后加入购物车');
      await insertCartAPI({ skuId, number })
     // console.log('加入购物车成功');

      updateNewList()
    } else {
      ElMessage.warning('请先登录')

    }
  }

  // 删除购物车
  const delCart = async (skuId) => {

    if (isLogin.value) {
      // 调用接口实现接口购物车中的删除功能
      await delCartAPI(skuId)
      ElMessage.success('删除成功')
      updateNewList()
    } else {
      ElMessage.warning('请先登录')
    }
  }

  
  return {
    cartList,
    //cartListlength,
    addCart,
    delCart,
    totalprice,
    updateNewList
  }
}, {
  persist: true,
})