//todo视频预览
//评价显示以及锚点
<script setup>
import { ElMessage } from 'element-plus'
import { getSKU } from '@/apis/skuget'
import { onMounted, ref } from 'vue'
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()
import { useRoute } from 'vue-router'
import imageview from '/Users/shiyutian/letao/letao_userpc/src/components/ImageView/index.vue'
import Sku from '/Users/shiyutian/letao/letao_userpc/src/components/Sku/index.vue'
const skus = ref({})

const skuList = ref([])

const skuObj = ref({})

const route = useRoute()

const title = ref({})
//展示图片
const showimagelist = ref([])
//获取分类名称和id
const conename = ref({})
const ctwoname = ref({})
const coneid = ref({})
const ctwoid = ref({})
const priceH = ref({})
const priceL = ref({})
const desc = ref({})

//获取评论数以及销量
const commentnum = ref({})
const salesnum = ref({})


//const title = ref({})
//获取商品信息和提取各个参数
const getSKUs = async () => {
  const res = await getSKU(route.params.id)
  skus.value = res.data
  // console.log('sku参数', skus.value);
  //给各个参数赋值
  title.value = skus.value.spuName
  conename.value = skus.value.oneCategoryName
  ctwoname.value = skus.value.twoCategoryName
  coneid.value = skus.value.oneCategoryId
  ctwoid.value = skus.value.twoCategoryId
  commentnum.value = skus.value.commentNum
  salesnum.value = skus.value.sales
  priceH.value = skus.value.priceHigh
  priceL.value = skus.value.priceLow
  desc.value = skus.value.descript
  //spudescript.value= skus.value.
  //skuobj.value = skus.value.skuList[0]
  //console.log('skuobj初始化', skuObj.value);

  const spuImagelist = skus.value.spuImageList;
  if (Array.isArray(spuImagelist)) {
    spuImagelist.forEach((spuimageurl) => {
      if (spuimageurl) {
        showimagelist.value.push(spuimageurl);
      }
    });
  }


  // Extract and process skuList
  const skuListt = skus.value.skuList;
  skuList.value = skus.value.skuList;
  //console.log('skuList在这里', skuList);
  //console.log('skuListvalue在这里', skuList.value);

  if (Array.isArray(skuListt)) {
    skuListt.forEach((sku) => {
      if (sku.hasImage) {
        showimagelist.value.push(sku.hasImage);
      }
    });
  }

  //console.log(showimagelist.value);
}
onMounted(() => getSKUs())
// count
const count = ref(1)
const countChange = (count) => {
  console.log(count)
}

const skuChange = (sku) => {
  // console.log('把sku选择的传进来啦', sku)
  skuObj.value = sku
  //console.log('skuObj change', skuObj.value)
}

const addCart = () => {
  //console.log('怎么没登录',cartStore.isLogin);
  if (cartStore.isLogin === 1) {
    if (JSON.stringify(skuObj.value) !== '{}') {
      // console.log('addcartt')

      // console.log('skuObj', skuObj.value)
      // console.log('count', count.value)

      // 规则已经选择  触发action
      cartStore.addCart({
        skuId: skuObj.value.id,
        number: count.value
      })
      ElMessage.success('加入购物车成功')
      //console.log('addwann')

    } else {
      ElMessage.warning('请选择规格')
    }
  } else {
    ElMessage.warning('请先登录')
    console.log('点击按钮但是还没登录')

  }
}



// 评论模块

const config = ref({
  user: {
    id: 1,
    username: 'jack',
    avatar: 'https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100',
    // 评论id数组 建议:存储方式用户uid和评论id组成关系,根据用户uid来获取对应点赞评论id,然后加入到数组中返回
  },
  comments: [],
  total: 10
})


config.value.comments = [
  {
    id: '1',
    parentId: null,
    uid: '1',
    address: '来自上海',
    content:
      '缘生缘灭，缘起缘落，我在看别人的故事，别人何尝不是在看我的故事?别人在演绎人生，我又何尝不是在这场戏里?谁的眼神沧桑了谁?我的眼神，只是沧桑了自己[喝酒]',
    likes: 2,
    contentImg: 'https://gitee.com/undraw/undraw-ui/raw/master/public/docs/normal.webp',
    createTime: '1分钟前',
    user: {
      username: '落🤍尘',
      avatar: 'https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100',
      level: 6,
      homeLink: '/1'
    }
  }
]

</script>

<template>
  <div class="letao-goods-page">
    <div class="container">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <!-- 
                错误原因：goods一开始{}  {}.categories -> undefined  -> undefined[1]
                1. 可选链的语法?. 
                2. v-if手动控制渲染时机 保证只有数据存在才渲染
            -->
          <el-breadcrumb-item :to="{ path: `/category/${coneid}` }">{{ conename }}
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/sub/${ctwoid}` }">{{
            ctwoname
          }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品信息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 图片预览区 -->
              <imageview :image-list="showimagelist"></imageview>
              <!-- 视频预览区 -->

              <!-- 统计数量 -->
              <ul class="goods-sales">
                <li>
                  <p>销量人气</p>
                  <p> {{ salesnum }}+ </p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>商品评价</p>
                  <p>{{ commentnum }}+</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <!-- <li>
                  <p>收藏人气</p>
                  <p>300+</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p>400+</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li> -->
              </ul>
            </div>
            <div class="spec">
              <!-- 商品信息区 -->
              <p class="g-name"> {{ title }} </p>

              <p class="g-desc" :key="1" v-if="JSON.stringify(skuObj) === '{}'">{{ desc }} </p>
              <p class="g-desc2" :key="2" v-else>{{ skuObj.descript }} </p>



              <p class="g-price" :key="4" v-if="JSON.stringify(skuObj) === '{}' && priceL === priceH">
                &yen;{{ priceL }}
              </p>

              <p class="g-price" :key="6" v-if="JSON.stringify(skuObj) === '{}' && priceL !== priceH">
                &yen;{{ priceL }} ~ {{ priceH }}
              </p>

              <p class="g-price" :key="3" v-if="JSON.stringify(skuObj) !== '{}'">
                &yen;{{ skuObj.price }}
              </p>
              <!-- sku组件 -->
              <p class="skutitle"> 规格选择 </p>
              <Sku :skulist="skuList" @change="skuChange" />

              <el-input-number class="countbtn" v-model="count" @change="countChange" v-if="count <= skuObj.stock" />



              <div class="g-service">
                <!-- <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送，App领券购买直降120元</dd>
                </dl> -->
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
                </dl>
              </div>

              <!-- 数据组件 -->

              <!-- 按钮组件 -->
              <div>
                <el-button size="large" class="btn" @click="addCart">
                  加入购物车
                </el-button>
              </div>

            </div>
          </div>



        </div>
      </div>

<!-- 评论模块 -->
  <div class="comment-view" style="padding: 0px">
      <u-comment :config="config"  >
        <!-- <template #list-title>全部评论</template> -->
      </u-comment>
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