<template>
  <div class="searchresult">
    <form action="/">
      <van-search
        v-model="sevalue.value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" @change="Conditions" />
    </van-dropdown-menu>
    <!-- 空状态 -->
    <van-empty description="没有该商品" v-show="searchResult.length === 0 " />
    <!-- 有结果状态 -->
    <div class="goodslist" v-show="searchResult.length">
      <Good
        v-for="item in searchResult"
        :data="item"
        @goclick="Goodsdetail(item)"
      ></Good>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "Vuex";
import Good from "../components/Good.vue";
import { fetchsearch } from "../api/home";
export default {
  data() {
    return {
      // 搜索关键字
      valu: "",
      value1: 0,
      option1: [
        { text: "销量", value: 0 },
        { text: "好评", value: 1 },
        { text: "价格", value: 2 },
      ],
      searchResult: [],
    };
  },
  components: {
    Good,
  },
  props: ["value"],
  mounted() {
    // this.upsearchvalue(this.value)
    // this._search(this.sevalue.value);
  },
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
    async _search(value) {
      this.searchResult = await fetchsearch(value);
    },
    // 确认搜索
    onSearch(value) {
      // this.valu = value
      this.upsearchvalue(this.sevalue.value);
      this._search(this.sevalue.value);
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
    Conditions(value){
      console.log(value); //0,1,2
      // sort 排序的字段，共三种：buy（销量-默认）、likes(好评)、sell_price(价格)
      // this.upsearchvalue(this.sevalue.value);
      // this._search(this.sevalue.value);
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