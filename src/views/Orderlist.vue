<template>
  <div class="orderlistcoent">
    <van-tabs v-model="active">
      <van-tab title="全部">
        <div class="content">
          <div class="card">
            <div class="goodinfo">
              <div class="good_img">商品图片</div>
              <div class="good">
                <div class="title">Shinco/新科 S2300 无线麦克风 无线手持话筒 双手麦 KTV 舞台</div>
              </div>
            </div>
            <div class="orderinfo">订单详情</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="未付款">内容 2</van-tab>
      <van-tab title="已付款">内容 3</van-tab>
      <van-tab title="完成">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // active: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.orderlistcoent {
  .content {
    .card {
      padding: 20px;
      background-color: rgb(193, 75, 75);
      .goodinfo {
        height: 88px;
        display: flex;
        .good_img {
          width: 88px;
          height: 88px;
        }
        .good{
            
        }
      }
      .orderinfo {
        height: 24px;
      }
    }
  }
}
</style>