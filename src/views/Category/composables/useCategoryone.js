// 封装分类数据业务相关代码
import { onMounted, ref } from 'vue'
import { getCategoryoneid } from '@/apis/categoryone'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'

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