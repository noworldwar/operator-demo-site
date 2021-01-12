<template>
  <div class="homepage">
    <Header />
    <TopBar />
    <Home />
  </div>
</template>

<script>
// @ is an alias to /src
import Home from "@/components/HomeComponent/index.vue";
import Header from "@/components/HeaderComponent/index.vue";
import TopBar from "@/components/TopBarComponent/index.vue";

export default {
  components: {
    Header,
    Home,
    TopBar,
  },
};
</script>
