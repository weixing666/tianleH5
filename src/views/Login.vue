<template>
  <div class="logincontent">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <div class="nouser" @click="$router.push('/register')">没有账号?去注册</div>
  </div>
</template>

<script>
import { fetchlogin } from "../api/user";
import { mapState, mapGetters, mapActions, mapMutations } from "Vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations(["gettoken", "getuserinfo"]),
    async onSubmit(values) {
      let { message, status, token, userInfo } = await fetchlogin(values);
      if (status === -1) {
        this.$toast.fail(message);
        return;
      } else {
        this.$toast.success(message);
        //将token登录态存储到vuex,vuex再把数据同步到本地存储
        this.gettoken(token);
        this.getuserinfo(userInfo);
        // 登陆之后回到原来的页面
        let { redirect } = this.$route.query;
        // 如果是重定向回来的就回到重定向页面,如果不是就回到首页
        setTimeout(() => {
          if (redirect) {
            this.$router.push(redirect);
          } else {
            this.$router.push("/home/index");
          }
        }, 1200);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.logincontent {
  .nouser {
    width: 140px;
    margin: 20px auto;
    text-align: center;
    font-size: 16px;
    color: #cccccc;
  }
}
</style>