<template>
  <div class="usercontent">
    <!-- 头部 -->
    <div class="van-nav-bar">
      <div class="userInfo">
        <div><div>头像</div></div>
        <div>更换头像</div>
        <div>用户名</div>
      </div>
    </div>
    <!-- 中间 -->
    <div class="mybuy">
      <div class="mybuyinfo">
        <div class=""></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.usercontent {
  .van-nav-bar {
    padding: 10px;
    height: 180px;
    background: rgb(55, 138, 110);
    .userInfo {
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 10px 16px;
      color: #eee;
      margin: 0 10px;
      font-size: 14px;
    }
  }
  .mybuy {
    display: flex;
    justify-content: center;
    align-items: center;
    .mybuyinfo {
      width: 90vw;
      padding: 10px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      background: rgb(235, 85, 85);
      margin-top: -40px;
    }
  }
}
</style>