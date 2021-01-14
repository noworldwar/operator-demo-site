<script>
import axios from "../../../node_modules/axios";
import global_ from "../Global";
import moment from "moment";

export default {
  name: "Wallet",
  data() {
    return {
      itemWallet: [],
      tranData: [],
      tranMsg: "",
      walletTab: "tab1",
      formData: {
        fromBank: "",
        toBank: "",
        amount: 0,
      },
    };
  },
  computed: {
    wallet() {
      return this.$store.state.user.wallet;
    },
  },
  filters: {
    formatDateTime,
  },
  methods: {
    getWallet() {
      getWalletRequest(this);
    },
    getTransfer() {
      getTransferRequest(this);
    },
    changeFromBank() {
      reloadItemWallet(this);
    },
    postTransfer() {
      postTransferRequest(this);
    },
  },
  beforeMount() {
    this.getWallet();
  },
};

// common
const loadingData = {
  lock: true,
  text: "Loading",
  spinner: "el-icon-loading",
  background: "rgba(0, 0, 0, 0.7)",
};

function formatDateTime(value) {
  if (value) {
    return moment(value).format("YYYY-MM-DD hh:mm:ss");
  }
}

function reloadItemWallet(input) {
  input.formData.toBank = "";
  input.itemWallet.forEach((v) => {
    v.disabled = false;
    if (input.formData.fromBank == v.bank) {
      v.disabled = true;
    }
  });
}

// api
function getWalletRequest(input) {
  let loading = input.$loading(loadingData);
  axios
    .get(global_.apiUrl + "/player/wallet", {
      params: {
        token: input.$cookies.get("token"),
      },
    })
    .then(function (response) {
      input.itemWallet = [];

      input.$store.commit("updateWallet", response.data.data);
      response.data.data.forEach((v) => {
        if (v.bank == "Main") {
          input.$store.commit("updateBalance", v.balance);
        }

        input.itemWallet.push({
          bank: v.bank,
          balance: v.balance,
          disabled: true,
        });
      });

      input.getTransfer();
    })
    .catch(function (error) {
      console.log(error);
      input.$alert("閒置過久，請重新登入!", {
        confirmButtonText: "回首頁",
        callback: () => {
          input.$cookies.remove("token");
          input.$store.commit("updateNickname", "");
          input.$router.push("/");
        },
      });
    })
    .finally(() => {
      loading.close();
    });
}

function getTransferRequest(input) {
  input.tranMsg = "查無資料";
  let loading = input.$loading(loadingData);
  axios
    .get(global_.apiUrl + "/transfer", {
      params: {
        token: input.$cookies.get("token"),
      },
    })
    .then(function (response) {
      input.tranData = response.data.data;
    })
    .catch(function (error) {
      console.log(error);
      if (error.response) {
        input.tranMsg = "讀取錯誤:" + error.response.status;
      }
    })
    .finally(() => {
      loading.close();
    });
}

function postTransferRequest(input) {
  if (input.formData.fromBank == "") {
    input.$message({ message: "請選轉出錢包", type: "warning" });
    return;
  }
  if (input.formData.toBank == "") {
    input.$message({ message: "請選轉入錢包", type: "warning" });
    return;
  }
  if (input.formData.amount < 1) {
    input.$message({ message: "請輸入金額", type: "warning" });
    return;
  }

  let loading = input.$loading(loadingData);
  const form = new FormData();
  form.append("fromBank", input.formData.fromBank);
  form.append("toBank", input.formData.toBank);
  form.append("amount", input.formData.amount);
  form.append("token", input.$cookies.get("token"));
  axios
    .post(global_.apiUrl + "/transfer", form)
    .then(function () {
      input.$message({ message: "轉帳成功", type: "success" });
      input.getWallet();
    })
    .catch(function (error) {
      console.log(error);
      input.$message.error("轉帳失敗:" + error.response.status);
    })
    .finally(() => {
      loading.close();
    });
}
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>