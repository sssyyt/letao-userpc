<script setup>
defineProps({
  goods: {
    type: Object,
    default: () => { }
  }
})


</script>


<template>
  <RouterLink :to="`/miaosha/${goods.id}`" class="goods-item">
    <img v-img-lazy="goods.seckillImage" alt="" />
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.descript }} </p>
    <p class="desc ellipsis">活动时间：{{ goods.beginTime }} - {{ goods.endTime }}</p>
      <p class="desc ellipsis">库存剩余：{{ goods.stock }}</p>

    <p class="g-price">
      <span>{{ goods.price }}</span>
      <span> {{ goods.constPrice }}</span>
    </p>

  </RouterLink>
</template>

<style lang="scss" scoped>
.goods-item {
  display: inline-block;
  width: 400px;
  padding: 20px 10px;
  text-align: center;
  transition: all .5s;
  background-color: #fff;

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

  img {
    width: 200px;
    height: 200px;
  }

  p {
    padding-top: 10px;
  }

  .name {
    font-size: 20px;
    color:$priceColor
  }

  .desc {
    color: #999;
    height: 29px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: "¥";
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }

  .price {
    color: $priceColor;
    font-size: 20px;
  }
}
</style>