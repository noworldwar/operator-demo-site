<template>
  <div class="page404">
    <h1>您訪問的頁面不存在</h1>
    <el-button type="primary" round v-on:click="goHome">回首頁</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>
