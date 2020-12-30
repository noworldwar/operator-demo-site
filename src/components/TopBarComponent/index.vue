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
      logoutRequest: function() {
          this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie))
          this.$store.commit("logout");
          // this.$router.push({path: '/login'})
      }
  }
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
    <template v-for="(rule, index) in routes">
      <el-submenu v-if="rule.children && rule.children.length > 0" :key="index" :index="rule.path">
        <template slot="title">
          <i :class="rule.icon"></i>
          {{ rule.name }}
        </template>
        <el-menu-item
          v-for="(child, index) in rule.children"
          :key="index"
          :index="rule.path + '/' + child.path"
        >{{ child.name }}</el-menu-item>
      </el-submenu>
      <el-menu-item v-else :key="index" :index="rule.path">
        <i :class="rule.icon"></i>
        {{ rule.name }}
      </el-menu-item>
    </template>
    <el-menu-item v-on:click="logoutRequest" key=99 index="/logout">
      Logout
    </el-menu-item>
  </el-menu>
</template>