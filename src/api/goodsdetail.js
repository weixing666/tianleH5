import instance from "./instance.js"

// 商品详情图片
export function fetchgoodsdetail(goods_id) {
    return instance.get(`api/getthumbimages/${goods_id}`)
}

// 商品详情信息
export function fetchgoodsinfo(goods_id) {
    return instance.get(`api/getgoodsinfo/${goods_id}`)
}
