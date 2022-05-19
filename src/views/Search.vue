<template>
  <div class="search">
    <van-popup
      v-model="show"
      position="top"
      :style="{ height: '30%' }"
      @click-overlay="$router.back()"
      ><form action="/">
        <van-search
          v-model="searchContent"
          show-action
          placeholder="请输入搜索关键词"
          @search="$router.push(`/searchresult/${searchContent}`)"
          @cancel="onCancel"
        />
      </form>
      <!-- 搜索历史 -->
      <div class="searchWrap">
        <div class="searc_content">
          <div class="cart">
            <h3 class="conten">搜索历史</h3>
            <van-icon name="delete-o" />
          </div>
          <div class="footer">
            <span>小新16</span><span>小新16</span><span>小新16</span
            ><span>小新16</span><span>小新16</span><span>小新16</span
            ><span>小新16</span><span>小新16</span>
          </div>
        </div>
        <!-- 分割线 -->
        <van-divider></van-divider>
        <div>
          <div class="history">
            <h3 class="conten">热门搜索</h3>
            <van-icon name="eye-o" />
          </div>
          <div class="hot">
            <span>小米</span>
            <span>小米</span>
            <span>小米</span>
            <span>小米</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 弹出
      show: true,
      // 搜索内容
      searchContent: "",
    };
  },
  created() {
    this._search;
  },
  methods: {
    // 取消搜索
    onCancel() {
      this.$router.back();
    },
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
    padding-bottom: 390px;
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
        }
      }
    }
  }
}
</style>