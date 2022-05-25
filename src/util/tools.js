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
