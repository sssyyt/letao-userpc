<script setup>

//import GoodsItem from '../Home/components/GoodsItem.vue'
//import { useBanner } from './composables/useBanner'
import { useCategoryone , useCategoryoneproduct } from './composables/useCategoryone'
import { useCategorytwo } from './composables/useCategorytwo'
//const { bannerList } = useBanner()
// import {  ref } from 'vue'
// import {  getproductCategoryone } from '@/apis/categoryone'

import GoodsItem from '../Home/components/GoodsItem.vue';
const { categoryone } = useCategoryone()
const { categorytwo } = useCategorytwo()
const {  disabled,load,productlist } = useCategoryoneproduct()



</script>

<template>
    <div class="top-category">
        <div class="container m-top-20">
            <!-- 面包屑 -->
            <div class="bread-container">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ categoryone.name }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

        </div>
        <div class="sub-list">
            <h3>全部分类</h3>
            <ul>
                <li v-for="i in categorytwo" :key="i.id">
                    <RouterLink :to="`/category/sub/${i.id}`">
                        <img :src="i.picture"  />
                        <p>{{ i.name }}</p>
                    </RouterLink>

                </li>
            </ul>
        </div>

          <div class="sub-list">
               <h3>商品列表 </h3>
            <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
                <GoodsItem v-for="goods in productlist" :goods="goods" :key="goods.id" />
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
        margin-top: 20px;
        background-color: #fff;

        ul {
            display: flex;
            padding: 0 32px;
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
                       text-align:center;
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