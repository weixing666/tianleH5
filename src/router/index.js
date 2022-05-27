import Vue from "vue"
import VueRouter from 'vue-router'
import 'NProgress/NProgress.css'
import NProgress from 'NProgress'
import store from "../store/index.js"
Vue.use(VueRouter)
import Home from '../views/Home.vue'
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
                    path: "shopping/",
                    component: () => import('../views/Shopping.vue'),
                    meta: {
                        name: "Shopping",
                        ismainpage: true,
                    },
                    props: true
                },
                {
                    path: "user",
                    component: () => import('../views/User.vue'),
                    meta: {
                        name: "User",
                        ismainpage: true,
                        isneedtologin: true
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
        {
            path: "/address",
            component: () => import('../views/Address.vue'),
            meta: {
                title: "收货地址"
            },
            props: true
        },
        {
            path: "/addAddress",
            component: () => import('../views/addAddress.vue'),
            meta: {
                title: "添加收货地址"
            },
            props: true
        },
        {
            path: "/editaddress/:value",
            component: () => import('../views/Editaddress.vue'),
            meta: {
                title: "编辑地址"
            },
            props: true
        },
        {
            path: "/register",
            component: () => import('../views/Register.vue'),
            meta: {
                title: "用户注册"
            },
            props: true
        },
        {
            path: "/orderlist",
            component: () => import('../views/Orderlist.vue'),
            meta: {
                title: "我的订单"
            },
            props: true
        },
        {
            path: "/orderdetails/:order_id",
            component: () => import('../views/OrderDetails.vue'),
            meta: {
                title: "订单详情"
            },
            props: true
        },
    ]
})

//关闭右侧图标圈圈
NProgress.configure({
    showSpinner: false
})

// 前守卫(权限校验)
router.beforeEach((to, from, next) => {
    NProgress.start()
    let jurisdiction = to.meta.isneedtologin
    if (jurisdiction) {
        if (store.state.token) {
            next();
        } else {
            // 为了用户在登陆之后重定向回原来的页面,fullPath 为原来的全路由信息
            router.push("/login?redirect?" + to.fullPath)
        }
    }
    next();
})
// 后守卫
router.afterEach((to, from) => {
    NProgress.done()
})



export default router