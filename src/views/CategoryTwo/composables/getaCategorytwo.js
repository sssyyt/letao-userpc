// 使用id查询二级分类列表用于面包屑导航
import { onMounted, ref } from 'vue'
import { getaCategorytwoid } from '@/apis/categorytwo'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'
// import { toRaw } from 'vue';

export function getCategorytwo() {
    // 获取分类数据
    const parentid = ref({})

    const categorytwo = ref({})
   // categorytwo.value = { id: 0 }
    //let categorytwovalue;
    const route = useRoute()
    const getCategory = async (id = route.params.id) => {
        const res = await getaCategorytwoid(id)
       // console.log('data', res)
        // console.log('result', res.result)
        categorytwo.value = res.data
        parentid.value = categorytwo.value.parentId
       // console.log('parentid', parentid.value)

        // categorytwo.value = JSON.stringify(res.code)
        //console.log(83749, categorytwo.value);
        //categorytwovalue = categorytwo.value
        //console.log(837483749279, categorytwovalue);
        // categorytwo.value = res.data
        // var te = toRaw(categorytwo)
        // categorytwo.value = te.value'

    }
    onMounted(() => getCategory())

    // 目标:路由参数变化的时候 可以把分类数据接口重新发送
    onBeforeRouteUpdate((to) => {
        // 存在问题：使用最新的路由参数请求最新的分类数据
        getCategory(to.params.id)
    })
    return {
        categorytwo,
        parentid
        //categorytwovalue
    }
}