<template>
  <div>
    <van-empty description="请完善收货地址" v-show="list.length === 0" />
    <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit" @select="switchAddress" />
  </div>
</template>

<script>
import { fetchgetAddress } from "../api/user";
import { mapState } from "Vuex";
export default {
  data() {
    return {
      chosenAddressId: "", // 默认选中的地址ID
      // 全部地址,为了待会传参数给编辑地址
      allAddress: "",
      // 用户的地址
      list: [],
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
    // 1.添加用户地址
    onAdd() {
      this.$router.push("/addAddress");
    },
    // 2.编辑用户地址
    onEdit(data, index) {
      // 提示修改第几条地址
      this.$toast('编辑地址:' + index);
      // 通过路由传输,需要转化为字符串
      this.$router.push("/editaddress/" + JSON.stringify(data));
    },
    // 3.获取用户的收货地址,渲染数据
    async _fetchgetAddress() {
      let result = await fetchgetAddress(this.userInfo.id);
      // 没有地址,则退出
      if (result.length === 0) {
        return;
      }
      // 有地址,改造数据
      result = result.map((item) => {
        if (item.isDefault == 1) {
          this.chosenAddressId = item.id;
        }
        let { province, city, country, addressDetail } = item;
        item.address = `${province === city ? "" : province}${city}${country}${addressDetail}`;
        return item;
      });
      // 把默认地址排在第一位,找到返回下标,没有找到返回-1
      let index = result.findIndex((item) => item.isDefault == true);
      if (index !== -1) {
        // 找到,先用一个变量保存起来,然后再添加
        let isDefaultindex = result[index];
        this.chosenAddressId = isDefaultindex.id; //设置默认选中
        result.splice(index, 1); // 删除(参数1:从哪个下标开始删除,参数2:删除的元素个数)
        result.unshift(isDefaultindex); // 添加到头部 (向数组首位添加新内容)
      }
      this.list = result;
    },

    //4.切换选中地址触发
    switchAddress(data) {
      let { id } = data;

      this.$router.push(`/home/shopping/?id=${id}`);
    },
  },
};
</script>

<style>
</style>