<script setup>
defineProps({
  Commentlist: {
    type: Array,
    default: () => { }
  }
})


</script>


<template>
  <div class="commentbox">
    <div v-for="comment in Commentlist" :key="comment.id" class="comment">


      <div class="user-info">
        <img :src="comment.userImage" alt="User Avatar" class="user-avatar" />
        <div class="user-details">
          <div class="user-name">{{ comment.userName }}</div>
          <div class="create-time">{{ comment.createTime }}</div>
          <div class="sku-name">购买规格：{{ comment.skuName }}</div> <!-- 添加SKU名称显示 -->
        </div>
      </div>
      <div class="comment-details">
        <div class="comment-text">{{ comment.commentTxt }}</div>
        <div class="comment-rating">评分：{{ comment.appraise }}</div>

      </div>
      <div class="comment-divider" v-if="index !== Commentlist.length +1"></div>


    </div>


  </div>
</template>

<style lang="scss" scoped>
.commentbox {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
}

.comment {
  display: flex;
  margin-bottom: 40px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.comment-divider {
  margin: 20px 0;
  /* 调整上下间隔 */
  border-top: 6px solid #e4e4e4;
  /* 分割线样式 */
}

.user-name {
  font-weight: bold;
  font-size: 18px;
}

.create-time {
  color: #999;
  font-size: 16px;
}

.sku-name {
  color: #666;
  font-size: 16px;
}

.comment-details {
  flex: 1;
}

.comment-text {
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
}

.comment-rating {
  font-size: 16px;
  color: #999;
}
</style>