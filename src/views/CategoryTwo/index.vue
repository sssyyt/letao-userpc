<script setup>
import { ref, toRaw } from 'vue';
import { useRoute } from 'vue-router'
import { onMounted } from 'vue';
import GoodsItem from '../Home/components/GoodsItem.vue';
import { getproductCategorytwo } from '@/apis/categorytwo'
import { getCategorytwo } from './composables/getaCategorytwo'
//const { bannerList } = useBanner()
const { categorytwo } = getCategorytwo()
const route = useRoute()

// 获取基础列表数据渲染
const goodList = ref({})
const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
})
const productlist=ref([])
const getGoodList = async () => {
    const res = await getproductCategorytwo(reqData.value.categoryId, reqData.value.page)
    goodList.value = res
    var te=toRaw(goodList)
    productlist.value = te.value.data.rows

}


onMounted(() => getGoodList())


const disabled = ref(false)
const load = async () => {
    console.log('加载更多数据咯')
    // 获取下一页的数据
    reqData.value.page++
    const res = await getproductCategorytwo(reqData.value.categoryId, reqData.value.page)

    goodList.value = res
    console.log(goodList.value.data.rows.length)

    productlist.value = [...productlist.value, ...goodList.value.data.rows]
    // 加载完毕 停止监听
    if (goodList.value.data.rows.length === 0) {
        disabled.value = true
        console.log('加载完毕 停止监听')
    }
}


</script>

<template>
    <div class="container ">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/${categorytwo.parentId}` }">{{ categorytwo.parentName }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ categorytwo.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
         <p>商品列表 </p>
        <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
            <GoodsItem v-for="goods in productlist" :goods="goods" :key="goods.id" />
        </div>
    </div>
</template>



<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
     display: flex;
}


    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 100px;
    }

   
</style>