<template>
  <div class="item" @click="clickHandle">
    <div class="img">
      <img :src="data.img_url" alt="" />
      <img src="../assets/image/1.png" alt="" />
    </div>
    <div class="title ellipsis_line_1">
      {{ data.title }}
    </div>
    <div class="footer">
      <span class="price">¥{{ data.sell_price }}</span
      ><span class="buy">¥{{ data.market_price }}</span>
    </div>
    <slot name="ending"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["data"],
  methods: {
    clickHandle(event) {
      this.$emit("goclick", { data: this.data, event });
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 49%;
  padding: 6px;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 4px;
  font-size: 14px;
  .img {
    height: 124px;
    overflow: hidden;
    width: 100%;
    img {
      width: 100%;
    }
  }
  .title {
    margin: 2px 0;
    color: #000000;
    font-size: 14px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    .buy {
      font-size: 12px;
      color: #999999;
    }
    .price {
      color: #ff4142;
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>