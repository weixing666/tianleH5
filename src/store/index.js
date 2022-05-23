import Vue from "vue"
import Vuex from "Vuex"
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

// 创建Store
export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    actions: {},
    mutations: {
        // 加入购物车
        addcardata(state, cardata) {
            // 找到之后返回元素,没有找到返回未定义
            let result = state.cardata.find(item => item.id === cardata.id)
            if (result) {
                result.num += cardata.num
            } else {
                state.cardata.push(cardata)
            }
        },
        // 登陆成功之后存储token
        gettoken(state, token) {
            state.token = token
        },
        // 每次经过导航守卫,获取最新的token,因为vuex只会初始化一次,更改token之后拿到的还是旧的token
        setToken(state, token) {
            state.token = token
        },
        // 登陆成功之后存储用户信息
        getuserinfo(state, userInfo) {
            state.userInfo = userInfo
        },
        // 修改库存
        updatenum(state, numdata) {
            let find = state.cardata.find(item => item.id === numdata.id)
            find.num = numdata.num
        },
        // 修改状态
        updatecheek(state, ischeek) {
            let find = state.cardata.find(item => item.id === ischeek.id)
            find.check = ischeek.ischeek
        },
        // 删除商品
        delete(state, id) {
            let index = state.cardata.findIndex(item => item.id === id)
            state.cardata.splice(index, 1)
        },
        // 是否全选
        Allischeek(state, Allcheck) {
            if (Allcheck) {
                state.cardata.forEach(item => {
                    item.check = true
                })
            } else {
                state.cardata.forEach(item => {
                    item.check = false
                })
            }
        },
        // 修改搜索数值
        upsearchvalue(state,value) {
            state.searchvalue.value = value
        },
        // 权限校验失败,清除原本的用户信息
        clearUserInfo(state) {
            state.token = ''
            state.cardata = []
            state.userInfo = {}
        },
        // 更细用户头像的时候
        updatedav(state,value) {
            state.userInfo.avatar = value
        },
    },
    state: {
        token: '',
        cardata: [],
        userInfo: {},
        searchvalue: { value: "" },
    },
    getters: {
        // 购物车的总数量,
        carnum(state) {
            let total = 0
            state.cardata.forEach(item => {
                total += item.num
            })
            return total
        },
        // 获取购物车中的所有id
        getcarid(state) {
            let id = ''
            if (state.cardata.length === 1) {
                state.cardata.forEach(item => { id += item.id })
                return id
            } else if (state.cardata.length > 1) {
                state.cardata.forEach(item => { id += item.id + "," })
                return id.slice(0, id.length - 1)
            } else {
                return ""
            }
        },

        // 监测库存
        inventory(state) {
            let objmap = {}
            state.cardata.forEach(item => {
                objmap[item.id] = item.num
            })
            return objmap
        },
        // 监测是否选中
        ischecked(state) {
            let objmap = {}
            state.cardata.forEach(item => {
                objmap[item.id] = item.check
            })
            return objmap
        },
        // 监测选购件数
        buynum(state) {
            let buynumber = 0
            let result = state.cardata.filter(item => item.check === true)
            result.forEach(item => {
                buynumber += item.num
            })
            return buynumber
        },
        // 监测总价格
        totalpic(state) {
            let pic = 0
            let result = state.cardata.filter(item => item.check === true)
            result.forEach(item => {
                pic += item.pirce * item.num
            })
            return pic

        },
        // 监测是否全选
        isAllchecked(state, isAll) {
            let mapckeck = {}
            mapckeck.check = state.cardata.every(item => item.check === true)
            return mapckeck
        },
        // 检测搜索之数值
        sevalue(state) {
            let mapvalue = {}
            mapvalue.value = state.searchvalue.value
            return mapvalue
        }
    },
})