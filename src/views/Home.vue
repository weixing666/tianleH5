<template>
  <div class="homecontent">
    <div>
      <!-- 点击进入搜索 -->
      <van-sticky>
        <van-search
          placeholder="男士秋裤"
          @focus="$router.push('/home/index/search')"
        >
          <template #left>
            <van-image
              width="2rem"
              height="2rem"
              round
              src="../src/assets/image/logo.jpg"
            />
          </template>
        </van-search>
      </van-sticky>
    </div>
    <!-- 显示搜索块 -->
    <router-view></router-view>
    <!-- 轮播 -->
    <van-swipe :autoplay="3000" style="height: 200px" indicator-color="white">
      <van-swipe-item v-for="item in images" :key="item.url">
        <img v-lazy="item.img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 宫格 -->
    <van-grid square>
      <van-grid-item v-for="item in image" :key="item.img">
        <van-image :src="item.img" />
        <div class="title">{{ item.title }}</div>
      </van-grid-item>
    </van-grid>
    <van-divider>推荐更多</van-divider>
    <!-- 推荐更多 -->
    <div class="goodslist">
      <div class="item" v-for="item in goodslist" :key="item.id">
        <div class="img">
          <img :src="item.img_url" alt="" />
          <img src="../assets/image/1.png" alt="" />
        </div>
        <div class="title ellipsis_line_1">
          {{ item.title }}
        </div>
        <div class="footer">
          <span class="price">¥{{ item.sell_price }}元</span
          ><span class="buy">{{ item.stock_quantity }}购买</span>
        </div>
      </div>
    </div>
    <BackTop :scrollTop="500"></BackTop>
  </div>
</template>

<script>
import { fetchgoodslist, fetchslideshow } from "../api/home";
import BackTop from "../components/BackTop.vue";
export default {
  data() {
    return {
      // 轮播
      images: [],
      // 方格
      image: [
        { img: "../src/assets/image/1.png", title: "天乐超市" },
        { img: "../src/assets/image/2.png", title: "新闻列表" },
        { img: "../src/assets/image/3.png", title: "天乐生鲜" },
        { img: "../src/assets/image/4.png", title: "生活缴费" },
        { img: "../src/assets/image/5.png", title: "领精贴" },
        { img: "../src/assets/image/6.png", title: "plus会员" },
        { img: "../src/assets/image/7.png", title: "领乐豆" },
        { img: "../src/assets/image/8.png", title: "更多" },
      ],
      // 商品列表
      goodslist: [],
    };
  },
  components: {
    BackTop,
  },
  created() {
    this._fetchslideshow();
    this._fetchgoodslist();
  },
  methods: {
    async _fetchslideshow() {
      let { message } = await fetchslideshow();
      this.images = message;
    },
    async _fetchgoodslist() {
      let { message } = await fetchgoodslist();
      this.goodslist = message;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("../assets/css/common.scss");
.homecontent {
  padding-bottom: 50px;
  .van-image {
    margin-right: 0.5rem;
  }
  .van-swipe-item {
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .van-image {
    width: 30px;
    height: 30px;
  }
  .van-grid-item .title {
    font-size: 15px;
    color: #666666;
    margin-top: 10px;
  }
  .goodslist {
    display: flex;
    flex-flow: wrap;
    justify-content: space-around;
    background-color: #f7f6f6;
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
  }
}
</style>

