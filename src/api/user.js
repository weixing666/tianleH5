import instance from "./instance.js"

// 获取用户的地址
export function fetchgetuseraddress(user_id) {
    return instance.get(`api/addaddress/${user_id}`)
}

// 用户注册
export function fetchregister(data) {
    return instance.post(`api/register`, data)
}

// 用户登陆
export function fetchlogin(data) {
    return instance.post(`api/login`, data)
}

// 获取购物车的商品
export function fetchgetcardata(id) {
    return instance.get(`api/getshopcarlist/${id}`)
}

// 添加用户收货地址
export function fetchaddAddress(userid, data) {
    return instance.post(`api/addaddress/${userid}`, data)
}

// 获取用户的收货地址
export function fetchgetAddress(user_id) {
    return instance.get(`api/getaddress/${user_id}`)
}

// 删除用户地址
export function fetchdeladdress(id) {
    return instance.post(`api/deladdress/${id}`)
}

// 更新用户的地址
export function fetchupdateaddress(id, data) {
    return instance.post(`api/updateaddress/${id}`, data)
}

// 上传用户的头像
export function fetchuploadAvatar(formData) {
    return instance.post(`api/upload`, formData)
}

// 发送订单数据
export function fetchorder(formData) {
    return instance.post(`api/commitorder`, formData)
}

// 获取订单信息
export function fetchgetorderinfo(order_id) {
    return instance.post(`api/getorder/${order_id}`)
}

// 获取用户订单
export function fetchgetorder(user_id) {
    return instance.post(`api/userorder/${user_id}`)
}

// 模拟订单支付
export function fetchPayOrder(order_id) {
    return instance.post(`api/payorder/${order_id}`)
}
