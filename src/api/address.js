import instance from "./instance.js"

// 获取用户的地址
export function fetchgetuseraddress(user_id) {
    return instance.get(`api/addaddress/${user_id}`)
}