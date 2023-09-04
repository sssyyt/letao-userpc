<script setup>
// 表单校验（账号名+密码）
import JSEncrypt from 'jsencrypt'
import { ref, onMounted } from 'vue'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { getRSA } from '@/apis/user'
const userStore = useUserStore()
const rsastring = ref({})
const getRsastring = async () => {
    const res = await getRSA()
    rsastring.value = res
    //console.log(rsastring.value.data)
}
onMounted(() => { getRsastring() })
// 1. 准备表单对象
const form = ref({
    phoneNumber: '15640885580',
    password: '123456',
    agree: true
})

const loginMethod = ref({ method: 'phoneNumber' })
// 2. 准备规则对象
const rules = {
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
        { min: 6, max: 32, message: '密码长度为6-32', trigger: 'blur' },
    ],
    agree: [
        {
            validator: (rule, value, callback) => {
                //console.log(value)
                // 自定义校验逻辑
                // 勾选就通过 不勾选就不通过
                if (value) {
                    callback()
                } else {
                    callback(new Error('请勾选协议'))
                }
            }
        }
    ]
}



// 3. 获取form实例做统一校验
const formRef = ref(null)
const router = useRouter()
const doLogin = () => {
    const { phoneNumber, password } = form.value
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(rsastring.value.data);
    var encrypted = encrypt.encrypt(password);
    //用rsa公钥对密码进行加密
    //   console.log(111, phoneNumber);
    // console.log(222,encrypted);
    // 调用实例方法
    formRef.value.validate(async (valid) => {
        // valid: 所有表单都通过校验  才为true
        // console.log(valid)
        // 以valid做为判断条件 如果通过校验才执行登录逻辑
        if (valid) {
            // TODO LOGIN
            //  console.log(111111, phoneNumber);
            // console.log(222222, encrypted);
            await userStore.getUserInfo({ phoneNumber, password:encrypted })
            if (userStore.userInfo.code === 1) {
                ElMessage({ type: 'success', message: '登录成功' })
                router.replace({ path: '/' })
            }
            else {
                ElMessage({ type: 'warning', message: userStore.userInfo.msg })
            }
        }
    })
}

// 1. 用户名和密码 只需要通过简单的配置（看文档的方式 - 复杂功能通过多个不同组件拆解）
// 2. 同意协议  自定义规则  validator:(rule,value,callback)=>{}
// 3. 统一校验  通过调用form实例的方法 validate -> true
</script>

<template>
    <div>
        <header class="login-header">
            <div class="container m-top-20">
                <h1 class="logo">
                    <RouterLink to="/">乐淘商务</RouterLink>
                </h1>

                <div class="router">
                    <RouterLink class="register" to="/register">
                        还没有账号，去注册
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
        <section class="login-section">
            <div class="wrapper">
                <nav>
                    <a href="javascript:;" @click="loginMethod.method = 'phoneNumber'"
                        :class="{ active: loginMethod.method === 'phoneNumber' }" class="login-link">账户登录</a>
                    <a href="javascript:;" @click="loginMethod.method = 'phone'"
                        :class="{ active: loginMethod.method === 'phone' }" class="login-link">手机验证码登录</a>
                </nav>


                <div class="phoneNumber-box">
                    <div v-if="loginMethod.method === 'phoneNumber'" class="form">
                        <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="90px"
                            status-icon>
                            <el-form-item prop="phoneNumber" label="账户">
                                <el-input v-model="form.phoneNumber" />
                            </el-form-item>
                            <el-form-item prop="password" label="密码">
                                <el-input v-model="form.password" />
                            </el-form-item>
                            <el-form-item prop="agree" label-width="22px">
                                <el-checkbox size="large" v-model="form.agree">
                                    我已同意隐私条款和服务条款
                                </el-checkbox>
                            </el-form-item>
                            <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
                        </el-form>
                    </div>

                    <div v-if="loginMethod.method === 'phone'" class="form">
                        <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="90px"
                            status-icon>
                            <el-form-item prop="phoneNumber" label="手机号">
                                <el-input v-model="form.phoneNumber" />
                            </el-form-item>
                            <el-form-item prop="password" label="验证码">
                                <el-input v-model="form.password" />
                            </el-form-item>
                            <el-form-item prop="agree" label-width="22px">
                                <el-checkbox size="large" v-model="form.agree">
                                    我已同意隐私条款和服务条款
                                </el-checkbox>
                            </el-form-item>
                            <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
                        </el-form>
                    </div>
                </div>
            </div>
        </section>

        <footer class="login-footer">
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
.login-header {
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

        .register {
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

.login-section {
    background: url('@/assets/images/login-bg2.svg') no-repeat center / cover;
    height: 558px;
    position: relative;

    .wrapper {
        width: 450px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 90px;
        transform: translate3d(100px, 0, 0);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

        nav {
            font-size: 14px;
            height: 55px;
            margin-bottom: 20px;
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            padding: 10px 40px;
            text-align: right;
            align-items: center;

            .login-link {
                text-decoration: none;
                padding: 10px 20px;
                color: #333;
                transition: background-color 0.3s, color 0.3s;
            }

            .login-link.active {
                background-color: $letaoColor;
                color: #fff;
            }

            a {
                flex: 1;
                line-height: 1;
                display: inline-block;
                font-size: 18px;
                position: relative;
                text-align: center;

                .active {
                    color: $letaoColor;
                    border-bottom: 1px solid $letaoColor;
                }
            }
        }
    }
}

.login-footer {
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

.phoneNumber-box {
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