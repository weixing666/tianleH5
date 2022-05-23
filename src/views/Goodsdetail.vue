<template>
  <div class="goodsdetail">
    <div @click="Previewimg">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="image in images" :key="image.id">
          <img :src="image.src" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="card">
      <div class="price">
        <span class="discount">¥ {{ info.sell_price }}</span>
        <span class="practical">¥ {{ info.market_price }}</span>
      </div>
      <div class="title ellipsis_line_1">{{ info.title }}</div>
    </div>
    <div class="contentinfo">
      <van-divider content-position="left">介绍</van-divider>
      <div class="content" v-html="info.content"></div>
    </div>
    <!-- 购物车 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="carnum"
        to="/home/shopping"
      />
      <van-goods-action-icon icon="shop-o" text="进入店铺" to="/home/index" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="onClickButton"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="onClickButton(false)"
      />
    </van-goods-action>
    <!-- 加入购物车弹窗 -->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="info.id"
      :show-add-cart-btn="showAddCartBtn"
      @add-cart="addCart"
    >
      <template #sku-messages>
        <van-divider>详情</van-divider>
        <p class="detal">商品货号:{{ info.goods_no }}</p>
        <p class="detal">库存:{{ info.stock_quantity }}件</p>
        <p class="detal">上架时间:{{ info.add_time | dataFormat }}</p>
      </template>
    </van-sku>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "Vuex";
import { fetchgoodsdetail, fetchgoodsinfo } from "../api/goodsdetail";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      images: [],
      previewimg: [],
      info: "",
      // sku数据
      show: false,
      showAddCartBtn: true, // 是否显示sku中加入购物车的按钮
      sku: {
        tree: [],
        price: 2900, // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: true, // 是否无规格商品
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "",
      },
    };
  },
  props: ["value"],
  created() {
    this._fetchgoodsdetail();
    this._fetchgoodsinfo();
  },
  computed: {
    ...mapGetters(["carnum"]),
  },
  methods: {
    ...mapMutations(["addcardata"]),
    async _fetchgoodsdetail() {
      let { message } = await fetchgoodsdetail(this.value);
      this.images = message;
      this.goods.picture = message.length && message[0].src;
      this.previewimg = message.map((item) => item.src);
    },
    async _fetchgoodsinfo() {
      let { message } = await fetchgoodsinfo(this.value);
      let reg = /\width=['"]\w+['"]\s/gi;
      message.content = message.content.replace(reg, "");
      this.info = message;
      this.sku.price = message.sell_price;
      this.sku.stock_num = message.stock_quantity;
    },
    Previewimg() {
      ImagePreview(this.previewimg);
    },
    // 触发弹窗
    onClickButton(a) {
      this.show = true;
      if (a) {
        this.showAddCartBtn = true;
      } else {
        this.showAddCartBtn = false;
      }
    },
    addCart(skuData) {
      let { goodsId, selectedNum } = skuData;
      // 数据结构,id,数量,价格
      let cardata = {
        id: goodsId,
        num: selectedNum,
        pirce: this.info.sell_price,
        check:false
      };
      // 操作vuex加入数据库
      this.addcardata(cardata);
      // 关闭sku弹窗
      this.show = false;
      // 提示加入成功
      this.$dialog.alert({
        message: "加入购物车成功",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/common.scss";
.goodsdetail {
  background-color: #f7f6f6;
  padding: 4px;
  .van-swipe {
    border-radius: 6px;
    .van-swipe-item {
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 165px;
        height: 200px;
        margin: 0 auto;
      }
    }
  }
  .card {
    border-radius: 6px;
    margin-bottom: 8px;
    background: #fff;
    padding: 8px;
    margin: 4px auto;
    .price {
      display: flex;
      .discount {
        color: #fa865d;
        font-size: 20px;
        margin-right: 20px;
      }
      .practical {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #666;
        font-size: 14px;
      }
      .title {
        color: #333;
        font-weight: 500;
      }
    }
  }
  .contentinfo {
    background-color: white;
    .content {
      // overflow: hidden;
      ::v-deep tbody {
        width: 750px;
      }
      color: #666;
      ::v-deep img {
        width: 100%;
        height: 100%;
      }
    }
    .van-divider {
      padding-top: 30px;
    }
  }

  .detal {
    padding: 2px 20px;
  }
}
</style>