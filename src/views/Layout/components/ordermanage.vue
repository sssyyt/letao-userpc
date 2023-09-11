<template>
    <div>
        <header class="header">
            <h1>我的订单</h1>
        </header>

        <div v-for="order in orders" :key="order.id" class="order-item">
            <!-- 用户名和用户id -->
            <div>
                用户名: {{ order.userName }}
                用户ID: {{ order.userId }}
            </div>

            <!-- 订单信息 -->
            <div class="order-info">
                <div>
                    订单名: {{ order.orderNumber }}
                    订单ID: {{ order.id }}
                </div>
                <div>
                    订单地址: {{ order.provinceName }} {{ order.cityName }} {{ order.districtName }} {{ order.detail }}
                    创建时间: {{ order.createTime }}
                </div>
                <div>
                    收货人: {{ order.addresseeName }}
                    联系方式: {{ order.addresseePhoneNumber }}
                    支付方式: {{ order.paymentMethod }}
                    订单金额: {{ order.orderMoney }}
                    {{ order.isSeckill ? "秒杀订单" : "" }}
                </div>
                <div>
                    <!-- 配送方式 -->
                    配送方式: {{ order.deliveryMethod }}
                    <!-- 快递单号和发货时间 -->
                    <template v-if="order.deliveryMethod === '快递'">
                        快递单号: {{ order.trackingNumber }}
                        发货时间: {{ order.deliveryTime }}
                        <button v-if="order.orderStatus === 4" @click="markAsReceived(order)">已收货</button>
                    </template>
                    <!-- 自提商铺ID -->
                    <template v-else-if="order.deliveryMethod === '自提'">
                        商铺ID: {{ order.shopId }}
                        <button v-if="order.orderStatus === 2" @click="markAsPickedUp(order)">取货</button>
                    </template>
                </div>
            </div>

            <!-- 订单状态和退货按钮 -->
            <div>
                订单状态: {{ orderStatusText(order.orderStatus) }}
                <button @click="markAsReturned(order)"
                    v-if="order.orderStatus === 4 || order.orderStatus === 5">已退货</button>
            </div>

            <!-- 添加评论按钮 -->
            <button @click="navigateToComment(order)"
                v-if="order.orderStatus === 4 || order.orderStatus === 5">添加评论</button>

            <!-- 点击订单跳转到详情页面 -->
            <router-link :to="'/order/' + order.id">查看详情</router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getorders } from '/Users/shiyutian/letao/letao_userpc/src/apis/orders.js'
const router = useRouter()
const orders = ref([]);

// 根据订单状态返回状态文本
const orderStatusText = (status) => {
    switch (status) {
        case 0: return '已取消';
        case 1: return '已创建';
        case 2: return '已支付';
        case 3: return '已取货';
        case 4: return '已发货';
        case 5: return '已收货';
        case 6: return '已退货';
        default: return '';
    }
};

// 标记订单为已收货
const markAsReceived = (order) => {
    // 调用API修改订单状态为已收货
    // 更新订单列表数据
    order.orderStatus = 5; // 修改为已收货状态
};

// 标记订单为已取货
const markAsPickedUp = (order) => {
    // 调用API修改订单状态为已取货
    // 更新订单列表数据
    order.orderStatus = 3; // 修改为已取货状态
};

// 标记订单为已退货
const markAsReturned = (order) => {
    // 调用API修改订单状态为已退货
    // 更新订单列表数据
    order.orderStatus = 6; // 修改为已退货状态
};

// 导航到评论页面
const navigateToComment = (order) => {
    // 导航到评论页面，传递订单ID等参数
    router.push({ path: `/comment/${order.id}`, query: { userName: order.userName } });
};

// 模拟获取订单列表数据
const getOrders = async () => {
    const res = await getorders()
    orders.value=res.data.rows
};

// 初始化获取订单数据
onMounted(() => getOrders())
</script>
<style scoped>
.order-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
}

.header {
    color: #000;
    text-align: center;
    padding: 20px 0;
}

.order-item {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    background-color: #fff;
    transition: transform 0.2s ease;
}

.order-item:hover {
    transform: scale(1.02);
}

.user-info {
    font-weight: bold;
    margin-bottom: 10px;
}

.user-name {
    font-size: 18px;
}

.user-id {
    font-size: 14px;
    color: #777;
}

.order-info {
    border-top: 1px solid #ccc;
    margin-top: 10px;
    padding-top: 10px;
}

.order-title {
    display: flex;
    justify-content: space-between;
}

.order-number {
    font-weight: bold;
}

.order-id {
    font-size: 14px;
    color: #777;
}

.address-info {
    margin-top: 10px;
}

.address {
    font-size: 16px;
    font-weight: bold;
}

.detail-address {
    margin-top: 5px;
}

.order-details {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
}

.order-time {
    font-size: 14px;
    color: #777;
}

.receiver-info,
.payment-info {
    margin-top: 10px;
}

.receiver-name,
.receiver-phone,
.payment-method,
.order-amount {
    margin-bottom: 5px;
}

.seckill {
    color: red;
    font-weight: bold;
}

.delivery-info {
    margin-top: 10px;
}

.delivery-method {
    font-size: 16px;
    font-weight: bold;
}

.tracking,
.pickup {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.tracking-number,
.delivery-time,
.shop-id {
    margin-bottom: 5px;
}

.order-status {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.status-text {
    font-size: 16px;
    font-weight: bold;
}

button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>




