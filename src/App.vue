<template>
  <div class="app">
    <van-nav-bar
      v-show="ismainpage"
      :title="title"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="$router.back()"
    />
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
    "$route": {
      handler: function (newroute) {
        let { ismainpage, title } = newroute.meta;
        this.title = title;
        console.log(title);
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
.app {
  min-width: 320px;
  max-width: 750px;
  margin: 0 auto;
}
</style>

