<template>
  <div class="app">
    <!-- 返回 -->
    <van-sticky>
      <van-nav-bar v-show="ismainpage" :title="title" left-arrow @click-left="$router.back()" />
    </van-sticky>

    <!-- 搜索结果 -->
    <!-- 有增加数据的不需要走缓存, -->
    <keep-alive include="Goodslist search">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ismainpage: true,
      title: "天乐",
      isOnLine: navigator.onLine, //是否有网络 值为布尔值
    };
  },
  methods: {
    updateNetworkStatu(e) {
      console.log(e);
      this.isOnLine = e.type === "online" ? true : false
    }
  },
  mounted() {
    window.addEventListener("online", this.updateNetworkStatu); //有网络的时候被触发
    window.addEventListener("offline", this.updateNetworkStatu);//无网络的时候被触发
  },
  watch: {
    isOnLine() {
      this.isOnLine === false && this.$toast.fail('网络异常,请检查网络')
      this.isOnLine === true && this.$toast.success('网络已链接')
    },
    $route: {
      handler: function (newroute) {
        let { ismainpage, title } = newroute.meta;
        this.title = title;
        if (ismainpage) {
          this.ismainpage = false;
        } else {
          this.ismainpage = true;
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss">
@import url("../src/assets/css/common.scss");
@import url("../src/assets/css/normalize.css");
.app {
  min-width: 320px;
  max-width: 750px;
  margin: 0 auto;
}
* {
  box-sizing: border-box;
}
// 滚动丝滑
html {
  scroll-behavior: smooth;
}
</style>

