<script setup>
import { useUserStore } from '@/stores/userStore'
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router';
const userStore = useUserStore()
const cartStore = useCartStore()
const route= useRouter()
const confirm = () => {
  // console.log('用户要退出登录了')
  // 退出登录业务逻辑实现
  // 1.清除用户信息 触发action
  userStore.clearUserInfo()
  cartStore.clearInfo()
  route.push('/')

}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 多模版渲染 区分登录状态和非登录状态 -->

        <template v-if="userStore.userToken.data">
          <li><a href="javascript:;" @click="$router.push('/user')"><i class=" iconfont icon-user"></i>{{ userStore.userInfo.data.account }}</a></li>
          <li>
            <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;" @click="$router.push('/myorders')">我的订单</a></li>
          <!-- <li><a href="javascript:;">会员中心</a></li> -->
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/register')">注册</a></li>
          <li><a href="javascript:;" @click="$router.push('/login')">登录</a></li>
          <li><a href="javascript:;"  @click="$router.push('/help')">帮助中心</a></li>
          <li><a href="javascript:;" @click="$router.push('/aboutus') ">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #F5F5F5;

  ul {
    display: flex;
    height: 35px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #090909;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $letaoColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>