// 使用id查询二级分类列表用于面包屑导航
import { onMounted, ref } from 'vue'
import { getCategorytwoid } from '@/apis/categorytwo'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'
//通过id获取二级分类数据
export function useCategorytwo() {
    const categorytwo = ref([])
    const route = useRoute()
    const getCategory = async (id = route.params.id) => {
        const res = await getCategorytwoid(id)
        categorytwo.value = res.data

    }
    onMounted(() => getCategory())

    // 目标:路由参数变化的时候 可以把分类数据接口重新发送
    onBeforeRouteUpdate((to) => {
        // 存在问题：使用最新的路由参数请求最新的分类数据
        getCategory(to.params.id)
    })
    return {
        categorytwo
    }
}