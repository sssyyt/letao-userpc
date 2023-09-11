<script setup>
import { getsearch } from '@/apis/search'
import { ref, onMounted } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

import { useRoute } from 'vue-router'
import GoodsItem from '/Users/shiyutian/letao/letao_userpc/src/views/Home/components/GoodsItem.vue'
const route = useRoute()
//const queryParam = toRef(route.currentRoute.value.params, 'query');
const searchlist = ref([])
const getsearchlist = async () => {
    const res = await getsearch({ query: route.params.query })
    console.log(res);

    searchlist.value = res.data.rows
    console.log(searchlist.value);
}
onMounted(() => getsearchlist())
onBeforeRouteUpdate((to) => {
    // 存在问题：使用最新的路由参数请求最新的分类数据
    getsearchlist(to.params.id)
})
</script>

<template>
    <div class="top-category">
        <div class="container m-top-20">
            <!-- 面包屑 -->
            <div class="bread-container">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ route.params.query }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

        </div>

        <div class="sub-list">
            <h3>搜索推荐 </h3>
            <div class="body">
                <GoodsItem v-for="goods in searchlist" :goods="goods" :key="goods.id" />
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.top-category {
    h3 {
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
    }

    .sub-list {

        background-color: #fff;

        .body {
            display: flex;
            padding: 0px 32px;
            flex-wrap: wrap;
            justify-content: center;

            //justify-content: space-around;
            //padding: 0 40px 30px;
        }

        ul {
            display: flex;
            padding: 0px 32px;
            flex-wrap: wrap;
            justify-content: center;

            li {
                width: 168px;
                height: 160px;
                display: flex;
                /* 将li设置为Flex容器 */
                justify-content: center;
                /* 将子元素水平居中对齐 */

                a {
                    display: block;
                    font-size: 16px;

                    img {
                        width: 100px;
                        height: 100px;
                    }

                    p {
                        line-height: 60px;
                        text-align: center;
                    }

                    &:hover {
                        color: $letaoColor;
                    }
                }
            }
        }
    }

    .ref-goods {
        background-color: #fff;
        margin-top: 20px;
        position: relative;

        .head {
            .letao-more {
                position: absolute;
                top: 20px;
                right: 20px;
            }

            .tag {
                text-align: center;
                color: #999;
                font-size: 20px;
                position: relative;
                top: -20px;
            }
        }

        .body {
            display: flex;
            justify-content: space-around;
            padding: 0 40px 30px;
        }
    }

    .bread-container {
        padding: 25px 0;
    }
}

.home-banner {
    width: 1240px;
    height: 500px;
    margin: 0 auto;


    img {
        width: 100%;
        height: 500px;
    }
}
</style>./composables/useCategoryone