<script>
export default {
  name: "TopBar",
};
</script>

<style scoped>
</style>

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
    <el-menu-item index="/3"> 電子遊戲 </el-menu-item>
    <el-menu-item index="/4"> 體育賽事 </el-menu-item>
  </el-menu>
</template>