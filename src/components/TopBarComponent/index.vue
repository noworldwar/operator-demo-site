<script>
export default {
  name: "TopBar",
  computed: {
    nickname() {
      return this.$store.state.user.nickname;
    },
  },
};
</script>

<style src="./style.css" scoped></style>

<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :default-active="$route.path"
  >
    <el-menu-item index="/"> 首頁 </el-menu-item>
    <el-menu-item index="/live"> 真人娛樂 </el-menu-item>
    <el-menu-item index="/elec"> 電子遊戲 </el-menu-item>
    <el-menu-item index="/sbg"> 體育賽事 </el-menu-item>
    <el-menu-item index="/wallet" v-if="nickname" style="color:#ff2323;font-weight:bold;"> 錢包中心 </el-menu-item>
  </el-menu>
</template>