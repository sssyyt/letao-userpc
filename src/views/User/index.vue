<script setup>
//import { getCheckInfoAPI, createOrderAPI } from '@/apis/checkout'
//import { useRouter } from 'vue-router'
//import { ElMessage } from 'element-plus'
import { uploadimgAPI } from '@/apis/user'
import { ElMessage } from 'element-plus'

//import type { UploadProps } from 'element-plus'
import { ref, onMounted } from 'vue'
import { useUserStore } from '/Users/shiyutian/letao/letao_userpc/src/stores/userStore.js'
const userStore = useUserStore()
const isEditing = ref(false)
const editedUserInfo = ref({
    account: '',
    sex: '1',
    email: ''
})
const startEditing = () => {
    isEditing.value = true;
    // 初始化编辑表单数据
    editedUserInfo.value = {
        account: userStore.userInfo.data.account,
        sex: userStore.userInfo.data.sex,
        email: userStore.userInfo.data.email
    }
}

// 上传
// const handleUpload = (parms) => {
//     console.log("parms", parms);
//     uploadimgAPI( parms.file).then((res) => {
//         console.log(res);
//         if (res.code == 1) {
//             ElMessage({
//                 message: "上传成功！",
//                 type: "success",
//             });
//         } else ElMessage.error(res.msg);
//         document.querySelector(".uploadIcon").blur();
//     });
// };



// 上传
// const handleUpload = (parms) => {
//     console.log("parms", parms);
//     uploadSeckillAPI(parms.data.id, parms.file).then((res) => {
//         console.log(res);
//         if (res.code == 1) {
//             ElMessage({
//                 message: "上传成功！",
//                 type: "success",
//             });
//             search();
//         } else ElMessage.error(res.msg);
//         document.querySelector(".uploadIcon").blur();
//     });
// };
const saveUserInfo = () => {
    userStore.changeUserData({ editedUserInfo, isEditing })
}


const avatarInput = ref(null);
const handleAvatarClick = () => {
    if (avatarInput.value) {
        avatarInput.value.click(); // 打开文件选择对话框
    }
};
onMounted(() => {
    // 组件渲染完成后，在此处可以访问 DOM 元素
    const inputElement = document.querySelector('input[type="file"]');
    if (inputElement) {
        avatarInput.value = inputElement;
    }
});
// 处理头像文件选择事件
const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    console.log('处理文件选择事件', file);
    if (file) {
        uploadUserAvatar(file); // 调用上传头像的函数
    }
};
// 上传用户头像
const uploadUserAvatar = (file) => {
    // // 构造表单数据
    // const formData = new FormData();
    // formData.append('avatar', file);
    console.log('shangchuantouxiang', file);

    // 调用上传头像的接口
    // 请根据实际情况替换以下代码
    uploadimgAPI(file).then((res) => {
        if (res.code === 1) {
            ElMessage.success('上传头像成功');
            userStore.getUserData();
            console.log('上传头像成功', userStore.userInfo.data.userImage);
        } else {
            // 提示上传失败
            ElMessage.error('上传头像失败');
            console.log(res.msg)
        }
    });
};




</script>

<template>
    <div class="page">

        <div class="wrapper">
            <h3 class="box-title">用户信息</h3>
            <div class="box-body">
                <table class="goods">
                    <tbody>
                        <td colspan="2" class="user-avatar">
                            <!-- 用户头像显示 -->
                            <img :src="userStore.userInfo.data.userImage" alt="User Avatar" class="rounded-avatar"
                                @click="handleAvatarClick" />
                            <!-- 用户头像上传输入框，隐藏在页面中 -->
                            <input ref="avatarInput" type="file" accept="image/*" style="display: none"
                                @change="handleAvatarChange" />

                            <!-- <el-upload action="#" :limit="1" class="uploadIcon" :show-file-list="false"
                                :http-request="handleUpload"  list-type="picture">
                                <el-icon :size="20" style="color: #646466;">
                                     <el-button plain icon="Download">点击上传</el-button>
                                </el-icon>
                            </el-upload> -->

                        </td>
                        <tr>
                            <td>用户ID</td>
                            <td>{{ userStore.userInfo.data.id }}</td>
                        </tr>
                        <tr>
                            <td>用户名</td>
                            <td>
                                <span v-if="!isEditing">{{ userStore.userInfo.data.account }}</span>
                                <input v-else v-model="editedUserInfo.account" />
                            </td>
                        </tr>
                        <tr>
                            <td>用户手机号</td>
                            <td>{{ userStore.userInfo.data.phoneNumber }}</td>
                        </tr>
                        <tr>
                            <td>用户性别</td>
                            <td>
                                <span v-if="!isEditing">{{ userStore.userInfo.data.sex === 0 ? '女' : '男' }}</span>
                                <select v-else v-model="editedUserInfo.sex">
                                    <option value="0">女</option>
                                    <option value="1">男</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>用户邮箱</td>
                            <td>
                                <span v-if="!isEditing">{{ userStore.userInfo.data.email }}</span>
                                <input v-else v-model="editedUserInfo.email" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="button-container">
                    <button v-if="!isEditing" @click="startEditing" class="custom-button edit-button">编辑信息</button>
                    <button v-else @click="saveUserInfo" class="custom-button save-button">保存信息</button>
                </div>
            </div>



        </div>
    </div>
</template>

<style scoped lang="scss">
.page {
    margin-top: 20px;
    padding: 0 0px 0 480px;

    .upload-label {
        cursor: pointer;
    }

    .wrapper {
        background: #fff;
        padding: 0 20px;
        width: 50%;
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
            padding: 0px 0;

            .user-avatar {
                text-align: center;
                /* 居中头像 */
            }

            .rounded-avatar {
                border-radius: 50%;
                /* 圆形头像 */
                width: 100px;
                /* 头像宽度 */
                height: 100px;
                /* 头像高度 */
                object-fit: cover;
                /* 图像裁剪以适应框 */
            }

            .button-container {
                text-align: center;
                margin-top: 20px;
                margin-bottom: 20px;
            }

            .custom-button {
                margin-bottom: 20px;
                padding: 10px 20px;
                /* 按钮内边距 */
                border: none;
                border-radius: 5px;
                color: #fff;
                /* 文字颜色 */
                cursor: pointer;
                font-size: 16px;
                /* 字体大小 */
                transition: background-color 0.3s ease;
                /* 按钮背景色渐变过渡效果 */

                /* 鼠标悬停时的样式 */
                &:hover {
                    background-color: #fbaa73;
                    /* 鼠标悬停时的背景色 */
                }
            }

            .edit-button {
                background-color: $letaoColor;
                /* 编辑按钮的背景色 */
            }

            .save-button {
                background-color: $letaoColor;
                /* 保存按钮的背景色 */
            }
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