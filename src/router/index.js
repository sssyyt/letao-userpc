import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import miaosha from '@/views/miaosha/index.vue'
import categorytwo from '@/views/CategoryTwo/index.vue'
import Register from "@/views/Register/index.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        },
        {
          path: 'category/miaosha',
          component: miaosha
        },
        {
          path: 'category/sub/:id',
          component: categorytwo
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
