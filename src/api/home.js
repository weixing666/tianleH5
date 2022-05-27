import instance from "./instance.js"

// 轮播图
export function fetchslideshow() {
    return instance.get("api/getlunbo")
}

// 商品列表
export function fetchgoodslist(page = 1, limit = 10) {
    return instance.get(`api/getgoods?${page}=1&${limit}`)
}

// 搜索结果
export function fetchsearch(value, sort = "buy", page = 1, limit = 10, order = "desc") {
    console.log(sort);
    return instance.get(`api/search?value=${value}&sort=${sort}&page=${page}&pagesize=${limit}&order=${order}`)
}