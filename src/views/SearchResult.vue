<template>
  <div class="searchresult">
    <form action="/">
      <van-search :autofocus="true" v-model.trim="sevalue.value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" :title="title" />
    </form>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option" @change="Conditions" v-if="searchResult.length !== 0" />
    </van-dropdown-menu>
    <!-- 空状态 -->
    <van-empty description="没有该商品" v-show="searchResult.length === 0 " />
    <!-- 有结果状态 -->
    <div class="goodslist" v-show="searchResult.length">
      <Good v-for="item in searchResult" :data="item" @goclick="Goodsdetail(item)"></Good>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "Vuex";
import Good from "../components/Good.vue";
import { fetchsearch } from "../api/home";
export default {
  data() {
    return {
      // 搜索关键字
      valu: "",
      // 选中关键字
      value1:"buy",
      title: "商品排序",
      option: [
        { text: "销量", value: "buy" },
        { text: "好评", value: "likes" },
        { text: "价格", value: "sell_price" },
      ],
      searchResult: [],
      //历史搜索
      history:JSON.parse(localStorage.getItem("historyData")),
    };
  },

  components: {
    Good,
  },
  props: ["value"],
  watch: {
    valu: {
      handler: function () {
        this._search(this.sevalue.value);
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(["sevalue"]),
  },
  methods: {
    ...mapMutations(["upsearchvalue"]),
    // 搜索的数据
    async _search(value, sort = "buy", page = 1, limit = 30, order = "desc") {
      this.searchResult = await fetchsearch(value, sort, page, limit, order);
    },
    // 确认搜索
    onSearch(value) {
      this.upsearchvalue(this.sevalue.value);
      this._search(this.sevalue.value);
      
      //保存搜索历史记录
      this.history.push(this.sevalue.value)
      localStorage.setItem("historyData",  JSON.stringify(this.history))
    },
    // 取消搜索
    onCancel() {
      let value = "";
      this.upsearchvalue(value);
      this.$router.back();
    },
    // 点击进入详情
    Goodsdetail(data) {
      this.$router.push(`/goodsdetail/${data.id}`);
    },
    // 条件搜索
    Conditions(sort) {
      //共三种：buy（销量-默认）、likes(好评)、sell_price(价格)
      // 1.拿到搜索关键字 和 排序字段 重新发送请求
      // sort 排序的字段，共三种：buy（销量-默认）、likes(好评)、sell_price(价格)
      this._search(this.sevalue.value, sort);
    }
  },
};
</script>

<style lang="scss" scoped>
.searchresult {
  .goodslist {
    display: flex;
    flex-flow: wrap;
    justify-content: space-around;
    background-color: #f7f6f6;
  }
}
</style>  