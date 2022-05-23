import instance from "./instance.js"

// 商品列表
export function fetchgoodslist(page = 1, limit = 10) {
    return instance.get(`api/getgoods?pageindex=${page}&pagesize=${limit}`)
}

