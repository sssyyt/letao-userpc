<script setup>

import { ref } from 'vue'
import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from 'vue-router'

const form = ref({
    account: "用户tt",
    phoneNumber: "12345678900",
    password: "123456",
    sex: "1",
    email: "123@qq.com"
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
        { required: false, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 32, message: '密码长度为6-32个字符', trigger: 'blur' },
    ],
    email: [
        { required: false, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    validatePassword(rule, value, callback) {
        if (value === '') {
            callback(new Error('请输入密码'));
        } else {
            if (value !== this.form.passwordConfirmation) {
                callback(new Error('密码不匹配'));
            } else {
                callback();
            }
        }
    },
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
const doLogin = () => {
    const { account, password } = form.value
    // 调用实例方法
    formRef.value.validate(async (valid) => {
        // valid: 所有表单都通过校验  才为true
       // console.log(valid)
        // 以valid做为判断条件 如果通过校验才执行登录逻辑
        if (valid) {
            // TODO LOGIN
            await userStore.getUserToken({ account, password })
            // 1. 提示用户
            ElMessage({ type: 'success', message: '登录成功' })
            // 2. 跳转首页
            router.replace({ path: '/' })
        }
    })
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
                        <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="69px"
                            status-icon>

                            <el-form-item prop="account" label="用户名">
                                <el-input v-model="form.account" />
                            </el-form-item>

                            <el-form-item prop="phoneNumber" label="手机号">
                                <el-input v-model="form.phoneNumber" />
                            </el-form-item>

                            <el-form-item prop="password" label="密码">
                                <el-input v-model="form.password" />
                            </el-form-item>
                            <el-form-item prop="passwordConfirmation" label="确认密码"
                                :rules="[{ validator: validatePassword, trigger: 'blur' }]">
                                <el-input type="password" v-model="form.passwordConfirmation" />
                            </el-form-item>

                            <el-form-item prop="gender" label="性别">
                                <el-select v-model="form.gender" placeholder="请选择性别">
                                    <el-option label="男" value="男" />
                                    <el-option label="女" value="女" />
                                    <el-option label="不填写" value="" />
                                </el-select>
                            </el-form-item>


                            <el-form-item prop="email" label="邮箱">
                                <el-input v-model="form.email" />
                            </el-form-item>

                            <el-form-item prop="agree" label-width="46px">
                                <el-checkbox size="large" v-model="form.agree">
                                    我已同意隐私条款和服务条款
                                </el-checkbox>
                            </el-form-item>


                            <el-button size="large" class="subBtn" @click="doLogin">点击注册</el-button>
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
            padding: 0 40px;
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