<template>
  <div class="orderDetailContainer">
    <div class="status">
      <div class="text">交易成功</div>
      <img :src="statusImg" alt="" />
    </div>
    <div class="addressWrap">
      <van-icon name="location-o" />
      <div class="address" v-if="orderinfo.address_info">
        <div>
          {{ orderinfo.address_info.name }} {{ orderinfo.address_info.tel }}
        </div>
        <div>
          {{ orderinfo.address_info.province === orderinfo.address_info.city  ? "" : orderinfo.address_info.province }}{{ orderinfo.address_info.city }}{{ orderinfo.address_info.country }}{{ orderinfo.address_info.addressDetail }}
        </div>
      </div>
    </div>
    <van-card v-for="good in orderGoods" :title="good.title" :thumb="good.thumb_path" :price="good.sell_price" />
    <div class="orderInfo">
      <div class="item">
        <span>下单时间</span>
        <span>{{ orderinfo.add_time }}</span>
      </div>
      <div class="item">
        <span>商品总价</span>
        <span>&yen;{{ orderinfo.total_price }}</span>
      </div>
      <div class="item">
        <span>实付款</span>
        <span>&yen;{{ orderinfo.actual_price }}</span>
      </div>
      <div class="item">
        <span>付款方式</span>
        <span>{{ orderinfo.pay_way }}</span>
      </div>
      <div class="item">
        <span>运费险</span>
        <span>&yen;{{ 0 }}</span>
      </div>
      <div class="item">
        <span>订单号</span>
        <span>{{ orderinfo.order_id }}<span class="copy">复制</span></span>
      </div>
    </div>

    <div class="btns">
      <van-button type="primary" size="mini" v-if="orderinfo.status == 0" @click="pay">立即付款</van-button>
    </div>
  </div>
</template>

<script>
import { fetchgetorderinfo, fetchgetcardata, fetchPayOrder } from "../api/user";
import car2Png from "../assets/image/car2.png";
export default {
  props: ["order_id"], //对应的订单ID
  data() {
    return {
      statusImg: car2Png,
      orderinfo: {}, //订单信息
      orderGoods: [], //商品信息

    };
  },
  created() {
    this._fetchgetorderinfo();
  },
  methods: {
    async _fetchgetorderinfo() {
      this.orderinfo = await fetchgetorderinfo(this.order_id);
      let { message } = await fetchgetcardata(this.orderinfo.goods_ids);
      this.orderGoods = message;
    },
    pay() {
      this.$dialog.confirm({
        message: "确认付款吗",
      })
        .then(async () => {
          let result = await fetchPayOrder(this.order_id);
          this.$toast.success({
            message:"支付成功",
            icon: "wechat-pay",
          })
          this.orderInfo.is_take = 1;
          this.orderInfo.is_out = 1;
          this.orderInfo.status = 2;
        })
        .catch(() => {
            console.log(66);
          this.$toast("已取消支付")
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.orderDetailContainer {
  .status {
    height: 120px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fe5102;
    img {
      height: 80px;
      width: 80px;
    }
    .text {
      color: #f4d9ac;
    }
  }
  .addressWrap {
    display: flex;
    align-items: center;
    padding: 10px 10px;
    background-color: #fff;
    border-radius: 6px;
    margin: 6px 0;
    .van-icon {
      font-size: 20px;
      color: #f34a09;
    }
    .address {
      margin-left: 15px;
      div {
        margin: 5px 0;
      }
    }
  }
  .orderInfo {
    padding: 5px 10px;
    color: #787373;
    font-size: 14px;
    .item {
      display: flex;
      justify-content: space-between;
      margin: 5px 0px;
      .copy {
        color: #fe5102;
        margin-left: 10px;
      }
    }
  }
  .btns {
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    position: fixed;
    bottom: 0;
    box-shadow: 0 0 10px #ccc;
  }
}
</style>>