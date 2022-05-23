<template>
  <!-- 三个tab的父组件 -->
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="red">
      <van-tabbar-item icon="home-o" to="/home/index">首页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" :badge="carnum" to="/home/shopping"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="user-o" to="/home/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "Vuex";
export default {
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    ...mapGetters(["carnum"]),
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
      immediate: true,
    },
  },
};
</script>

<style>
</style>