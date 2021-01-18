<script>
import global_ from "../Global";
export default {
  name: "Live",
  data() {
    return {
      gamelist: [],
    };
  },
  methods: {
    gameURLHandler(gp, gameid) {
      global_.commonFunc.gameURLRequest(this, gp, gameid);
    },
    gameListHandler() {
      global_.commonFunc.gameListRequest(this, "live");
    },
  },
  beforeMount() {
    this.gameListHandler();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.css" scoped></style>
<template src="./template.html"></template>