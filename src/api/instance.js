import axios from 'axios'
import Vue from 'vue'
import router from '../router/index'
import { Toast } from 'vant';
import store from '../store';
Vue.use(Toast);

const instance = axios.create({
    baseURL: 'http://api.w0824.com/',
    timeout: 1000,
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 针对token是否过期校验
    if (store.state.token) {
        config.headers['token'] = store.state.token
    }
    // console.log('请求拦截器')
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
    });
    return config;
}, function (error) {
    // 对请求错误做些什么
    Toast.clear();
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    Toast.clear();
    let { status, message } = response.data
    if (status === 40001) {
        // 说明token过期了,我要看你访问的页面是不是需要权限的,需要额话我要打回到登陆页面
        // 清除原token和userInfo和购物车等用户相关的信息
        store.commit('clearUserInfo')
        router.push('/login')
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    Toast.clear();
    return Promise.reject(error);
});

// 导出axios实例
export default instance