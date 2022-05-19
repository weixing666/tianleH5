import Vue from "vue"
import VueRouter from 'vue-router'
import 'NProgress/NProgress.css'
import NProgress from 'NProgress'
Vue.use(VueRouter)
// import Home from '../views/Home.vue'
// import Shopping from '../views/Shopping.vue'
// import User from '../views/User.vue'
// import Index from '../views/Index.vue'
// import Goodslist from '../views/Goodslist.vue'
// import Order from '../views/Order.vue'
const router = new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/home/index"
        },
        {
            path: "/home",
            component: () => import('../views/Index.vue'),
            children: [
                {
                    path: "index",
                    component: () => import('../views/Home.vue'),
                    // component: Home,
                    meta: {
                        name: "Home",
                        ismainpage: true,
                    },
                    children: [{
                        path: "search",
                        component: () => import('../views/Search.vue'),
                        meta: {
                            ismainpage: true,
                        }
                    }]
                },
                {
                    path: "shopping",
                    component: () => import('../views/Shopping.vue'),
                    // component: Shopping,
                    meta: {
                        name: "Shopping",
                        ismainpage: true,
                    }
                },
                {
                    path: "user",
                    component: () => import('../views/User.vue'),
                    // component: User,
                    meta: {
                        name: "User",
                        ismainpage: true,
                    }
                },
            ]
        },
        {
            path: "/goodslist",
            component: () => import('../views/Goodslist.vue'),
            meta: {
                title: "商品列表"
            }
        },
        {
            path: "/order",
            component: () => import('../views/Order.vue'),
            meta: {
                title: "我的订单"
            }
        },
        {
            path: "/login",
            component: () => import('../views/Login.vue'),
            meta: {
                title: "登陆"
            }
        },
        {
            path: "/searchresult/:value",
            component: () => import('../views/SearchResult.vue'),
            meta: {
                ismainpage: true,
            },
            props: true
        },
        {
            path: "/goodsdetail/:value",
            component: () => import('../views/Goodsdetail.vue'),
            meta: {
                title: "商品详情"
            },
            props: true
        },
    ]
})
NProgress.configure({
    showSpinner: false
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    next();
})
router.afterEach((to, from) => {
    NProgress.done()
})
export default router