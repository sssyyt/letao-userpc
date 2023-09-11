import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import miaosha from '@/views/miaosha/index.vue'
import miaoshaCheckout from '@/views/Checkout/miaoshacheck.vue'
import categorytwo from '@/views/CategoryTwo/index.vue'
import Register from "@/views/Register/index.vue"
import Detail from '@/views/Detail/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import User from '@/views/User/index.vue'
import Help from '@/views/others/help.vue'
import aboutus from '@/views/others/aboutus.vue'
import search from '@/views/Category/search.vue'
import miaoshaDetail from '@/views/miaosha/miaoshaDetail.vue'
import orderman from '/Users/shiyutian/letao/letao_userpc/src/views/Layout/components/ordermanage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: 'help',
          component: Help
        }, {
          path: 'aboutus',
          component: aboutus
        },
        {
          path: 'myorders',
          component: orderman
        },
        {
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        },
        {
          path: 'search/:query',
          component: search
        },
        {
          path: 'user',
          component: User
        },
        {
          path: 'category/miaosha',
          component: miaosha
        },
        {
          path: 'category/sub/:id',
          component: categorytwo
        },
        {
          path: 'detail/:id',
          component: Detail
        },
        {
          path: 'miaosha/:id',
          component: miaoshaDetail
        },
        {
          path: 'checkout',
          component: Checkout
        },
        {
          path: 'miaoshacheckout/:id',
          component: miaoshaCheckout
        }
      ]
    },
   
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }
  ],
   scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
