<template>
  <div class="shoppingcontent" :class="{ pass: goods.length >= 5 ? true : false }">
    <!-- 顶部 -->
    <van-sticky>
      <van-nav-bar title="我的购物车" left-text="返回" left-arrow @click-left="$router.back()">
        <template #right>
          <div class="adress" @click="$router.push('/address')">
            <van-icon name="shop-o" />添加地址
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <!-- 默认地址展示,有加入购物车商品时候展示 -->
    <div class="address" v-show="carnum > 0 && DefaultAddress ? true : false">
      <van-icon name="location-o" />
      <div class="address-con">
        <div>
          {{ DefaultAddress.name }} / {{ DefaultAddress.tel }} 邮编:
          {{ DefaultAddress.postalCode }}
        </div>
        <div class="specific">
          {{ DefaultAddress.addressDetail }}
        </div>
        <div class="left" @click="$router.push('/address')">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <!-- 空购物车 -->
    <div class="buycar" v-show="carnum > 0 ? false : true">
      <div class="imgcar">
        <van-image width="100" height="100" src="../src/assets/image/car.png" />
      </div>
      <div class="tip">您的购物车空空如也</div>
      <div class="ending">
        <van-button type="danger" to="/home/index">去首页</van-button>
      </div>
    </div>
    <!-- 商品展示 -->
    <van-swipe-cell v-show="carnum > 0 ? true : false" v-for="item in goods">
      <van-card :price="item.sell_price" :title="item.title" class="goods-card" :thumb="item.thumb_path">
        <template #price-top>
          <div>
            <van-checkbox v-model="ischecked[item.id]" checked-color="#ee0a24" @click="
                ischeek({
                  id: item.id,
                  ischeek: ischecked[item.id],
                })
              "></van-checkbox>
          </div>
        </template>
        <template #num>
          <van-stepper v-model="inventory[item.id]" theme="round" button-size="22" disable-input @change="
              changeNumber({
                id: item.id,
                num: inventory[item.id],
              })
            " />
        </template>
      </van-card>
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" @click="deletegood(item.id)" />
      </template>
    </van-swipe-cell>

    <!-- 底部 -->
    <van-submit-bar :price="totalpic * 100" button-text="提交订单" :disabled="buynum > 0 ? false : true" @submit="submitOrder">
      <template #tip> 仅支持微信支付 </template>
      <template #default>
        共选中 {{ buynum }} 件 &nbsp &nbsp
        <van-checkbox v-model="isAllchecked.check" checked-color="#ee0a24" @click="clkAllcheck(isAllchecked.check)">全选</van-checkbox>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { genOrderId } from "../util/tools";
import { mapState, mapGetters, mapMutations } from "Vuex";
import { fetchgetcardata, fetchgetAddress, fetchorder } from "../api/user";
export default {
  data() {
    return {
      id: this.$route.query.id,
      isdisabled: true,
      goods: [],
      flag: true,
      // 默认地址
      DefaultAddress: {},
    };
  },
  created() {
    this._fetchgetcardata();
    this._fetchgetAddress();
  },
  mounted() {
    // 先判断是否有加入购物车商品,有的话打回
    let token = !!this.token;
    let islogin = this.carnum > 0 && !token;
    if (islogin) {
      this.$dialog
        .alert({
          message: "请先登陆哦",
        })
        .then(() => {
          this.$router.replace("/login");
        });
    }
  },
  methods: {
    ...mapMutations(["updatenum", "updatecheek", "delete", "Allischeek", "clearCartData"]),
    // 获取购物车中的商品
    async _fetchgetcardata() {
      if (this.carnum !== 0) {
        // 获取购物车的商品
        let { message } = await fetchgetcardata(this.getcarid);
        this.goods = message;
        // 获取用户的默认收货地址,如果没有默认收货地址,看路由参数,如果无参数,则以第一条为默认地址,
        let result = await fetchgetAddress(this.userInfo.id);
        // 找默认地址
        let index = result.findIndex((item) => item.isDefault == true);
        if (this.id) {
          // 使用用户选择的地址
          let index = result.findIndex((item) => item.id == this.id);
          this.DefaultAddress = result[index];
        } else if (index !== -1) {
          // 找到默认地址
          this.DefaultAddress = result[index];
        } else {
          // 没找到默认地址,默认使用第条个地址
          this.DefaultAddress = result[0];
        }
      }
    },
    // 修改库存
    changeNumber(numdata) {
      this.updatenum(numdata);
    },
    // 选中
    ischeek(ischeek) {
      this.updatecheek(ischeek);
    },
    // 删除商品
    deletegood(id) {
      Dialog.confirm({
        message: "确认删除吗",
      })
        .then(() => {
          this.delete(id);
          location.reload();
        })
        .catch(() => { });
    },
    // 判断是否完善收货地址
    async _fetchgetAddress() {
      let result = await fetchgetAddress(this.userInfo.id);
      if (this.goods.length > 0 && result.length === 0) {
        if (this.flag) {
          Dialog.alert({
            message: "请完善收货地址",
          }).then(() => {
            this.$bus.$off("_fetchgetAddress");
            this.flag = false;
          });
        }
      }
    },
    // 判断是否全选
    clkAllcheck(data) {
      this.Allischeek(data);
    },
    // 提交订单
    async submitOrder() {
      // 1.准备订单数据
      let data = {
        user_id: this.userInfo.id,
        order_id: genOrderId(),
        address_id: this.DefaultAddress.id,
        total_price: this.totalpic,
        number: this.buynum,
        goods_ids: this.getCarSelectedGoodsIds,
      };
      console.log(data);
      // 2.提交订单loading提示
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: "提交订单中",
        forbidClick: true,
        overlay: true,
      });
      // 3.发送订单数据,跳转
      let { status, message } = await fetchorder(data);
      this.$toast(message);
      if (status === 0) {
        // 下单成功要清购物车下单的购物车，并跳转到订单列表
        this.clearCartData();
        this.$router.replace("/orderlist");
      }
      //4.关闭上面的提示
      this.$toast.clear();
    },
  },
  computed: {
    ...mapGetters(["carnum", "getcarid", "inventory", "ischecked", "buynum", "totalpic", "isAllchecked", "getCarSelectedGoodsIds",]),
    ...mapState(["token", "userInfo"]),
  },
};
</script>

<style lang="scss" scoped>
.pass {
  padding-bottom: 800px;
}
.shoppingcontent {
  height: 100vh;
  .address {
    display: flex;
    border-radius: 12px;
    background-color: #f4f4f4;
    margin: 10px 10px;
    padding: 10px 0px;
    .van-icon {
      font-size: 25px;
      color: red;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 15px;
    }
    .address-con {
      position: relative;
      .specific {
        font-size: 14px;
      }
      .left {
        position: absolute;
        top: -2px;
        right: -50px;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .adress {
    color: #1989fa;
  }
  .goods-card {
    margin: 0;
  }

  .delete-button {
    height: 100%;
  }
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
      margin-top: 20px;
    }
  }
  .imgcar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
    width: 160px;
    height: 160px;
  }
}
</style>