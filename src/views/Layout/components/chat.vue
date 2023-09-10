<script setup>

import { defineProps } from 'vue';
//import { nextTick } from 'vue';

defineProps({
    closeChat: Function, // 声明一个接收函数类型的 props
})
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { getmsgAPI, sendmsgAPI } from '/Users/shiyutian/letao/letao_userpc/src/apis/msg.js';



const msglist = ref([]);
const inputMessage = ref('');
const isDragging = ref(false);
const mouseOffsetX = ref(0);
const mouseOffsetY = ref(0);
const popupStyle = ref({
    left: '50px',
    top: '50px',
});
let timer = null;
const chatMessages = ref(null);


const getmessage = async () => {
    try {

        const newMessagelist = await getmsgAPI();
        msglist.value = newMessagelist.data;

    } catch (error) {
        console.error('获取消息失败:', error);
    }
};

const scrollToBottom = () => {
    // 检查 chatMessages 是否存在并且是一个DOM元素
    if (chatMessages.value instanceof HTMLElement) {
        chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
    }
};


// const scrollToBottom = () => {
//     nextTick(() => {
//         // 检查 chatMessages 是否存在并且是一个DOM元素
//         if (chatMessages.value instanceof HTMLElement) {

//             // 设置 scrollTop 到 scrollHeight，实现滚动到底部
//             chatMessages.value.scrollTop = chatMessages.value.scrollHeight;

//         }

//         if (chatMessages.value.scrollTop === chatMessages.value.scrollHeight)
//             return true;

//         else
//             return false;
//     })
// }


//};
const sendMessage = async () => {
    // console.log('inputMessage', inputMessage);
    const res = await sendmsgAPI({ content: inputMessage.value })
    if (res.code === 1) {
        getmessage()
        inputMessage.value = '';
    }
};
const startDrag = (event) => {
    isDragging.value = true;
    mouseOffsetX.value = event.clientX - event.currentTarget.getBoundingClientRect().left;
    mouseOffsetY.value = event.clientY - event.currentTarget.getBoundingClientRect().top;

    // 添加鼠标移动和释放事件监听器
    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', endDrag);
};

const handleDrag = (event) => {
    if (isDragging.value) {
        popupStyle.value.left = event.clientX - mouseOffsetX.value + 'px';
        popupStyle.value.top = event.clientY - mouseOffsetY.value + 'px';
    }
};

const endDrag = () => {
    isDragging.value = false;

    // 移除鼠标移动和释放事件监听器
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('mouseup', endDrag);
};

const create = () => {
    console.log('初始加载消息并设置定时器');
    getmessage();
    timer = setInterval(getmessage, 500);
    const intervalId = setInterval(scrollToBottom, 100);

    setTimeout(() => {
        clearInterval(intervalId);
        console.log('停止定时器');
    }, 1000);
};

const beforeUnmount = () => {
    // 组件销毁前清除定时器
    clearInterval(timer);
};

// 在组件挂载时开始定时刷新信息列表
onMounted(create);


// 在组件销毁前清除定时器
onBeforeUnmount(beforeUnmount);
</script>


<template>
    <div class="chat-popup" :style="popupStyle">
        <div class="chat-header" @mousedown="startDrag">
            <span>在线客服</span>
            <button @click="closeChat">关闭</button>
        </div>
        <div class="chat-messages" ref="chatMessages">
            <div v-for="(message, index) in msglist" :key="index"
                :class="{ 'user-message': message.msgType === 0, 'admin-message': message.msgType === 1 }">
                <div class="message-content">
                    <!-- 将消息内容放在一个包裹 div 中 -->
                    <p>{{ message.content }}</p>
                </div>
                <span>{{ message.createTime }}</span>
            </div> <!-- 渲染消息列表，类似之前的代码 -->
        </div>
        <div class="chat-input">
            <input v-model="inputMessage" type="text" placeholder="输入消息" />
            <button @click="sendMessage">发送</button>
        </div>
    </div>
</template>


<style scoped>
.chat-popup {
    position: fixed;
    /* 使用 fixed 定位 */
    right: 20px;
    /* 调整聊天框的位置，可以根据需要进行调整 */
    bottom: 20px;
    /* 调整聊天框的位置，可以根据需要进行调整 */
    width: 300px;
    height: 600px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    /* 确保聊天框位于其他内容之上 */
    display: flex;
    flex-direction: column;
}

.chat-component {
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    margin: 20px;
}

.chat-header {
    background-color: #333;
    color: #fff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chat-messages {
    flex-grow: 1;
    /* 让消息列表占据剩余的空间，确保消息永远在底部 */
    padding: 10px;
    max-height: 600px;
    overflow-y: scroll;
}

.user-message {
    text-align: right;
    margin: 30px 0;
}

.message-content {
    /* 设置消息内容的样式，控制文字换行 */
    word-wrap: break-word;
    /* 自动换行 */
    white-space: pre-wrap;
    /* 保留空白符并自动换行 */
}

.admin-message {
    text-align: left;
    margin: 30px 0;
}

.chat-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
}

.chat-input input {
    flex-grow: 1;
    padding: 5px;
}

.chat-input button {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}

.chat-input button:hover {
    background-color: #555;
}
</style>
