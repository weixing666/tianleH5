import {
    nanoid
} from 'nanoid'

// 生成唯一的订单号
export function genOrderId() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let rondom = nanoid();
    let order_id = `${year}${month}${day}${hour}${minute}${rondom}`
    return order_id;
}
// 节流,在一定事件内只触发一次,防抖触发多次,只生效一次
export function throttle(fn, delay) {
    // 记录上一次函数触发的时间
    var lastTime = 0; // 闭包变量，用来记录保存上一次的执行时间
    return function () {
        // 记录当前函数触发的时间
        var nowTime = Date.now();
        var context = this;
        var args = [...arguments];
        if (nowTime - lastTime > delay) {
            // 修正this指向问题 
            fn.apply(context, arguments);
            // 更新上一次的时间
            lastTime = nowTime;
        }
    }
}