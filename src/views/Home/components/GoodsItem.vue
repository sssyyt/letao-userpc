<script setup>
defineProps({
  goods: {
    type: Object,
    default: () => { }
  }
})
</script>


<template>
  <RouterLink to="/" class="goods-item">
    <img v-img-lazy="goods.spuImage" alt="" />
    <p class="name ellipsis">{{ goods.spuName }}</p>
    <p class="desc ellipsis">{{ goods.descript }}</p>
    <p class="price">&yen;{{ goods.priceHigh }}</p>
  </RouterLink>
</template>

<style lang="scss" scoped>
.goods-item {
  display: block;
  width: 250px;
  padding: 20px 10px;
  text-align: center;
  transition: all .5s;
   background-color: #fff;

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

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
</style>