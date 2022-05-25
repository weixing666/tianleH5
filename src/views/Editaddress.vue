<template>
  <div>
    <van-address-edit :area-list="areaList" :address-info="addressInfo" show-delete show-set-default @save="onSave" @delete="onDelete" @change-area="changeArea" @change-default="eidtdefault" :area-columns-placeholder="['请选择', '请选择', '请选择']" />
  </div>
</template>

<script>
import { Dialog } from "vant";
import { fetchupdateaddress, fetchdeladdress } from "../api/user";
import { mapState } from "Vuex";
import { areaList } from "@vant/area-data";
export default {
  data() {
    return {
      areaList, //areaList,省市信息
      isDefault: "", // 记录当前是否是默认地址
      areaCode: "", // 记录当前地址省市区编码
      fromAddressInfo: JSON.parse(this.value) //传送过来的地址信息
    };
  },
  props: ["value"],
  computed: {
    ...mapState(["userInfo"]),
    addressInfo() { //回显操作
      let address = JSON.parse(this.value); //整理默认地址
      address.isDefault = address.isDefault == 1 ? true : false;
      address.areaCode = address.areaCode.split("-")[2]; //取出最后的区的编码
      return address;
    },
  },
  created() {
    // 取出原默认地址和编码设置默认值
    this.areaCode = this.fromAddressInfo.areaCode;
    this.isDefault = this.fromAddressInfo.isDefault;
  },
  methods: {
    // 保存地址时候触发
    async onSave(content) {
      // 1. 获取接口参数
      let isDefault = this.isDefault ? 1 : 0;
      let areaCode = this.areaCode;
      let country = content.county;
      let data = {
        ...content,
        isDefault,
        areaCode,
        country,
      };
      // 2.发送请求,更新地址
      console.log(data);
      let { status, message } = await fetchupdateaddress(content.id, data);
      // 3.提示成功,跳转到我的地址页面
      if (status === 0) {
        Dialog.alert({
          message: message,
        }).then(() => {
          this.$router.back();
        });
      }
    },
    // 切换省市区触发,有修改就会覆盖,否则就会使用提前保存的默认值
    changeArea(data) {
      this.areaCode = data.map((item) => item.code).join("-");
    },
    // 切换默认地址时候触发
    eidtdefault(value) {
      this.isDefault = value;
    },
    // 删除地址
    async onDelete({ id }) {
      // 发送地址删除地址
      let { status } = await fetchdeladdress(id);
      if (status === 0) {
        Dialog.alert({
          message: "删除成功",
        }).then(() => {
          this.$router.push("/address");
        });
      }
    },

  },
};
</script>

<style>
</style>