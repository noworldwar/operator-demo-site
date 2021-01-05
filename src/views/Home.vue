<template>
  <html>
    <div class="home">
      <Header />
      <TopBar />
      <Home msg="Welcome" />
      
    </div>
  </html>
</template>

<script>
// @ is an alias to /src
import Home from "@/components/HomeComponent/index.vue";
import Header from '@/components/HeaderComponent/index.vue';
import TopBar from '@/components/TopBarComponent/index.vue';

export default {
  name: "HomePage",
  components: {
    Header,
    Home,
    TopBar,
  },
};
</script>
