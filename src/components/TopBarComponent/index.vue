<script>
export default {
  name: "TopBar",
  data() {
    //   var routes = this.$router.options.routes
    var routes = [
      {
        name: "Home",
        path: "/",
      },
      {
        name: "Wallet",
        path: "/wallet",
      },
    ];
    // console.log(routes);
    return {
      routes: routes,
    };
  },
  methods: {
    logoutRequest: function () {
      this.$cookies.keys().forEach((cookie) => this.$cookies.remove(cookie));
      this.$store.commit("logout");
      this.$router.push({ path: "/" });
    },
  },
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
    default-active="/"
  >
    <el-menu-item index="/"> 首頁 </el-menu-item>
    <el-menu-item index="2"> 真人娛樂 </el-menu-item>
    <el-menu-item index="3"> 電子遊戲 </el-menu-item>
    <el-menu-item index="4"> 體育賽事 </el-menu-item>
  </el-menu>
</template>