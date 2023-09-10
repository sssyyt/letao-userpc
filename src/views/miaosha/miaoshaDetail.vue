//todo视频预览
//评价显示以及锚点
<script setup>
// import { ElMessage } from 'element-plus'
// import { getSKU } from '@/apis/skuget'
import { onMounted, ref } from 'vue'
// import { useCartStore } from '@/stores/cartStore'
// const cartStore = useCartStore()
import { useRoute } from 'vue-router'
//import imageview from '/Users/shiyutian/letao/letao_userpc/src/components/ImageView/index.vue'
import { miaoshaAPI } from '@/apis/miaosha'
const route = useRoute()
const detail = ref({})
const getdetail = async () => {
      const res = await miaoshaAPI(route.params.id)
      detail.value = res.data
      console.log(detail)
}
onMounted(() => getdetail())


</script>

<template>
      <div class="letao-goods-page">
            <div class="container">
                  <div class="bread-container">
                        <el-breadcrumb separator=">">

                              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                              <el-breadcrumb-item :to="{ path: `category/miaosha` }">秒杀专区
                              </el-breadcrumb-item>
                              <el-breadcrumb-item>{{ detail.name }}
                              </el-breadcrumb-item>

                        </el-breadcrumb>
                  </div>
                  <!-- 商品信息 -->
                  <div class="info-container">
                        <div>
                              <div class="goods-info">
                                    <div class="media">
                                          <img :src="detail.seckillImage" alt="" />

                                          <!-- 统计数量 -->
                                          <!-- <ul class="goods-sales">
                                                <li>
                                                      <p><i class="iconfont icon-task-filling"></i>库存仅剩</p>
                                                      <p> {{ detail.stock }} 件</p>
                                                      
                                                </li>

                                          </ul> -->
                                    </div>
                                    <div class="spec">
                                          <!-- 商品信息区 -->
                                          <p class="g-name"> {{ detail.name }} </p>

                                          <p class="g-desc">{{ detail.descript }} </p>

                                          <p class="g-price">
                                                <span>{{ detail.price }}</span>
                                                <span> {{ detail.constPrice }}</span>
                                          </p>

                                          <p class="g-price2">

                                                <span>库存仅剩 {{ detail.stock }} 件</span>
                                          </p>

                                          <p class="g-price3">

                                                <span>活动时间： {{ detail.beginTime }} -  {{ detail.endTime }}</span>
                                          </p>
                                          <div class="g-service">
                                                <dl>
                                                      <dt>服务</dt>
                                                      <dd>
                                                            <span>无忧退货</span>
                                                            <span>快速退款</span>
                                                            <span>免费包邮</span>
                                                      
                                                      </dd>
                                                </dl>
                                          </div>

                                          <div>
                                                <el-button size="large" class="btn" @click="$router.push({ path: `/miaoshacheckout/${route.params.id}` })">
                                                      立即抢购
                                                </el-button>
                                          </div>

                                    </div>
                              </div>



                        </div>
                  </div>



            </div>
      </div>
</template>


<style scoped lang='scss'>
.letao-goods-page {
      .goods-info {
            min-height: 600px;
            background: #fff;
            display: flex;

            .media {
                  width: 580px;
                  height: 600px;
                  padding: 30px 50px;
            }

            .spec {
                  flex: 1;
                  padding: 30px 30px 30px 0;

                  .g-price {
                        margin-top: 20px;

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

                  .g-price2 {
                        margin-top: 20px;

                        span {

                              &:first-child {
                                    color: $letaoColor;
                                    margin-right: 10px;
                                    font-size: 18px;
                              }


                        }
                  }

                   .g-price3 {
                        margin-top: 20px;

                        span {

                              &:first-child {
                                    color: #999;
                                    margin-right: 10px;
                                    font-size: 18px;
                              }


                        }
                  }
            }
      }

      .goods-footer {
            display: flex;
            margin-top: 20px;

            .goods-article {
                  width: 940px;
                  margin-right: 20px;
            }

            .goods-aside {
                  width: 280px;
                  min-height: 1000px;
            }
      }

      .goods-tabs {
            min-height: 600px;
            background: #fff;
      }

      .goods-warn {
            min-height: 600px;
            background: #fff;
            margin-top: 20px;
      }

      .number-box {
            display: flex;
            align-items: center;

            .label {
                  width: 60px;
                  color: #999;
                  padding-left: 10px;
            }
      }

      .g-name {
            font-size: 22px;
      }

      .skutitle {
            margin-top: 20px;

            font-size: 20px;
      }

      .countbtn {
            margin-top: 20px;
      }

      .g-desc {
            color: #999;
            margin-top: 20px;
      }

      .g-desc2 {
            color: #999;
            margin-top: 20px;
      }

      .g-price {
            margin-top: 10px;
            color: $priceColor;
            font-size: 20px;

            span {
                  &::before {
                        content: "¥";
                        font-size: 20px;
                  }


                  // color: $priceColor;
                  margin-right: 10px;
                  font-size: 20px;



            }
      }

      .g-service {
            background: #f5f5f5;
            width: 500px;
            padding: 20px 10px 0 10px;
            margin-top: 20px;

            dl {
                  padding-bottom: 20px;
                  display: flex;
                  align-items: center;

                  dt {
                        width: 50px;
                        color: #999;
                  }

                  dd {
                        color: #666;

                        &:last-child {
                              span {
                                    margin-right: 10px;

                                    &::before {
                                          content: "•";
                                          color: $letaoColor;
                                          margin-right: 2px;
                                    }
                              }

                              a {
                                    color: $letaoColor;
                              }
                        }
                  }
            }
      }

      .goods-sales {
            display: flex;
            width: 400px;
            align-items: center;
            text-align: center;
            height: 140px;

            li {
                  flex: 1;
                  position: relative;

                  ~li::after {
                        position: absolute;
                        top: 10px;
                        left: 0;
                        height: 60px;
                        border-left: 1px solid #e4e4e4;
                        content: "";
                  }

                  p {
                        &:first-child {
                              color: #999;
                        }

                        &:nth-child(2) {
                              color: $priceColor;
                              margin-top: 10px;
                        }

                        &:last-child {
                              color: #666;
                              margin-top: 10px;

                              i {
                                    color: $letaoColor;
                                    font-size: 14px;
                                    margin-right: 2px;
                              }

                              &:hover {
                                    color: $letaoColor;
                                    cursor: pointer;
                              }
                        }
                  }
            }
      }
}

.goods-tabs {
      min-height: 600px;
      background: #fff;

      nav {
            height: 70px;
            line-height: 70px;
            display: flex;
            border-bottom: 1px solid #f5f5f5;

            a {
                  padding: 0 40px;
                  font-size: 18px;
                  position: relative;

                  >span {
                        color: $priceColor;
                        font-size: 16px;
                        margin-left: 10px;
                  }
            }
      }
}

.goods-detail {
      padding: 40px;

      .attrs {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 30px;

            li {
                  display: flex;
                  margin-bottom: 10px;
                  width: 50%;

                  .dt {
                        width: 100px;
                        color: #999;
                  }

                  .dd {
                        flex: 1;
                        color: #666;
                  }
            }
      }

      >img {
            width: 100%;
      }
}

.btn {
      margin-top: 50px;

}

.bread-container {
      padding: 25px 0;
}

.spec-item {
      display: inline-block;
      margin-right: 10px;
}

.spec-item span {
      border: 1px solid #eee;
      cursor: pointer;
      padding: 5px 10px;
}

.spec-item .active {
      border: 1px solid red;
      background-color: red;
      color: #fff;
}

.spec-item .disabled {
      color: #c0c4cc;
      cursor: not-allowed;
      background-image: none;
      background-color: #fff;
      border-color: #ebeef5;
}
</style>