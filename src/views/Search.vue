<template>
  <div>
    <van-popup v-model="show" position="top" :style="{ height: '30%' }" @click-overlay="$router.back()"
      ><form action="/">
        <van-search
          v-model="searchContent"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        /></form
    ></van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 弹出
      show: true,
      // 搜索内容
      searchContent: "",
    };
  },
  methods: {
    // 取消搜索
    onCancel() {
      this.$router.back();
    },
    // 确认搜索
    onSearch(val) {
      Toast(val);
    },
  },
};
</script>

<style>
</style>