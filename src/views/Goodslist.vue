<template>
  <div class="listceoten">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="goodslist">
          <Good
            v-for="item in list"
            :key="item.id"
            :data="item"
            @goclick="Goodsdetail"
          >
            <template #ending>
              <div class="_footer">
                <span class="_price">热卖中</span>
                <span class="_buy">剩余{{ item.stock_quantity }}</span>
              </div>
            </template>
          </Good>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { fetchgoodslist } from "../api/good";
import Good from "../components/Good.vue";
export default {
  data() {
    return {
      page: 0,
      pagesize: 8,
      list: [],
      loading: false, //是否正在加载中
      finished: false, //是否已经加载完毕
      refreshing: false, //是否正在刷新中
    };
  },
  components: {
    Good,
  },
  methods: {
    // 首次进来执行,填满页面为止,上拉加载
    onLoad() {
      this.page++;
      this._fetchgoodslist();
    },

    // 下拉加载
    onRefresh() {
      // 清空列表数据
      this.page = 0;
      // 未加载完状态
      this.finished = false;
      // 重新加载数据
      this.loading = true;
      // 重新加载数据
      this.onLoad();
    },

    // 加载商品列表
    async _fetchgoodslist() {
      // 判断是否在刷新中
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      let { message } = await fetchgoodslist(this.page, this.pagesize);
      this.list = [...this.list, ...message];
      this.loading = false; // 加载完毕
      // 全部加载完毕
      if (message.length === 0) {
        this.list.lenght % 2 === 1 && this.list.pop();
        this.finished = true;
      }
    },
    Goodsdetail({ data }) {
      this.$router.push(`/goodsdetail/${data.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.listceoten {
  .goodslist {
    display: flex;
    flex-flow: wrap;
    justify-content: space-around;
    background-color: #f7f6f6;
    ._footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0;
      ._buy {
        font-size: 14px;
        color: #999999;
      }
      ._price {
        color: #999999;
        font-size: 14px;
      }
    }
  }
}
</style>

<