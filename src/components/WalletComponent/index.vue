<script>
import axios from "../../../node_modules/axios";
import global_ from "../Global";
import moment from "moment";

export default {
  name: "WalletPage",
  data() {
    return {
      wallet: [],
      tranData: [],
      message: "",
      message2: "",
      walletTab: "tab1",
    };
  },
  components: {},
  filters: {
    formatDate: function (value) {
      if (value) {
        return moment(value).format("YYYY-MM-DD hh:mm");
      }
    },
  },
  methods: {
    getWallet() {
      let vm = this;
      axios
        .get(global_.apiUrl + "/player/wallet", {
          params: {
            token: vm.$cookies.get("token"),
          },
        })
        .then(function (response) {
          vm.wallet = response.data.data;
          vm.getTransfer();
        })
        .catch(function (error) {
          console.log(error);
          if (error.response) {
            vm.message = "Token失效，請重新登入:" + error.response.status;
          }
        });
    },
    getTransfer() {
      let vm = this;
      axios
        .get(global_.apiUrl + "/transfer", {
          params: {
            token: vm.$cookies.get("token"),
          },
        })
        .then(function (response) {
          vm.tranData = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
          if (error.response) {
            vm.message2 = "讀取錯誤:" + error.response.status;
          }
        });
    },
  },
  beforeMount() {
    this.getWallet();
  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>