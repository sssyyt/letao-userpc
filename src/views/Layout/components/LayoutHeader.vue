//导航栏亮
<script setup>
import { getCategoryAPI } from '@/apis/categoryone'
import { onMounted, ref } from 'vue'
import HeaderCart from './HeaderCart.vue'
//import { useCartStore } from '@/stores/cartStore'
//const cartStore = useCartStore()
//import { linkClasses } from '/Users/shiyutian/letao/letao_userpc/src/views/Layout/composables/getlink';
//从二级分类查出一级分类id
//const {  parentid , skucategory } = getCategorytwo()
const categoryList = ref([])

// console.log(4444, categorytwo.value.id.value);



const getCategory = async () => {
    const res = await getCategoryAPI()
    categoryList.value = res.data
   // console.log
}
//const route = useRoute();
onMounted(() => { getCategory() })



</script>

<template>
    <header class='app-header'>
        <div class="container">
            <h1 class="logo">
                <RouterLink to="/">letao</RouterLink>
            </h1>
            <ul class="app-header-nav">
                <li class="home">
                    <RouterLink to="/">首页</RouterLink>
                </li>
                <li class="home" v-for="item in categoryList" :key="item.id">
                    <!-- :class="linkClasses(item.id)" -->
                    <RouterLink :to="`/category/${item.id}`">
                        {{ item.name }}
                    </RouterLink>
                </li>
                <li class="home">
                    <RouterLink to="/category/miaosha">秒杀专区</RouterLink>
                </li>
            </ul>
            <div class="search">
                <i class="iconfont icon-search"></i>
                <input type="text" placeholder="搜一搜">
            </div>
            <!-- 头部购物车 -->
            <HeaderCart />
            <!-- <p >  {{ cartStore.isLogin }} </p> -->

        </div>
    </header>
</template>


<style scoped lang='scss'>
.app-header {
    background: #fff;

    .container {
        display: flex;
        align-items: center;
    }

    .logo {
        width: 200px;

        a {
            display: block;
            height: 102px;
            width: 90%;
            text-indent: -9999px;
            background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
        }
    }

    .app-header-nav {
        width: 820px;
        display: flex;
        padding-left: 40px;
        position: relative;
        z-index: 998;

        li {
            margin-right: 10px;
            width: 80px;
            text-align: center;

            a {
                font-size: 16px;
                line-height: 32px;
                height: 22px;
                display: inline;

                &:hover {
                    color: $letaoColor;
                    border-bottom: 1px solid $letaoColor;
                }
            }

            .active {
                color: $letaoColor;
                border-bottom: 1px solid $letaoColor;
            }
        }
    }

    .search {
        width: 170px;
        height: 32px;
        position: relative;
        border-bottom: 1px solid #e7e7e7;
        line-height: 32px;

        .icon-search {
            font-size: 18px;
            margin-left: 5px;
        }

        input {
            width: 140px;
            padding-left: 5px;
            color: #666;
        }
    }

    .cart {
        width: 50px;

        .curr {
            height: 32px;
            line-height: 32px;
            text-align: center;
            position: relative;
            display: block;

            .icon-cart {
                font-size: 22px;
            }

            em {
                font-style: normal;
                position: absolute;
                right: 0;
                top: 0;
                padding: 1px 6px;
                line-height: 1;
                background: $helpColor;
                color: #fff;
                font-size: 12px;
                border-radius: 10px;
                font-family: Arial;
            }
        }
    }
}
</style>@/apis/categoryone