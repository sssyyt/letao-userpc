<script setup>
//import { getCheckInfoAPI, createOrderAPI } from '@/apis/checkout'
//import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getdefaultAdrAPI, senddefaultAdrAPI } from '@/apis/user'
import { getRegionsAPI, getshopRegionsAPI } from '@/apis/shops'
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'
const selectedPaymentMethod = ref("支付宝");
const cartStore = useCartStore()
//const router = useRouter()
//console.log(cartStore.cartList);
const curAddress = ref({}) // 默认地址
const editedConsigneeName = ref({})
const editedConsigneePhoneNumber = ref({})
const editedAddress = ref({})
const editedConsigneeSex = ref({})
const filterRegion = ref([])
const filterShops = ref([])
const selectedShop = ref([])

const selectedOption = ref("自提") // 默认地址
const defaultAdr = async () => {
  const res = await getdefaultAdrAPI()
  curAddress.value = res
  editedConsigneeName.value = curAddress.value.data.consigneeName
  editedConsigneePhoneNumber.value = curAddress.value.data.consigneePhoneNumber
  editedAddress.value = curAddress.value.data.address
  editedConsigneeSex.value = curAddress.value.data.consigneeSex
  //console.log('初始化完了curAddress', curAddress.value)
  // console.log('editedConsigneeSex', editedConsigneeSex.value)
  //console.log('初始化完了editedConsigneePhoneNumber', editedConsigneePhoneNumber.value)

}
onMounted(() => { defaultAdr() })
// 地区级联选择器配置
const props = {
  lazy: true,
  lazyLoad(node, resolve) {
    const { level } = node;
    const nodes = [];
    let queryId = level == 0 ? "" : node.value;
    getRegionsAPI({ id: queryId }).then((res) => {
      //   console.log("地区级联调试", res);
      res.data.map((item) => {
        let obj = {
          value: item.id,
          label: item.name,
          leaf: node.level >= 2,
        };
        nodes.push(obj);
      });
      resolve(nodes);
    });
  },
};
const changedefaultAdr = async () => {
  const res = await senddefaultAdrAPI({ consigneeName: curAddress.value.data.consigneeName, consigneePhoneNumber: curAddress.value.data.consigneePhoneNumber, consigneeSex: curAddress.value.data.consigneeSex, detail: curAddress.value.data.address })
  if (res.code === 1)
    ElMessage.success('设置默认地址成功！')
}

const isEditing = ref(false) // 默认地址

function toggleEditing() {
  if (isEditing.value) {
    curAddress.value.data.consigneeName = editedConsigneeName.value;
    curAddress.value.data.consigneePhoneNumber = editedConsigneePhoneNumber.value;
    curAddress.value.data.address = editedAddress.value;
    curAddress.value.data.consigneeSex = editedConsigneeSex.value;

  }
  isEditing.value = !isEditing.value;
}

const getfilterShops = async () => {
  //console.log('filterRegion', filterRegion.value[2]);

  const res = await getshopRegionsAPI({ districtId: filterRegion.value[2] })
  //console.log('筛选商铺信息', res);
  filterShops.value = res
  //console.log('filterShops', filterShops.value);

}
onMounted(() => { defaultAdr() })
onMounted(() => { getfilterShops() })

// 控制弹框打开
//const showDialog = ref(false)


// // 切换地址
// const activeAddress = ref({})
// const switchAddress = (item) => {
//   activeAddress.value = item
// }
// const confirm = () => {
//   curAddress.value = activeAddress.value
//   showDialog.value = false
//   activeAddress.value = {}
// }

// // 创建订单
// const createOrder = async () => {
//   const res = await createOrderAPI({
//     deliveryTimeType: 1,
//     payType: 1,
//     payChannel: 1,
//     buyerMessage: '',
//     goods: checkInfo.value.goods.map(item => {
//       return {
//         skuId: item.skuId,
//         count: item.count
//       }
//     }),
//     addressId: curAddress.value.id
//   })
//   const orderId = res.result.id
//   router.push({
//     path: '/pay',
//     query: {
//       id: orderId
//     }
//   })
//   // 更新购物车
//   cartStore.updateNewList()
// }

</script>

<template>
  <div class="letao-pay-checkout-page">

    <div class="wrapper">
      <!-- 商品信息 -->
      <h3 class="box-title">购物车列表</h3>
      <div class="box-body">
        <table class="goods">
          <thead>
            <tr>
              <th width="520">商品信息</th>
              <th width="170">单价</th>
              <th width="170">数量</th>
              <th width="170">小计</th>
              <!-- <th width="170">实付</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in cartStore.cartList.data" :key="i.id">
              <td>
                <a href="javascript:;" class="info">
                  <img :src="i.skuImage" alt="">
                  <div class="right">
                    <p>{{ i.spuName }} </p>
                    <p>规格： {{ i.skuName }}</p>
                    <p>{{ i.descript }}</p>
                  </div>
                </a>
              </td>
              <td>&yen;{{ i.cartPrice }}</td>
              <td>{{ i.number }}</td>
              <td>&yen;{{ i.number * i.cartPrice }}</td>

              <!-- <td>&yen;{{ i.totalPrice }}</td>
                  <td>&yen;{{ i.totalPayPrice }}</td> -->
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 配送方式 -->
      <h3 class="box-title">配送方式</h3>
      <div class="box-body">
        <div class="send">
          <div class="text">
            <ul>
              <li><span>请选择配送方式：</span></li>
            </ul>
          </div>

          <div class="action">
            <el-radio class="btn" v-model="selectedOption" label="自提">自提</el-radio>
            <el-radio class="btn" v-model="selectedOption" label="快递">快递</el-radio>
          </div>
        </div>
      </div>


      <!-- 快递：收货地址 -->
      <h3 class="box-title">收货地址</h3>
      <div class="box-body" v-if="selectedOption === '快递'">
        <div class="addresstwo">
          <div class="text">
            <div class="none" v-if="!isEditing && !curAddress">



            </div>
            <ul v-else>
              <li v-if="isEditing">
                <span>收<i />货<i />人：</span>
                <input v-model="editedConsigneeName" type="text" :placeholder="curAddress.data.consigneeName">
              </li>
              <li v-else>
                <span>收<i />货<i />人：</span>{{ curAddress.data.consigneeName }}
              </li>
              <li v-if="isEditing">
                <span>性<i />别：</span>
                <el-radio v-model="editedConsigneeSex" label="1">男</el-radio>
                <el-radio v-model="editedConsigneeSex" label="0">女</el-radio>
              </li>
              <li v-else>
                <span>性<i />别：</span>{{ curAddress.data.consigneeSex === '1' ? '男' : '女' }}
              </li>

              <li v-if="isEditing">
                <span>联系方式：</span>
                <input v-model="editedConsigneePhoneNumber" type="text"
                  :placeholder="curAddress.data.consigneePhoneNumber" />
              </li>
              <li v-else>
                <span>联系方式：</span>{{ curAddress.data.consigneePhoneNumber }}
              </li>
              <li v-if="isEditing">
                <span>收货地址：</span>
                <textarea v-model="editedAddress" type="text" :placeholder="curAddress.data.address" />
              </li>
              <li v-else>
                <span>收货地址：</span>{{ curAddress.data.address }}
              </li>
            </ul>
          </div>

          <div class="action">
            <el-button size="large" @click="toggleEditing">{{ isEditing ? '保存' : '编辑地址' }}</el-button>
            <el-button size="large" @click="changedefaultAdr" v-if="!isEditing">设为默认</el-button>
          </div>
        </div>
      </div>


      <!-- 自提：收货地址 -->
      <div class="box-body" v-if="selectedOption === '自提'">
        <div class="address">
          <div class="text">
            <!-- <div class="none" v-if="!isEditing && !curAddress">您需要先编辑收货地址才可提交订单。</div> -->
            <ul>
              <li>
                <span>所在地区：</span>
                <!-- 地区选择 -->
                <el-cascader size="large" v-model="filterRegion" :props="props" @change="getfilterShops" clearable
                  :show-all-levels="false" style="margin-right: 20px; width: 130px" placeholder="选择省市区" />
              </li>


            </ul>
          </div>

          <div class="action" v-if="filterRegion[2]">
            <span>可选店铺：</span>
            <!-- <el-form-item label="板块"> -->
            <el-select v-model="selectedShop" placeholder="选择相应店铺">
              <el-option v-for="shop in filterShops.data.rows" :value="shop.id" :key="shop.id"
                :label="shop.name + ' -- ' + shop.detail"></el-option>
            </el-select>
            <!-- </el-form-item> -->
          </div>




        </div>
      </div>


      <!-- 支付方式
          <h3 class="box-title">支付方式</h3>
          <div class="box-body">
            <a class="my-btn active" href="javascript:;">在线支付</a>
            <a class="my-btn" href="javascript:;">货到付款</a>
            <span style="color:#999">货到付款需付5元手续费</span>
          </div> -->
      <!-- 金额明细 -->
      <h3 class="box-title">金额明细</h3>
      <div class="box-body">
        <div class="total">
          <dl>
            <dt>商品件数：</dt>
            <dd>{{ cartStore.cartList.data.length }}件</dd>
          </dl>
          <dl>
            <dt>商品总价：</dt>
            <dd>¥{{ cartStore.totalprice }}</dd>
          </dl>
          <dl>
            <dt>运<i></i>费：</dt>
            <dd>¥{{ 0 }}</dd>
          </dl>
          <dl>
            <dt>应付总额：</dt>
            <dd class="price">{{ cartStore.totalprice }}</dd>
          </dl>
        </div>
      </div>

      <!-- 支付方式 -->
  <h3 class="box-title">支付方式</h3>
  <div class="box-body">
    <div class="payment-options">
      <el-radio class="paybtn" v-model="selectedPaymentMethod" label="支付宝">支付宝</el-radio>
      <el-radio class="paybtn" v-model="selectedPaymentMethod" label="微信">微信</el-radio>
    </div>
  </div>

      <!-- 提交订单 -->
      <div class="submit">
        <el-button @click="createOrder" type="primary" size="large">提交订单</el-button>
      </div>



    </div>




  </div>
</template>

<style scoped lang="scss">
.letao-pay-checkout-page {
  margin-top: 20px;
  padding: 0 0px 0 300px;


  .wrapper {
    background: #fff;
    padding: 0 20px;
    width: 70%;
    margin-right: 0;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      justify-content: center;
      //padding-left: 400px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
      text-align: center;

    }

    .box-body {
      padding: 20px 0;

    }
  }
}

.send {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  margin-left: 80px;
  margin-right: 80px;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    margin-right: 0px;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $letaoColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 220px;
    margin-left: 10px;
    text-align: center;
    margin-right: 10px;

    .text {
      flex: 1;
      min-height: 90px;
      display: flex;
      align-items: center;
      margin-right: 0px;
    }

    .btn {
      width: 50px;
      height: 46px;
      line-height: 44px;
      font-size: 22px;


      &:first-child {
        margin-right: 70px;
      }

      &:last-child {
        margin-right: 20px;
      }
    }
  }
}
.payment-options {
  display: flex;
  align-items: center;

  .paybtn {
    margin-right: 200px; // 适当调整间距
     &:first-child {
        margin-right: 400px;
        margin-left : 100px;
      }

      &:last-child {
        margin-right: 200px;
      }
  }
}
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    margin-left: 20px;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $letaoColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 260px;
    text-align: right;
    margin-right: 20px;

    span {
      color: #999;

      text-align: left;
    }

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 22px;


      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.addresstwo {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    margin-left: 20px;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $letaoColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 220px;
    text-align: right;
    margin-right: 20px;

    span {
      color: #999;

      text-align: left;
    }

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 22px;


      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  padding: 0 20px;



  .info {
    display: flex;
    text-align: left;

    img {
      width: 90px;
      height: 90px;
      margin-right: 20px;
      margin-left: 20px;

    }

    .right {
      line-height: 24px;

      p {
        &:first-child {
          color: #000;
          margin-bottom: 10px;
        }
      }

      p {
        &:last-child {
          color: #999;
          margin-top: 10px;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $letaoColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: center;
    line-height: 50px;
    margin-left: 70px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 280px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: center;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $letaoColor;
      background: lighten($letaoColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>