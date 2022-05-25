<template>
  <div class="usercontent">
    <div class="nav">
      <span></span>
      <span class="title">我的乐购</span>
      <span class="icon"><van-icon name="setting-o" /></span>
    </div>
    <div class="avatar">
      <div class="userInfo">
        <div class="useravatar">
          <van-image round width="68px" height="68px" :src="avatar" />
          <van-button @click="upload" size="mini">更换头像</van-button>
          <input
            v-show="false"
            type="file"
            ref="avatar"
            @change="uploadAvatar"
          />
        </div>
        <div class="hillo">{{ userInfo.username }} , 你好 !</div>
      </div>
    </div>

    <!-- 绝对定位 -->
    <van-cell-group inset>
      <van-cell title="我的订单" value="" is-link to="/orderlist" />
      <van-cell title="收货地址" value="" is-link to="/address" />
      <van-cell title="设置" value="" is-link />
      <van-cell title="关于乐购" value="v1.3.5" is-link />
      <van-button type="danger" block @click="logout">退出登陆</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import { fetchuploadAvatar } from "../api/user";
import { mapState, mapGetters, mapActions, mapMutations } from "Vuex";
export default {
  data() {
    return {
      img: "",
    };
  },
  methods: {
    ...mapMutations(["updatedav", "clearUserInfo"]),
    upload() {
      // 触发自点击事件
      this.$refs.avatar.click();
    },
    // 上传头像
    async uploadAvatar() {
      let file = this.$refs.avatar.files[0];
      let user_id = this.userInfo.id;
      if (file) {
        let formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("file", file);
        let { message, status, src } = await fetchuploadAvatar(formData);
        // 成功失败都提示
        this.$toast(message);
        if (status === 0) {
          // 把用户更新的信息存贮到vuex
          this.updatedav(src);
        }
      }
    },
    // 退出登陆
    logout() {
      // 清楚用户信息,跳转页面
      this.$dialog
        .confirm({
          message: "确认退出吗",
        })
        .then(() => {
          this.clearUserInfo(this.userInfo.id);
          this.$router.replace("/login");
        })
        .catch(() => {
          return;
        });
    },
  },
  computed: {
    ...mapState(["userInfo"]),
    avatar() {
      return "http://api.w0824.com/" + this.userInfo.avatar;
    },
  },
};
</script>

<style lang="scss" scoped>
.usercontent {
  position: relative;
  background-color: #e1e1e1;
  height: 100vh;
  .nav {
    padding: 25px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    font-weight: 700;
    font-size: 18px;
    color: #ffffff;
    background: #de2828;
    .icon {
      font-size: 20px;
    }
  }
  .avatar {
    padding: 10px;
    height: 180px;
    background: #e01919;
    .userInfo {
      position: relative;
      display: flex;
      color: #ffffff;
      font-size: 14px;
      padding: 0 20px;
      .van-button {
        margin-top: 20px;
      }
      .useravatar {
        display: flex;
        flex-direction: column;
      }
      .hillo {
        margin: 0 25px;
        font-family: 700;
        font-size: 25px;
        color: #ffffff;
        padding-top: 20px;
      }
    }
  }
  .van-cell-group {
    position: absolute;
    top: 195px;
    width: 90%;
    background-color: #fff;
  }
}
</style>