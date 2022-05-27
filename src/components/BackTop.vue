<template>
  <div class="BackTop" v-show="flag" @click="gotop">
    <slot><img src="../assets/image/backtop.png" alt="" /></slot>
  </div>
</template>

<script>
import { throttle } from "../util/tools";
export default {
  data() {
    return {
      flag: false,
    };
  },
  props: {
    scrollTop: {
      type: Number,
      default: 600,
    },
  },
  methods: {
    //滚动
    hescrollTop() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop >= this.scrollTop) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    // 返回顶部
    gotop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
  },
  // 组件创建的时候就绑定
  mounted() {
    document.addEventListener("scroll", throttle(this.hescrollTop, 500));
  },
  //组件销毁的时候解绑事件
  destroyed() {
    document.removeEventListener("scroll", this.hescrollTop);
  },
};
</script>

<style lang="scss" scoped>
.BackTop {
  position: fixed;
  bottom: 120px;
  right: 10px;
  img {
    width: 40px;
    height: 40px;
  }
}
</style>