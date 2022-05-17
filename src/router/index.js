import Vue from "vue"
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from '../views/Home.vue'
import Shopping from '../views/Shopping.vue'
import User from '../views/User.vue'
import Index from '../views/Index.vue'
import Goodslist from '../views/Goodslist.vue'
import Order from '../views/Order.vue'
const router = new VueRouter({
    routes: [
        {
            path: "/",
            redirect:"/home/index"
        },
        {
            path: "/home",
            component: Index,
            children: [
                {
                    path: "index",
                    component: Home,
                    meta: {
                        name: "Home",
                        ismainpage:true,
                    }
                },
                {
                    path: "shopping",
                    component: Shopping,
                    meta: {
                        name: "Shopping",
                        ismainpage: true,
                    }
                },
                {
                    path: "user",
                    component: User,
                    meta: {
                        name: "User",
                        ismainpage: true,
                    }
                },
            ]
        },
        {
            path: "/goodslist",
            component: Goodslist,
            meta: {
                title:"商品列表"
            }
        },
        {
            path: "/order",
            component: Order,
            meta: {
                title: "我的订单"
            }
        },
        
    ]
})

export default router