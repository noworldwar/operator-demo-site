<template>
  <div class="wallet">
    <TopBar />
    <Wallet />
  </div>
</template>

<script>
import TopBar from '@/components/TopBarComponent/index.vue'
import Wallet from '@/components/WalletComponent/index.vue'

export default {
  name:'WalletPage',
  components: {
    Wallet,
    TopBar,
  }
}
</script>