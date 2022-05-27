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
    <!-- 物流弹窗 active 当前步骤 direction-显示方向 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '80%' }">
      <van-steps direction="vertical" :active="0">
        <van-step>
          <h3>【佛山市】已离开 广东佛山分拨交付中心；发往 广东广州南沙公司</h3>
          <p>2021.12.07 16:11 星期二</p>
        </van-step>
        <van-step>
          <h3>【佛山市】已到达 广东佛山分拨交付中心</h3>
          <p>2021.12.07 16:07</p>
        </van-step>
        <van-step>
          <h3>【南宁市】已离开 广西南宁分拨交付中心；发往 广东佛山分拨交付中心</h3>
          <p>2021.12.07 02:05</p>
        </van-step>
        <van-step>
          <h3>快件已发货</h3>
          <p>2021-12-06 09:30</p>
        </van-step>
      </van-steps>
    </van-popup>
    <div class="btns">
      <van-button type="danger" size="mini" v-if="orderinfo.status == 0" @click="pay">立即付款</van-button>
      <van-button type="info" size="mini" v-if="orderinfo.status == 2">已完成</van-button>
      <van-button type="primary" size="mini" v-if="orderinfo.is_out == 1" @click="logistics">查看物流</van-button>
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
      show: false,
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
        title: '付款',
        message: '确认支付吗',
      })
        .then(async () => {
          let { order_id } = this.orderinfo;
          try {
            await fetchPayOrder(order_id);
          } catch (err) {
            //支付异常
            this.$toast("支付异常,请稍后再试")
          }
          this.$toast.success({
            message: "支付成功",
            icon: "wechat-pay"
          })
          this.orderinfo.is_take = 1;
          this.orderinfo.is_out = 1;
          this.orderinfo.status = 2;
        })
        .catch(() => {
          this.$toast("已取消支付")
        });
    },
    // 物流
    logistics() {
      this.show = true
    }
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
    .van-button {
      margin: 0 3px;
    }
  }
}
</style>>