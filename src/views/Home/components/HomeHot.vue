<script setup>
import HomePanel from './HomePanel.vue'
import GoodsItem from './GoodsItem.vue'
import { getHotAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'

// 获取数据
const hotList = ref({})

const getNewList = async () => {
  const res = await getHotAPI()
  hotList.value = res

}

onMounted(() => getNewList())

</script>

<template>
  <HomePanel title="热门商品" sub-title="人气热卖 销量领先">
    <ul class="goods-list">
      <li v-for="goods in hotList.data" :key="goods.id">
        <GoodsItem :goods="goods" />
      </li>
    </ul>
  </HomePanel>
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  

  li {

    //display: center;
    background: #fff;
    transition: all .5s;
    display: flex;
    /* 将li设置为Flex容器 */
    justify-content: center;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>