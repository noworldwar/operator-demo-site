<template>
  <div class="home">
    <TopBar />
    <Home msg="Welcome" />
  </div>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/HomeComponent/index.vue'
import TopBar from '@/components/TopBarComponent/index.vue'

export default {
  name:'HomePage',
  components: {
    Home,
    TopBar,
  }
}
</script>
