<template>
  <div class="goodsdetail">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="image in images" :key="image.id">
        <img :src="image.src" />
      </van-swipe-item>
    </van-swipe>
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
        badge="5"
        to="/home/shopping"
      />
      <van-goods-action-icon icon="shop-o" text="进入店铺" to="/home/index" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="onClickButton"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <!-- 加入购物车弹窗 -->
    <van-sku v-model="show" :sku="sku" :goods="goods" />
  </div>
</template>

<script>
import { fetchgoodsdetail, fetchgoodsinfo } from "../api/goodsdetail";
export default {
  data() {
    return {
      images: [],
      info: "",
      // sku数据
      show: false,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name: "红色", // skuValueName：规格值名称
                imgUrl: "https://img01.yzcdn.cn/1.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: "https://img01.yzcdn.cn/1p.jpg", // 用于预览显示的规格类目图片
              },
              {
                id: "1",
                name: "蓝色",
                imgUrl: "https://img01.yzcdn.cn/2.jpg",
                previewImgUrl: "https://img01.yzcdn.cn/2p.jpg",
              },
            ],
            largeImageMode: true, //  是否展示大图模式
          },
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId
            s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1", // 规格类目 k_s 为 s2 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
        ],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: "留言", // 留言名称
            type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: "1", // 是否必填 '1' 表示必填
            placeholder: "", // 可选值，占位文本
            extraDesc: "", // 可选值，附加描述文案
          },
        ],
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://img01.yzcdn.cn/1.jpg",
      },
    };
  },
  props: ["value"],
  created() {
    this._fetchgoodsdetail();
    this._fetchgoodsinfo();
  },
  methods: {
    async _fetchgoodsdetail() {
      let { message } = await fetchgoodsdetail(this.value);
      this.images = message;
    },
    async _fetchgoodsinfo() {
      let { message } = await fetchgoodsinfo(this.value);
      this.info = message;
    },
    onClickIcon() {
      // Toast("点击图标");
    },
    onClickButton() {
      // 触发弹窗
      this.show = true;
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
}
</style>