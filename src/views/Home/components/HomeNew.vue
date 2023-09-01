<script setup>
import HomePanel from './HomePanel.vue'
import GoodsItem from './GoodsItem.vue'
import { findNewAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'

// 获取数据
const newList = ref([])

const getNewList = async () => {
  const res = await findNewAPI()
  newList.value = res
}

onMounted(() => getNewList())

</script>

<template>
  <HomePanel title="最新上线" sub-title="新鲜出炉 品质保证">
     <ul class="goods-list">
            <li v-for="goods in newList.data" :key="goods.id">
              <GoodsItem :goods="goods" />
            </li>
          </ul>
  </HomePanel>
 
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-around;

  li {
  
display: center;
    background: #fff;
    transition: all .5s;

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