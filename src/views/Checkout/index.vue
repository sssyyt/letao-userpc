<script setup>
//import { getCheckInfoAPI, createOrderAPI } from '@/apis/checkout'
//import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getdefaultAdrAPI, senddefaultAdrAPI } from '@/apis/user'
import { getRegionsAPI, getshopRegionsAPI } from '@/apis/shops'
import { sendorderAPI } from '@/apis/cart'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { sendcheck } from '@/apis/orders'
const router = useRouter()

//import confirm from '/Users/shiyutian/letao/letao_userpc/src/views/Checkout/confirm.vue'
const selectedPaymentMethod = ref("支付宝");
const cartStore = useCartStore()
//const visiableDialog = ref(null)
const orderid = ref(0)
const countdown = ref(0);
const step = ref(0); // 当前步骤，初始为0
const paymentConfirmDialog = ref(false); // 支付确认弹框的显示状态

const showPaymentConfirm = () => {
  paymentConfirmDialog.value = true;
};

const closePaymentConfirmDialog = () => {
  paymentConfirmDialog.value = false;
  // visiableDialog.value = false;
  startCountdown();
  step.value = 1;
};

const confirmPayment = async () => {
  paymentConfirmDialog.value = false
  const res = await sendcheck(orderid.value)
  if (res.code === 1) {
    ElMessage.success('支付成功')

    cartStore.updateNewList()
    router.push({
      path: '/myorders'
    })
  }
  else
    ElMessage.warning(res.msg)

  // 切换步骤为0，显示提交订单按钮
  step.value = 0;
};




const startCountdown = () => {
  console.log('开始倒计时');
  countdown.value = 900; // 15 minutes in seconds
  const interval = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0) {
      clearInterval(interval);
      cancel();
    }
  }, 1000);
}

const cancel = () => {
  cartStore.updateNewList()
  router.push({
    path: '/myorders'
  })

}
//const router = useRouter()
//console.log(cartStore.cartList);
const curAddress = ref({}) // 默认地址
const editedConsigneeName = ref({})
const editedConsigneePhoneNumber = ref({})
const editedAddress = ref({})
const editedConsigneeSex = ref({})
const filterRegion = ref([])
const filterShops = ref([])
const selectedShop = ref({})

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



const createOrder = async () => {
  let paymentMethod = 0; // 默认为微信
  let deliveryMethod = 0; // 默认为快递

  if (selectedPaymentMethod.value === '支付宝') {
    paymentMethod = 1;
  } else if (selectedPaymentMethod.value === '银行卡') {
    paymentMethod = 2;
  }

  if (selectedOption.value === '自提') {
    deliveryMethod = 1;
  }

  const orderInfo = {
    paymentMethod: paymentMethod,
    deliveryMethod: deliveryMethod
  };

  // 如果是自提，添加shopId参数
  if (deliveryMethod === 1) {
    orderInfo.shopId = selectedShop.value;
  }

  const res = await sendorderAPI({ orderInfo });
  if (res.code === 1) {
    ElMessage.success('创建订单成功')
    paymentConfirmDialog.value = true
    orderid.value = res.data.orderInfo.id

  }
  else
    ElMessage.warning(res.msg)
};



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
          <el-radio class="paybtn" v-model="selectedPaymentMethod" label="银行卡">银行卡</el-radio>

        </div>
      </div>

      <!-- 提交订单 -->
      <!-- <div class="submit">
        <el-dialog title="提示" width="30%" v-model="visiableDialog">
          <span>请确认支付？</span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="close">取 消</el-button>
              <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
          </template>
        </el-dialog>
        <div class="count" v-if="countdown > 0">
          <p> {{ countdown }} second后还未支付将自动取消订单</p>
        </div>
        <el-button @click="createOrder" type="primary" size="large">提交订单</el-button>
      </div> -->

      <div class="submit">
        <!-- 当步骤为0时，显示提交订单按钮 -->
        <el-button v-if="step === 0" @click="createOrder" type="primary" size="large">提交订单</el-button>
        <!-- 当步骤为1时，显示立即支付按钮 -->
        <el-button v-if="step === 1" @click="showPaymentConfirm" type="primary" size="large">立即支付</el-button>

        <el-dialog title="提示" width="30%" v-model="paymentConfirmDialog">
          <span>请确认支付？</span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="closePaymentConfirmDialog">取 消</el-button>
              <el-button type="primary" @click="confirmPayment">确 定</el-button>
            </span>
          </template>
        </el-dialog>

        <div class="count" v-if="countdown > 0">
          <p> {{ countdown }} second后还未支付将自动取消订单</p>
        </div>
      </div>

    </div>




  </div>
</template>

<style scoped lang="scss">
.letao-pay-checkout-page {
  margin-top: 20px;
  padding: 0 0px 0 300px;

  .count {
    font-size: 16px;

    justify-content: center;
    //padding-left: 400px;
    line-height: 50px;
    border-bottom: 1px solid #f5f5f5;
    text-align: center;
    border-top: 1px solid #f5f5f5;
    margin-bottom: 80px;

  }

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


      &:first-confirm {
        margin-right: 70px;
      }

      &:last-confirm {
        margin-right: 20px;
      }
    }
  }
}

.payment-options {
  display: flex;
  align-items: center;

  .paybtn {
    margin-left: 0px; // 适当调整间距
    display: center;
    justify-content: space-between;

    &:first-child {
      margin-left: 200px;
      margin-right: 50px;

    }

    &:last-child {
      margin-left: 20px;
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


      &:first-confirm {
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


      &:first-confirm {
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
        &:first-confirm {
          color: #000;
          margin-bottom: 10px;
        }
      }

      p {
        &:last-confirm {
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

      &:first-confirm {
        border-left: 1px solid #f5f5f5;
      }

      &:last-confirm {
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