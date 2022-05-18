<template>
  <div class="BackTop" v-show="flag" @click="gotop">
    <slot><img src="../assets/image/backtop.png" alt="" /></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   scrollTop: 600,
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
    hescrollTop() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop >= this.scrollTop) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    gotop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
  },
  mounted() {
    document.addEventListener("scroll", this.hescrollTop);
  },
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