<template>
  <div class="homecontent">
    <div>
      <!-- 点击进入搜索 -->
      <van-sticky>
        <van-search placeholder="男士秋裤" @click="$router.push('/home/index/search')">
          <template #left>
            <van-image width="2.5rem" height="2.5rem" :src="logo" />
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
      <van-grid-item v-for="item in image" :key="item.img" :to="item.to">
        <van-image :src="item.img" />
        <div class="title">{{ item.title }}</div>
      </van-grid-item>
    </van-grid>
    <van-divider>推荐更多</van-divider>
    <!-- 推荐更多 -->
    <div class="goodslist">
      <Good v-for="item in goodslist" :key="item.id" :data="item" @goclick="Goodsdetail" />
    </div>
    <BackTop :scrollTop="500"></BackTop>
  </div>
</template>

<script>
import logo from "../assets/image/logo.png"
import img1 from "../assets/image/1.png"
import img2 from "../assets/image/2.png"
import img3 from "../assets/image/3.png"
import img4 from "../assets/image/4.png"
import img5 from "../assets/image/5.png"
import img6 from "../assets/image/6.png"
import img7 from "../assets/image/7.png"
import img8 from "../assets/image/8.png"
import { fetchgoodslist, fetchslideshow } from "../api/home";
import BackTop from "../components/BackTop.vue";
import Good from "../components/Good.vue";
export default {
  data() {
    return {
      // 轮播
      images: [],
      // 方格
      image: [
        {
          img: img1,
          title: "天乐超市",
          to: "/goodslist",
        },
        {
          img: img2,
          title: "新闻列表",
          to: "/goodslist",
        },
        {
          img: img3,
          title: "天乐生鲜",
          to: "/goodslist",
        },
        {
          img: img4,
          title: "生活缴费",
          to: "/goodslist",
        },
        {
          img: img5,
          title: "领精贴",
          to: "/goodslist"
        },
        {
          img: img6,
          title: "plus会员",
          to: "/goodslist",
        },
        {
          img: img7,
          title: "领乐豆",
          to: "/goodslist"
        },
        {
          img: img8,
          title: "更多",
          to: "/goodslist"
        },
      ],
      logo,
      // 商品列表
      goodslist: [],
    };
  },
  components: {
    BackTop,
    Good,
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
    Goodsdetail({ data }) {
      this.$router.push(`/goodsdetail/${data.id}`);
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
  }
}
</style>

