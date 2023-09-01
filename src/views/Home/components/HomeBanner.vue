<script setup>
</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="index in 5" :key="index">
        <img :src="`https://seu-letao.oss-cn-beijing.aliyuncs.com/banner/${index}.png`" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>


<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 400px;
  position: static;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 400px;
  }
}
</style>