<template>
  <div class="search">
    <van-popup v-model="show" position="top" :style="{ height: '60%' }" @click-overlay="$router.back()">
      <form action="/">
        <van-search v-model="searchContent" show-action placeholder="请输入搜索关键词" @search="search(searchContent)" @cancel="onCancel" />
      </form>
      <div class="searchWrap">
        <div class="searc_content">
          <div class="cart">
            <h3 class="conten">搜索历史</h3>
            <van-icon name="delete-o" @click="delect" />
          </div>
          <!-- 搜索历史 -->
          <div class="footer">
            <span v-for="item in historyData" @click="searchData(item)">{{item}}</span>
          </div>
        </div>
        <!-- 分割线 -->
        <van-divider></van-divider>
        <div>
          <div class="history">
            <h3 class="conten">热门搜索</h3>
            <van-icon :name="flag ? 'eye-o' : 'closed-eye'" @click="flag = !flag" />
          </div>
          <div class="hot" v-show="flag">
            <span v-for="hot in hotSearch" :key="hot" @click="clihotSearch(hot)">{{hot}}</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapMutations } from "Vuex";
export default {
  data() {
    return {
      // 弹出
      show: true,
      // 搜索内容
      searchContent: "",
      // 搜索历史
      historyData: JSON.parse(localStorage.getItem('historyData') || '[]'), //当本地存储没有则为空
      // 热门搜索
      hotSearch: ["苹果14", "华为P60", "小米mate", "小新17"],
      // 关闭隐藏
      flag: true,
    };
  },
  created() {
    this._search;
  },

  methods: {
    ...mapMutations(["upsearchvalue"]),
    // 取消搜索
    onCancel() {
      this.$router.back();
    },
    // 确认搜索
    search(searchContent) {
      if (!searchContent) {
        this.$toast.fail("请输入搜索商品");
      } else {
        this.upsearchvalue(searchContent);//记录本次搜索内容,方便回退
        this.$router.push(`/searchresult/${searchContent}`);//跳转搜索,携带参数
        !this.historyData.includes(searchContent) && this.historyData.unshift(searchContent)//检查是否有搜索历史,有不加,没有加入
        localStorage.setItem('historyData', JSON.stringify(this.historyData))//将搜索记录存入到本地存贮
      }
    },
    // 删除历史记录
    delect() {
      this.$dialog.confirm({
        message: '确认清空？',
      })
        .then(() => {
          this.historyData = [];
          localStorage.removeItem('historyData')
        })
        .catch(() => {
        });
    },
    // 历史搜索
    searchData(searchContent) {
      this.search(searchContent)
    },
    // 热门搜索
    clihotSearch(searchContent) {
      this.search(searchContent)
    }
  },
};
</script>

<style lang="scss" scoped>
.search {
  .van-search {
    padding: 0px;
  }
  .van-popup {
    padding: 10px;
    .searchWrap {
      margin-top: 20px;
      .searc_content {
        .cart {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px;
          height: 50px;
          .conten {
            font: 18px;
            color: #000000;
          }
        }
        .footer {
          display: flex;
          flex-wrap: wrap;
          span {
            height: 30px;
            line-height: 30px;
            background: #f3f5f6;
            font-size: 14px;
            margin-right: 6px;
            padding: 2px 4px;
            text-align: center;
            border-radius: 6px;
            margin: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .history {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 4px;
        height: 50px;
      }
      .hot {
        display: flex;
        flex-wrap: wrap;

        span {
          height: 30px;
          line-height: 30px;
          background: #f3f5f6;
          font-size: 14px;
          margin-right: 6px;
          padding: 2px 4px;
          text-align: center;
          border-radius: 6px;
          margin: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>