<script>
import axios from "../../../node_modules/axios";
import global_ from "../Global";
export default {
  name: "Header",
  data() {
    return {
      login_message: "",
      signup_message: "",
      logosrc: require("../../assets/logo.jpg"),
      signUpRuleForm: {
        signup_username: "",
        signup_nickname: "",
        signup_password: "",
      },
      loginRuleForm: {
        login_username: "",
        login_password: "",
      },
      signUpRules: {
        signup_username: [
          { required: true, message: "請輸入帳號", trigger: "blur" },
          {
            min: 4,
            max: 16,
            message: "請輸入 4 到 16 個字元",
            trigger: "blur",
          },
        ],
        signup_nickname: [
          { required: true, message: "請輸入暱稱", trigger: "blur" },
          {
            max: 10,
            message: "請輸入最多 10 個字元",
            trigger: "blur",
          },
        ],
        signup_password: [
          { required: true, message: "請輸入密碼", trigger: "blur" },
          {
            min: 4,
            max: 16,
            message: "請輸入 4 到 16 個字元",
            trigger: "blur",
          },
        ],
      },
      loginRules: {
        login_username: [
          { required: true, message: "請輸入帳號", trigger: "blur" },
        ],
        login_password: [
          { required: true, message: "請輸入密碼", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    nickname() {
      return this.$store.state.user.nickname;
    },
    balance() {
      return this.$store.state.user.balance;
    },
  },
  methods: {
    loginRequestHandler() {
      loginRequest(this);
    },
    signupRequestHandler() {
      signUpRequest(this);
    },
    updateBalanceHandler() {
      updateBalance(this);
    },
    memberHandler(command) {
      memberCommand(this, command);
    },
    showBox(v) {
      clearBoxData(this);
      this.$modal.show(v);
    },
    closeBox(v) {
      this.$modal.hide(v);
    },
  },
  beforeMount() {
    if (this.nickname) {
      this.updateBalanceHandler();
    }
  },
};

// common

function clearBoxData(input) {
  input.login_message = "";
  input.loginRuleForm.login_username = "";
  input.loginRuleForm.login_password = "";
  input.signup_message = "";
  input.signUpRuleForm.signup_username = "";
  input.signUpRuleForm.signup_nickname = "";
  input.signUpRuleForm.signup_password = "";
}

function logout(input) {
  let loading = input.$loading(global_.loadingConfig);
  input.$cookies.keys().forEach((cookie) => input.$cookies.remove(cookie));
  input.$store.commit("updateNickname", "");

  switch (input.$route.path) {
    case "/wallet":
    case "/password":
      input.$router.push("/");
      break;
  }

  loading.close();
}

function memberCommand(input, command) {
  if (command != undefined) {
    switch (command) {
      case "logout":
        logout(input);
        break;
      default:
        if (input.$route.path != command) {
          input.$router.push(command);
        }
        break;
    }
  }
}

// api
function loginRequest(input) {
  input.$refs["loginRuleForm"].validate((valid) => {
    if (!valid) {
      return false;
    } else {
      const form = new FormData();
      form.append("username", input.loginRuleForm.login_username);
      form.append("password", input.loginRuleForm.login_password);

      let loading = input.$loading(global_.loadingConfig);
      axios
        .post(global_.apiUrl + "/login", form)
        .then(function (response) {
          if (response.data) {
            input.$cookies.set("token", response.data.token);
            input.$store.commit("updateNickname", response.data.nickname);
            input.$store.commit("updateBalance", response.data.balance);
            input.$modal.hide("login_box");
          } else {
            input.login_message = "伺服器忙碌中";
          }
        })
        .catch(function (error) {
          if (error.response) {
            switch (error.response.status) {
              case 401:
              case 404:
                input.login_message = "密碼錯誤";
                break;
              case 403:
                input.login_message = "帳號已停用";
                break;
              default:
                input.login_message = "伺服器忙碌中";
                break;
            }
          } else {
            input.login_message = "伺服器忙碌中";
          }
        })
        .finally(() => {
          loading.close();
        });
    }
  });
}

function signUpRequest(input) {
  input.$refs["signUpRuleForm"].validate((valid) => {
    if (!valid) {
      return false;
    } else {
      const form = new FormData();
      form.append("username", input.signUpRuleForm.signup_username);
      form.append("nickname", input.signUpRuleForm.signup_nickname);
      form.append("password", input.signUpRuleForm.signup_password);

      let loading = input.$loading(global_.loadingConfig);
      axios
        .post(global_.apiUrl + "/player", form)
        .then(function (response) {
          if (response.data) {
            input.$cookies.set("token", response.data.token);
            input.$store.commit("updateNickname", response.data.nickname);
            input.$store.commit("updateBalance", response.data.balance);
            input.$router.push("/wallet");
            input.$modal.hide("signup_box");
          } else {
            input.signup_message = "伺服器忙碌中";
          }
        })
        .catch(function (error) {
          if (error.response) {
            switch (error.response.status) {
              case 409:
                input.signup_message = "帳號已存在";
                break;
              default:
                input.signup_message = "伺服器忙碌中";
                break;
            }
          } else {
            input.signup_message = "伺服器忙碌中";
          }
        })
        .finally(() => {
          loading.close();
        });
    }
  });
}

function updateBalance(input) {
  let loading = input.$loading(global_.loadingConfig);
  axios
    .get(global_.apiUrl + "/player/wallet", {
      params: {
        token: input.$cookies.get("token"),
      },
    })
    .then(function (response) {
      input.$store.commit("updateWallet", response.data.data);
      response.data.data.forEach((v) => {
        if (v.bank == "Main") {
          input.$store.commit("updateBalance", v.balance);
        }
      });
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status == 403) {
          input.$alert("閒置過久，請重新登入!", {
            confirmButtonText: "回首頁",
            callback: () => {
              logout(input);
            },
          });
          return;
        }
      }
      input.$message.error({
        message: input.$createElement("h4", null, "更新失敗，伺服器忙碌中!"),
        center: true,
        showClose: true,
      });
    })
    .finally(() => {
      loading.close();
    });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.css" scoped></style>
<template src="./template.html"></template>