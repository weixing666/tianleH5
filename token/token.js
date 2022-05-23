// 服务端生成token
var jwt = require('jsonwebtoken');

var data = {
    id: "1",
    username: "小白"
}

var primaryKey = '￥R^^&677568'; //随机加密

 
// 检验token是否有效（是否篡改，是否过期）
// 对数据进行加密签名,一个小时内有效
// primaryKey加密
// 用户==>data

// 生成token
var token = jwt.sign(data, primaryKey, { expiresIn: '1h' });//有效期

try {
    // 校验token是否有效
    var decoded = jwt.verify(token, primaryKey);
    console.log(decoded) //{ id: '1', username: '小白', iat: 1653015074, exp: 1653018674 }
} catch (err) {
    console.log('校验失败')
}