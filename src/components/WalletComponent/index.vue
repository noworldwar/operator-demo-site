<script>
import axios from "../../../node_modules/axios";
import global_ from "../Global";
import moment from "moment";

export default {
  name: "WalletPage",
  data() {
    return {
      wallet: [],
      itemWallet: [],
      tranData: [],
      message: "",
      message2: "",
      walletTab: "tab1",
      formData: {
        fromBank: "",
        toBank: "",
        amount: 0,
      },
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
          vm.itemWallet = [];
          vm.wallet.forEach((v) => {
            vm.itemWallet.push({
              bank: v.bank,
              balance: v.balance,
              disabled: true,
            });
          });
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
    changeFromBank() {
      let vm = this;
      vm.formData.toBank = "";
      vm.itemWallet.forEach((v) => {
        v.disabled = false;
        if (vm.formData.fromBank == v.bank) {
          v.disabled = true;
        }
      });
    },
    postTransfer() {
      let vm = this;
      if (vm.formData.fromBank == "") {
        vm.$message({ message: "請選轉出錢包", type: "warning" });
        return;
      }
      if (vm.formData.toBank == "") {
        vm.$message({ message: "請選轉入錢包", type: "warning" });
        return;
      }
      if (vm.formData.amount < 1) {
        vm.$message({ message: "請輸入金額", type: "warning" });
        return;
      }

      const form = new FormData();
      form.append("fromBank", vm.formData.fromBank);
      form.append("toBank", vm.formData.toBank);
      form.append("amount", vm.formData.amount);
      form.append("token", vm.$cookies.get("token"));
      axios
        .post(global_.apiUrl + "/transfer", form)
        .then(function (response) {
          console.log(response.data);
          vm.$message({ message: "轉帳成功", type: "success" });
          vm.getWallet();
        })
        .catch(function (error) {
          console.log(error);
          vm.$message.error("轉帳失敗:" + error.response.status);
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