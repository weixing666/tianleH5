<template>
  <div>
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
      <van-field
        v-model="afpassword"
        type="password"
        name="afpassword"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请确认密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { fetchregister } from "../api/user";
export default {
  data() {
    return {
      username: "",
      password: "",
      afpassword: "",
    };
  },
  methods: {
    async onSubmit(values) {
      // 验证之后在提交请求
      if (this.password !== this.afpassword) {
        this.$toast.fail("两次密码不一致");
        return;
      } else {
        // 发送注册请求
        let { username, password } = values;
        let { message, status } = await fetchregister({ username, password });
        if (status === 0) {
          this.$toast.success(message);
          setTimeout(() => {
            this.$router.replace("/login");
          }, 1500);
        } else {
          this.$toast.fail(message);
        }
      }
    },
  },
};
</script>

<style>
</style>