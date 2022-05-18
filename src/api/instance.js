import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'vant';
Vue.use(Toast);

const instance = axios.create({
    baseURL: 'http://api.w0824.com/',
    timeout: 1000,
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
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
    // console.log('响应拦截器')
    Toast.clear();
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    Toast.clear();
    return Promise.reject(error);
});

// 导出axios实例
export default instance