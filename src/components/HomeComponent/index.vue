<script>
export default {
  name: "HomePage",
  props: {
  },
  data() {
    return {
      msg: "",
      username: "",
    };
  },
  methods: {

  },
  beforeMount() {
    // if (this.$cookies.get("balance")) {
    //   showBalanceMsg(this);
    // }
    console.log();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.css" scoped></style>
<template src="./template.html"></template>