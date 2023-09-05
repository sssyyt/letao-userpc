// 封装分类数据业务相关代码
import { onMounted, ref, watch } from 'vue'
import { getCategoryoneid, getproductCategoryone } from '@/apis/categoryone'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'
import { toRaw } from 'vue';

//通过id获取一级分类数据
export function useCategoryone() {
  // 获取分类数据
  const categoryone = ref({})
  const route = useRoute()
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryoneid(id)
    categoryone.value = res.data
  }
  onMounted(() => getCategory())


  // 目标:路由参数变化的时候 可以把分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    // 存在问题：使用最新的路由参数请求最新的分类数据
    getCategory(to.params.id)
  })
  return {
    categoryone
  }
}

export function useCategoryoneproduct() {
  const goodList = ref({})
  const route = useRoute()
  const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
  })

  const disabled = ref(false)
  const load = async () => {
    reqData.value.page++
    console.log(reqData.value.page);
    const res = await getproductCategoryone(reqData.value.categoryId, reqData.value.page)
    goodList.value = res
    productlist.value = [...productlist.value, ...goodList.value.data.rows]
    // 加载完毕 停止监听
    if (goodList.value.data.rows.length === 0) {
      disabled.value = true
      //console.log(reqData.value.page, '     加载完毕 停止监听       ')
    }
  }
  const productlist = ref([])
  const getGoodList = async ({ oneCategoryId = reqData.value.categoryId, page = reqData.value.page }) => {
    // console.log(reqData.value.categoryId,reqData.value.page, '     重新调用接口       ')
    const res = await getproductCategoryone(oneCategoryId, page)
    goodList.value = res
    var te = toRaw(goodList)
    productlist.value = te.value.data.rows
  }
  onMounted(() => getGoodList())

  // 目标:路由参数变化的时候 可以把分类数据接口重新发送


  watch(
    () => route.params,
    (newValue) => {
      disabled.value = false
      reqData.value.categoryId = newValue.id
      //console.log(124314,newValue.id);
      reqData.value.page = 1
      getGoodList({ id: newValue, page: reqData.value.page })
    },
    { immediate: true }
  )


  return {
    load,
    disabled,
    reqData,
    productlist,
    goodList
  }
}
