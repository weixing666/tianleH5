<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { fetchgetAddress } from "../api/user";
import { mapState, mapGetters, mapActions, mapMutations } from "Vuex";
export default {
  data() {
    return {
      chosenAddressId: "", // 默认选中的地址ID
      // 全部地址
      allAddress: "",
      // 用户的地址
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
        },
      ],
      // 超出配送范围
      disabledList: [
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号",
        },
      ],
    };
  },
  created() {
    // 获取用户的收货地址
    this._fetchgetAddress();
  },
  computed: {
    ...mapState(["userInfo"]),
  },

  methods: {
    // 添加用户地址
    onAdd() {
      this.$router.push("/addAddress");
    },
    // 编辑用户地址
    onEdit(data, index) {
      let iddata = this.allAddress[index];
      // 通过路由传输,需要转化为字符串
      this.$router.push("/editaddress/" + JSON.stringify(iddata));
    },
    // 获取用户的收货地址,渲染数据
    async _fetchgetAddress() {
      let result = await fetchgetAddress(this.userInfo.id);
      // 如果没有地址,则退出
      if (result.length === 0) {
        return;
      } else {
        // 把默认地址排在第一位,找到返回下标,没有找到返回-1
        let index = result.findIndex(item => item.isDefault == true)
        if(index !== -1){
          // 找到,先用一个变量保存起来,然后再添加
          let isDefaultindex = result[index]
          this.chosenAddressId = isDefaultindex.id //设置默认选中
          result.splice(index,1) // 删除(参数1:从哪个下标开始删除,参数2:删除的元素个数)
          result.unshift(isDefaultindex) // 添加到头部 (向数组首位添加新内容)
        }
        this.allAddress = result;
        // 循环加工赋值
        let list = [];
        result.forEach((item, index) => {
          list[index] = {
            id: item.id,
            name: item.name,
            tel: item.tel,
            address: `${item.province}${item.city}${item.country}${item.addressDetail}`,
            isDefault: item.isDefault === 1 ? true : false,
          };
        });
        this.list = list;
      }
    },
  },
};
</script>

<style>
</style>