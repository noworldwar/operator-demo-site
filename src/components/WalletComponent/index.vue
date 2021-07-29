<script>
import axios from "../../../node_modules/axios";
import global_ from "../Global";
import moment from "moment";

export default {
  name: "Wallet",
  data() {
    var checkAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("請輸入金額，最少1"));
      }
      if (!Number.isInteger(value)) {
        callback(new Error("請輸入整數"));
      } else {
        callback();
      }
    };
    return {
      itemWallet: [],
      tranData: [],
      tranMsg: "",
      walletTab: "tab1",
      ruleForm: {
        fromBank: "",
        toBank: "",
        amount: 0,
      },
      rules: {
        fromBank: [
          { required: true, message: "請選轉出錢包", trigger: "change" },
        ],
        toBank: [
          { required: true, message: "請選轉入錢包", trigger: "change" },
        ],
        amount: [{ validator: checkAmount, trigger: "blur" }],
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
function formatDateTime(value) {
  if (value) {
    console.log("date_value: ",value)
    console.log("moment_date: ",moment.unix(value).format('YYYY-MM-DD hh:mm:ss'))

    return moment.unix(value).format('YYYY-MM-DD hh:mm:ss')

    // return moment(value).format("YYYY-MM-DD hh:mm:ss");
  }
}

function reloadItemWallet(input) {
  input.ruleForm.toBank = "";
  input.itemWallet.forEach((v) => {
    v.disabled = false;
    if (input.ruleForm.fromBank == v.bank) {
      v.disabled = true;
    }
  });
}

// api
function getWalletRequest(input) {
  let loading = input.$loading(global_.loadingConfig);
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
  let loading = input.$loading(global_.loadingConfig);
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
      if (error.response) {
        input.tranMsg = "讀取錯誤:" + error.response.status;
      }
    })
    .finally(() => {
      loading.close();
    });
}

function postTransferRequest(input) {
  input.$refs["ruleForm"].validate((valid) => {
    if (!valid) {
      return false;
    } else {
      let loading = input.$loading(global_.loadingConfig);
      const form = new FormData();
      form.append("fromBank", input.ruleForm.fromBank);
      form.append("toBank", input.ruleForm.toBank);
      form.append("amount", input.ruleForm.amount);
      form.append("token", input.$cookies.get("token"));
      axios
        .post(global_.apiUrl + "/transfer", form)
        .then(function () {
          input.$message({
            message: input.$createElement("h4", null, "轉帳成功!"),
            type: "success",
            center: true,
            showClose: true,
          });
          input.getWallet();
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status == 403) {
              input.$alert("閒置過久，請重新登入!", {
                confirmButtonText: "回首頁",
                callback: () => {
                  input.$cookies.remove("token");
                  input.$store.commit("updateNickname", "");
                  input.$router.push("/");
                },
              });
              return;
            } else if (error.response.status == 402) {
              input.$message.error({
                message: input.$createElement(
                  "h4",
                  null,
                  input.ruleForm.fromBank + "錢包 餘額不足!"
                ),
                center: true,
                showClose: true,
              });
              return;
            }
          }
          input.$message.error({
            message: input.$createElement(
              "h4",
              null,
              "轉帳失敗，伺服器忙碌中!"
            ),
            center: true,
            showClose: true,
          });
        })
        .finally(() => {
          loading.close();
        });
    }
  });
}
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>