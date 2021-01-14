<script>
import axios from "../../../node_modules/axios";
import global_ from "../Global";
export default {
  name: "Header",
  data() {
    return {
      login_message: "",
      login_username: "",
      login_password: "",
      signup_message: "",
      signup_username: "",
      signup_nickname: "",
      signup_password: "",
      logosrc: require("../../assets/logo.jpg"),
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
  input.login_username = "";
  input.login_password = "";
  input.signup_message = "";
  input.signup_username = "";
  input.signup_nickname = "";
  input.signup_password = "";
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
  if (!input.login_username) {
    input.login_message = "請輸入[帳號]";
    return;
  }

  if (!input.login_password) {
    input.login_message = "請輸入[密碼]";
    return;
  }

  const form = new FormData();
  form.append("username", input.login_username);
  form.append("password", input.login_password);

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
        input.login_message = "伺服器異常";
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
            input.login_message = "伺服器異常";
            break;
        }
      } else {
        input.login_message = "伺服器異常";
      }
    })
    .finally(() => {
      loading.close();
    });
}

function signUpRequest(input) {
  if (!input.signup_username) {
    input.signup_message = "請輸入[帳號]";
    return;
  }

  if (!input.signup_password) {
    input.signup_message = "請輸入[密碼]";
    return;
  }

  if (!input.signup_nickname) {
    input.signup_message = "請輸入[暱稱]";
    return;
  }

  const form = new FormData();
  form.append("username", input.signup_username);
  form.append("nickname", input.signup_nickname);
  form.append("password", input.signup_password);

  let loading = input.$loading(global_.loadingConfig);
  axios
    .post(global_.apiUrl + "/player", form)
    .then(function (response) {
      if (response.data) {
        input.$cookies.set("token", response.data.token);
        input.$store.commit("updateNickname", response.data.nickname);
        input.$store.commit("updateBalance", response.data.balance);
        input.$modal.hide("signup_box");
      } else {
        input.signup_message = "伺服器異常";
      }
    })
    .catch(function (error) {
      if (error.response) {
        switch (error.response.status) {
          case 409:
            input.signup_message = "帳號已存在";
            break;
          default:
            input.signup_message = "伺服器異常";
            break;
        }
      } else {
        input.signup_message = "伺服器異常";
      }
    })
    .finally(() => {
      loading.close();
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
      console.log(error);
      input.$alert("閒置過久，請重新登入!", {
        confirmButtonText: "回首頁",
        callback: () => {
          logout(input);
        },
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