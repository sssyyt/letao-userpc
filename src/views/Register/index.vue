<script setup>

import { ref, onMounted } from 'vue'
import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { postRegister } from '@/apis/user'
import JSEncrypt from 'jsencrypt'
import { getRSA } from '@/apis/user'
const rsastring = ref({})
const getRsastring = async () => {
    const res = await getRSA()
    rsastring.value = res
    //console.log(rsastring.value.data)
}
onMounted(() => { getRsastring() })
const form = ref({
    account: "默认name",
    phoneNumber: "18362280000",
    password: "112233",
    passwordConfirmation:'112233',
    sex: "0",
    email: "123@qq.com",
    agree: true
})

const rules = {
    account: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    phoneNumber: [
        {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
        },
        {
            validator: function (rule, value, callback) {
                if (/^1[34578]\d{9}$/.test(value) == false) {
                    callback(new Error("手机号格式错误"));
                } else {
                    callback();
                }
            },
            trigger: "blur"
        }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 32, message: '密码长度为6-32个字符', trigger: 'blur' },
    ],
    sex: [
        { required: false, trigger: 'blur' },
    ],
    email: [
        { required: false, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    passwordConfirmation: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        { min: 6, max: 32, message: '密码长度为6-32个字符', trigger: 'blur' },
        ],
agree: [
    {
        validator: (rule, value, callback) => {
            if (value) {
                callback()
            } else {
                callback(new Error('请勾选协议'))
            }
        }
    }
]
}



const formRef = ref(null)
const router = useRouter()
const rcode = ref(0)

const doRegister = () => {
    const { account, phoneNumber, password, passwordConfirmation, sex, email } = form.value

    if (passwordConfirmation === password) {
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(rsastring.value.data);
        var encrypted = encrypt.encrypt(password);
        // 调用实例方法
        formRef.value.validate(async (valid) => {
            if (valid) {
                const res = await postRegister({ account, phoneNumber, password: encrypted, sex, email })
                rcode.value = res
              //  console.log(82173, rcode.value)
                if (rcode.value.code === 1) {
                    ElMessage({ type: 'success', message: '注册成功' })
                    router.replace({ path: '/login' })
                }
                 if (rcode.value.code === 0) {
                    ElMessage({ type: 'warning', message: rcode.value.msg })

                }
            }
           
        })
    }
     else {
        ElMessage({ type: 'warning', message: '确认密码与原密码不匹配' })

    }
}
</script>

<template>
    <div>
        <header class="register-header">
            <div class="container m-top-20">
                <h1 class="logo">
                    <RouterLink to="/">乐淘商务</RouterLink>
                </h1>
                <div class="router">
                    <RouterLink class="login" to="/login">
                        已有账号，去登录
                        <i class="iconfont icon-angle-right"></i>
                        <i class="iconfont icon-angle-right"></i>
                    </RouterLink>

                    <RouterLink class="entry" to="/">
                        进入网站首页
                        <i class="iconfont icon-angle-right"></i>
                        <i class="iconfont icon-angle-right"></i>
                    </RouterLink>


                </div>
            </div>
        </header>
        <section class="register-section">
            <div class="wrapper">
                <nav>
                    <a href="javascript:;">账户注册</a>
                </nav>
                <div class="account-box">
                    <div class="form">
                        <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="82px"
                            status-icon>

                            <el-form-item prop="account" label="用户名">
                                <el-input v-model="form.account" clearable/>
                            </el-form-item>

                            <el-form-item prop="phoneNumber" label="手机号">
                                <el-input v-model="form.phoneNumber" clearable/>
                            </el-form-item>
 
                            <el-form-item prop="password" label="密码">
                                <el-input v-model="form.password" clearable type="password"/>
                            </el-form-item>
                            <el-form-item prop="passwordConfirmation" label="确认密码">
                                <el-input type="password" v-model="form.passwordConfirmation" clearable/>
                            </el-form-item>

                            <el-form-item prop="sex" label="性别">
                                <el-select v-model="form.sex" placeholder="请选择性别">
                                    <el-option label="男" value="1" />
                                    <el-option label="女" value="0" />
                                </el-select>
                            </el-form-item>


                            <el-form-item prop="email" label="邮箱">
                                <el-input v-model="form.email" clearable/>
                            </el-form-item>

                            <el-form-item prop="agree" label-width="46px">
                                <el-checkbox size="large" v-model="form.agree">
                                    我已同意隐私条款和服务条款
                                </el-checkbox>
                            </el-form-item>


                            <el-button size="large" class="subBtn" @click="doRegister">点击注册</el-button>
                        </el-form>
                    </div>
                </div>
            </div>
        </section>

        <footer class="register-footer">
            <div class="container">
                <p>
                    <a href="javascript:;">关于我们</a>
                    <a href="javascript:;">帮助中心</a>
                    <a href="javascript:;">售后服务</a>
                </p>
                <p>CopyRight &copy; 乐淘商务</p>
            </div>
        </footer>
    </div>
</template>

<style scoped lang='scss'>
.register-header {
    background: #fff;
    border-bottom: 1px solid #e4e4e4;

    .container {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
    }

    .router {
        display: flex;
        flex-direction: column-reverse;
        /* 使用column-reverse让子元素竖着排列，并且右对齐 */
        align-items: flex-end;
        /* 右对齐 */
        justify-content: flex-start;
        /* 在主轴上从上到下排列 */


        .entry {
            width: 170px;
            margin-bottom: 8px;
            font-size: 16px;
            text-align: right;

            i {
                font-size: 14px;
                color: $letaoColor;
                letter-spacing: -5px;
            }

            &:hover {
                color: $letaoColor;
                border-bottom: 1px solid $letaoColor;
            }
        }

        .login {
            width: 170px;
            margin-bottom: 35px;
            font-size: 16px;
            text-align: right;

            i {
                font-size: 14px;
                color: $letaoColor;
                letter-spacing: -5px;
            }

            &:hover {
                color: $letaoColor;
                border-bottom: 1px solid $letaoColor;
            }
        }

    }

    .logo {
        width: 200px;

        a {
            display: block;
            height: 132px;
            width: 100%;
            text-indent: -9999px;
            background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
        }
    }

    .sub {
        flex: 1;
        font-size: 24px;
        font-weight: normal;
        margin-bottom: 38px;
        margin-left: 20px;
        color: #666;
    }


}

.register-section {
    background: url('@/assets/images/login-bg2.svg') no-repeat center / cover;
    height: 558px;
    position: relative;

    .wrapper {
        width: 380px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 25px;
        transform: translate3d(100px, 0, 0);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

        nav {
            font-size: 14px;
            height: 55px;
            margin-bottom: 20px;
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            padding: 0 50px;
            text-align: right;
            align-items: center;

            a {
                flex: 1;
                line-height: 1;
                display: inline-block;
                font-size: 18px;
                position: relative;
                text-align: center;
            }
        }
    }
}

.register-footer {
    padding: 30px 0 50px;
    background: #fff;

    p {
        text-align: center;
        color: #999;
        padding-top: 20px;

        a {
            line-height: 1;
            padding: 0 10px;
            color: #999;
            display: inline-block;

            ~a {
                border-left: 1px solid #ccc;
            }
        }
    }
}

.account-box {
    .toggle {
        padding: 15px 40px;
        text-align: right;

        a {
            color: $letaoColor;

            i {
                font-size: 14px;
            }
        }
    }

    .form {
        padding: 0 20px 20px 20px;

        &-item {
            margin-bottom: 28px;

            .input {
                position: relative;
                height: 36px;

                >i {
                    width: 34px;
                    height: 34px;
                    background: #cfcdcd;
                    color: #fff;
                    position: absolute;
                    left: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 18px;
                }

                input {
                    padding-left: 44px;
                    border: 1px solid #cfcdcd;
                    height: 36px;
                    line-height: 36px;
                    width: 100%;

                    &.error {
                        border-color: $priceColor;
                    }

                    &.active,
                    &:focus {
                        border-color: $letaoColor;
                    }
                }

                .code {
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 14px;
                    background: #f5f5f5;
                    color: #666;
                    width: 90px;
                    height: 34px;
                    cursor: pointer;
                }
            }

            >.error {
                position: absolute;
                font-size: 12px;
                line-height: 28px;
                color: $priceColor;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }
            }
        }

        .agree {
            a {
                color: #069;
            }
        }

        .btn {
            display: block;
            width: 100%;
            height: 40px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            background: $letaoColor;

            &.disabled {
                background: #cfcdcd;
            }
        }
    }

    .action {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .url {
            a {
                color: #999;
                margin-left: 10px;
            }
        }
    }
}

.subBtn {
    background: $letaoColor;
    width: 100%;
    color: #fff;
}
</style>