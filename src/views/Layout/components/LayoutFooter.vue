<script setup>
import { ref } from 'vue'
import ChatComponent from '/Users/shiyutian/letao/letao_userpc/src/views/Layout/components/chat.vue';
const showChat = ref(false)// 控制聊天框显示/隐藏
//const msglist = ref([]) // 存储聊天消息

const toggleChat = () => {
    showChat.value = !showChat.value; // 切换聊天框的显示状态
}
const closeChat = () => {
    //console.log('dianjiguanbi');
    showChat.value = false; // 关闭聊天框
}


</script>

<template>
    <footer class="app_footer">
        <!-- 联系我们 -->
        <div class="contact">
            <div class="container">
                <dl>
                    <dt>客户服务</dt>
                    <div>
                        <dd @click="toggleChat">
                            <i class="iconfont icon-kefu"></i> 在线客服
                        </dd>
                        <!-- 使用 v-if 条件渲染聊天框 -->

                    </div>
                    <dd><i class="iconfont icon-question" @click="$router.push('/help')"></i> 帮助中心</dd>
                </dl>

                <dl>
                    <dt>服务热线</dt>
                    <dd class="hotline">156-4088-5580 <small>周一至周日 8:00-18:00</small></dd>
                </dl>
            </div>
        </div>
        <!-- 其它 -->
        <div class="extra">
            <div class="container">
                <div class="slogan">
                    <a href="javascript:;">
                        <i class="iconfont icon-footer01"></i>
                        <span>价格亲民</span>
                    </a>
                    <a href="javascript:;">
                        <i class="iconfont icon-footer02"></i>
                        <span>物流快捷</span>
                    </a>
                    <a href="javascript:;">
                        <i class="iconfont icon-footer03"></i>
                        <span>品质新鲜</span>
                    </a>
                </div>
                <!-- 版权信息 -->
                <div class="copyright">
                    <p>
                        <a href="javascript:;" @click="$router.push('/aboutus')">关于我们</a>
                        <a href="javascript:;" @click="$router.push('/help')">帮助中心</a>
                        <!-- <a href="javascript:;">售后服务</a> -->

                    </p>
                    <p>CopyRight © 乐淘商务 </p>
                </div>
            </div>
        </div>
        <div v-if="showChat">
            <!-- 引入聊天框组件并传递必要的数据 -->
            <ChatComponent :closeChat="closeChat" />
        </div>
    </footer>
</template>

<style scoped lang='scss'>
.app_footer {
    overflow: hidden;
    background-color: #f5f5f5;
    padding-top: 20px;

    .contact {
        background: #fff;

        .container {
            padding: 60px 0 40px 25px;
            display: flex;
        }

        dl {
            height: 190px;
            text-align: center;
            padding: 0 72px;
            //border-right: 1px solid #f2f2f2;
            color: #999;

            &:first-child {
                padding-left: 0px;
                width: 340px;
            }

            &:last-child {
                border-right: none;
                padding-left: 600px;
                padding-right: 0px;
            }
        }

        dt {
            line-height: 1;
            font-size: 18px;

            &:last-child {
                margin-left: 500px;
            }
        }

        dd {
            margin: 36px 12px 0 0;
            float: left;
            width: 92px;
            height: 92px;
            padding-top: 10px;
            border: 1px solid #ededed;
            justify-content: space-between;

            .iconfont {
                font-size: 36px;
                display: block;
                color: #666;
            }

            &:hover {
                .iconfont {
                    color: $letaoColor;
                }
            }

            &:last-child {
                margin-left: 20px;
            }
        }

        .qrcode {
            width: 92px;
            height: 92px;
            padding: 7px;
            border: 1px solid #ededed;
        }

        .download {
            padding-top: 5px;
            font-size: 14px;
            width: auto;
            height: auto;
            border: none;

            span {
                display: block;
            }

            a {
                display: block;
                line-height: 1;
                padding: 10px 25px;
                margin-top: 5px;
                color: #fff;
                border-radius: 2px;
                background-color: $letaoColor;
            }
        }

        .hotline {
            padding-top: 20px;
            font-size: 22px;
            color: #666;
            width: auto;
            height: auto;
            border: none;

            small {
                display: block;
                font-size: 15px;
                color: #999;
            }
        }
    }

    .extra {
        background-color: #333;
    }

    .slogan {
        height: 178px;
        line-height: 58px;
        padding: 60px 100px;
        border-bottom: 1px solid #434343;
        display: flex;
        justify-content: space-between;

        a {
            height: 58px;
            line-height: 58px;
            color: #fff;
            font-size: 28px;

            i {
                font-size: 50px;
                vertical-align: middle;
                margin-right: 10px;
                font-weight: 100;
            }

            span {
                vertical-align: middle;
                text-shadow: 0 0 1px #333;
            }
        }
    }

    .copyright {
        height: 170px;
        padding-top: 40px;
        text-align: center;
        color: #999;
        font-size: 15px;

        p {
            line-height: 1;
            margin-bottom: 20px;
        }

        a {
            color: #999;
            line-height: 1;
            padding: 0 10px;
            border-right: 1px solid #999;

            &:last-child {
                border-right: none;
            }
        }
    }
}
</style>