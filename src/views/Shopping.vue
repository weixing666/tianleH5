<template>
  <div class="shoppingcontent">
    <!-- 顶部 -->
    <van-nav-bar
      title="我的购物车"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 空购物车 -->
    <div class="buycar">
      <van-image width="100" height="100" src="../src/assets/image/car.png" />
      <div class="tip">您的购物车空空如也</div>
      <div class="ending">
        <van-button type="danger" to="/home/index">去首页</van-button>
      </div>
    </div>
    <!-- 底部 -->
    <van-submit-bar :price="3050" button-text="提交订单" :disabled="isdisabled">
      <template #tip> 仅支持微信支付 </template>
      <template #default> 共选中 5 件 </template>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isdisabled: true,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.shoppingcontent {
  background-color: #f7f6f6;
  height: 100vh;
  .van-submit-bar {
    bottom: 50px;
  }
  .buycar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 32px 0;
    text-align: center;
    .tip {
      color: #969799;
      font-size: 14px;
    }
    .van-button {
      margin-top: 40px;
    }
  }
  .van-image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    width: 160px !important;
    height: 160px !important;
    .img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>