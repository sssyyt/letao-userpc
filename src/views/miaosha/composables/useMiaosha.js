// 封装分类数据业务相关代码
import { onMounted, ref } from 'vue'
import { findmiaoshaAPI } from '@/apis/miaosha'


export function usemiaosha() {
  const miaoshaRe = ref({})
  const miaoshaList = ref([])

  const reqData = ref({
    page: 1,
    pageSize: 20,
  })
  const disabled = ref(false)

  const getMiaoshaList = async (  page =  reqData.value.page ) => {
    // console.log(reqData.value.categoryId,reqData.value.page, '     重新调用接口       ')
    const res = await findmiaoshaAPI( page)
    miaoshaRe.value = res.data
    miaoshaList.value = miaoshaRe.value.rows
  }
  onMounted(() => getMiaoshaList())



  const load = async () => {
    reqData.value.page++
    const res = await findmiaoshaAPI( reqData.value.page)
    miaoshaRe.value = res.data
    miaoshaList.value = [...miaoshaList.value, ...miaoshaRe.value.rows]
  
    if (miaoshaRe.value.rows.length === 0) {
      disabled.value = true
    }
  }



  // 目标:路由参数变化的时候 可以把分类数据接口重新发送

  return {
    load,
    disabled,
    reqData,
    miaoshaRe,
    miaoshaList
  }
}


