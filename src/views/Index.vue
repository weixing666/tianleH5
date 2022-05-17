<template>
  <!-- 三个tab的父组件 -->
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="red">
      <van-tabbar-item icon="home-o" to="/home/index">首页</van-tabbar-item>
      <van-tabbar-item icon="search" badge="5" to="/home/shopping"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="friends-o" to="/home/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  watch: {
    $route: {
      handler: function (newroute) {
        let { name } = newroute.meta;
        const namemap = {
          Home: 0,
          Shopping: 1,
          User: 2,
        };
        this.active = namemap[name];
      },
      immediate: true
    },
  },
};
</script>

<style>
</style>