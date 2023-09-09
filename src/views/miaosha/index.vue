<script setup>
import miaoshaGoodsItem from '/Users/shiyutian/letao/letao_userpc/src/views/miaosha/components/miaoshaGoodsItem.vue';
import { usemiaosha } from './composables/useMiaosha'
const { disabled, load, miaoshaList } = usemiaosha()


</script>

<template>
      <div class="page">
            <div class="container m-top-20">
                  <!-- 面包屑 -->
                  <div class="bread-container">
                        <el-breadcrumb separator=">">
                              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                              <el-breadcrumb-item>秒杀专区</el-breadcrumb-item>
                        </el-breadcrumb>
                  </div>

            </div>

            <div class="sub-list">
                  <h3>商品列表 </h3>
                  <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
                        <miaoshaGoodsItem v-for="goods in miaoshaList" :goods="goods" :key="goods.id" />
                  </div>
            </div>


      </div>
</template>


<style scoped lang="scss">
.page {
       margin-top: 20px;
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

            .body {
                  display: flex;
                  padding: 0px 32px;
                  flex-wrap: wrap;
                  justify-content: center;

                  //justify-content: space-around;
                  //padding: 0 40px 30px;
            }

            .bread-container {
                  padding: 25px 0;
                  height: 40px;
            }
      }
}
</style>