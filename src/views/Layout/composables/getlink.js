// 使用id查询二级分类列表用于面包屑导航
import { ref, watch } from 'vue'
import { getaCategorytwoid } from '@/apis/categorytwo'
import { useRoute } from 'vue-router'

//import { onBeforeRouteUpdate } from 'vue-router'
import { getSKU } from '@/apis/skuget'

// import { toRaw } from 'vue';

export function linkClasses(itemId) {
    const route = useRoute()

    const isActive =ref({})
       isActive.value=( route.path === `/category/${itemId}`)
   
    const parentid = ref({})
    const categorytwo = ref({})
    const getCategory = async (id = route.params.id) => {

        if (route.path === `/category/sub/${id}`) {
            const res = await getaCategorytwoid(id)
            categorytwo.value = res.data
            parentid.value = categorytwo.value.parentId
            console.log('是二级分类', parentid.value);
            isActive.value = (route.path === `/category/sub/${route.params.id}` && `${parentid.value}` === `${itemId}`)
        }

    }
    getCategory();

    const skucategory = ref({})
    const getskuCategory = async (id = route.params.id) => {

        if (route.path === `/detail/${id}`) {
            //console.log('是商品详情');
            const res = await getSKU(id)
            skucategory.value = res.data
            console.log('是商品详情', skucategory.value.oneCategoryId);
            console.log(parentid.value, skucategory.value.oneCategoryId);
            isActive.value = (route.path === `/detail/${route.params.id}` && `${skucategory.value.oneCategoryId}` === `${itemId}`)


        }
    } //console.log('skucategory',skucategory.value.oneCategoryId)
    
    getskuCategory();





    // const isActive =
    //     route.path === `/category/${itemId}` ||
    //     (route.path === `/category/sub/${route.params.id}` && `${parentid.value}` === `${itemId}`) ||
    //     (route.path === `/detail/${route.params.id}` && `${skucategory.value.oneCategoryId}` === `${itemId}`)

   
    watch(
        () => route.params,
        (newValue) => {
            // 存在问题：使用最新的路由参数请求最新的分类数据
            getCategory(newValue),
                getskuCategory(newValue),
                console.log('active', isActive);

        })
    return {
        active: isActive,
    }
}


