<template>
  <div class="wallet">
    <Header />
    <TopBar />
    <Wallet />
  </div>
</template>

<script>
import Header from "@/components/HeaderComponent/index.vue";
import TopBar from "@/components/TopBarComponent/index.vue";
import Wallet from "@/components/WalletComponent/index.vue";

export default {
  name: "WalletPage",
  components: {
    Wallet,
    Header,
    TopBar,
  },
};
</script>