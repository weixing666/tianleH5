<template>
  <div class="app">
    <!-- 返回 -->
    <van-sticky>
      <van-nav-bar v-show="ismainpage" :title="title" left-arrow @click-left="$router.back()" />
    </van-sticky>

    <!-- 搜索结果 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ismainpage: true,
      title: "天乐",
    };
  },
  watch: {
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

