import instance from "./instance.js"

// ๅๅๅ่กจ
export function fetchgoodslist(page = 1, limit = 10) {
    return instance.get(`api/getgoods?pageindex=${page}&pagesize=${limit}`)
}

