<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { onMounted } from 'vue';
import { getproductCategorytwo } from '@/apis/categorytwo'
import { getCategorytwo } from './composables/getaCategorytwo'
//const { bannerList } = useBanner()
const { categorytwo } = getCategorytwo()
const route = useRoute()

// 获取基础列表数据渲染
const goodList = ref([])
const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
})

const getGoodList = async () => {
    const res = await getproductCategorytwo(reqData.value.categoryId, reqData.value.page)
    goodList.value = res.data

}
onMounted(() => getGoodList())

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
        <div class="body">``
            <p>商品列表</p>
            <GoodsItem v-for="goods in goodList.rows" :goods="goods" :key="goods.id" />
        </div>
    </div>
</template>



<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }


}
</style>