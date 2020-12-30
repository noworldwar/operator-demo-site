<script>
import axios from "../../../node_modules/axios";
import global_ from "../Global";
export default {
  name: "WalletPage",
  data() {
    return {
      username: "",
      balance: [],
      wallet_message: "",
    };
  },
  components: {},
  methods: {
    getBalanceHandler() {
      getBalanceRequest(this);
    },
  },
  beforeMount() {
    this.getBalanceHandler();
  },
};

function getBalanceRequest(input) {
  const form = new FormData();
  let vm = input;
  form.append("token", vm.$cookies.get("token"));
  axios
    .get(global_.apiUrl + "/player/wallet", {
      params: {
        token: vm.$cookies.get("token"),
      },
    })
    .then(function (response) {
      vm.username = vm.$cookies.get("username");
      vm.balance = response.data
      console.log(response);
    })
    .catch(function (error) {
      vm.wallet_message = error.response.data.error;
    });
  return;
}
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>