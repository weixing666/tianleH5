<template>
  <div class="orderlistcoent">
    <van-tabs v-model="active">
      <van-tab title="全部">
        <div class="content">
          <div class="card">
            <div class="goodinfo">
              <div class="good_img">
                <img src="http://test.w0824.com/xy2.png" alt="" />
              </div>
              <div class="good">
                <div class="title ellipsis_line_2">
                  KTV 舞台KTV 舞台KTV 舞台KTV 舞台KTV 舞台KTV 舞台KTV 舞台KTV
                  舞台KTV 舞台KTV 舞台KTV 舞台
                </div>
                <div class="pay">微信支付</div>
                <div class="ordertime">下单时间</div>
                <div class="money">
                  <span class="money_"
                    ><span class="yen">¥</span><span>4880</span></span
                  >
                  <span class="total">共5件</span>
                </div>
              </div>
            </div>
            <div class="orderinfo">
              <van-button type="danger" size="mini">复制订单号</van-button>
              <van-button type="danger" size="mini">立即付款</van-button>
              <van-button type="danger" size="mini">客服</van-button>
            </div>
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
      active: "",
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("../assets/css/common.scss");
.orderlistcoent {
  .content {
    .card {
      padding: 10px;
      background-color: #fafafa;
      .goodinfo {
        display: flex;
        .good_img {
          width: 88px;
          height: 88px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .good {
          flex: 1;
          font-size: 12px;
          padding-left: 5px;
          .title {
            max-height: 32px;
            font-weight: 500;
            line-height: 16px;
            color: #323233;
          }
          .pay {
            max-height: 20px;
            color: #646566;
            line-height: 20px;
          }
          .ordertime {
            max-height: 20px;
            color: #323233;
            line-height: 20px;
          }
          .money {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .money_ {
              color: #323233;
              font-size: 16px;
              .yen {
                color: #323233;
                font-size: 12px;
              }
            }
          }
        }
      }
      .orderinfo {
        height: 24px;
        display: flex;
        flex-direction: row-reverse;
        .van-button {
          margin: 0 3px;
        }
      }
    }
  }
}
</style>