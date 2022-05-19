<template>
  <div>
    <form action="/">
      <van-search
        v-model="valu"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
    </van-dropdown-menu>
    <div class="goodslist">商品列表</div>
  </div>
</template>

<script>
import { fetchsearch } from "../api/home";
export default {
  data() {
    return {
      valu: this.$route.params.value,
      value1: 0,
      option1: [
        { text: "销量", value: 0 },
        { text: "好评", value: 1 },
        { text: "价格", value: 2 },
      ],
    };
  },
  props: ["value"],
  mounted() {
    this._search(this.valu);
  },
  methods: {
    async _search(value) {
      let result = await fetchsearch(value);
      console.log(result);
      // 搜索的数据
    },
    // 确认搜索
    onSearch(value) {
      this._search(value);
    },
    // 取消搜索
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style>
</style>  