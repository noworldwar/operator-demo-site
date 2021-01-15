<template>
  <div id="app">
    <Header ref="myHeader" />
    <TopBar />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/HeaderComponent/index.vue";
import TopBar from "@/components/TopBarComponent/index.vue";

export default {
  components: {
    Header,
    TopBar,
  },
  methods: {
    showLoginBox: function () {
      this.$refs.myHeader.showBox("login_box");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
