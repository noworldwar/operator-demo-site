<script>
import axios from "../../../node_modules/axios";
import global_ from "../Global";
export default {
  name: "Header",
  data() {
    return {
      nickname: this.$cookies.get("nickname"),
      balance: this.$cookies.get("balance"),
      login_message: "",
      login_username: "",
      login_password: "",
      signup_message: "",
      signup_username: "",
      signup_nickname: "",
      signup_password: "",
    };
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
    logoutHandler() {
      logout(this);
    },
    memberHandler(command) {
      if (command != undefined) {
        this.$router.push(command);
      }
    },
    showBox(v) {
      this.$modal.show(v);
    },
    closeBox(v) {
      this.$modal.hide(v);
    },
  },
  beforeMount() {
    if (this.nickname) {
      this.updateBalanceHandler;
    }
  },
};

// common
const loadingData = {
  lock: true,
  text: "Loading",
  spinner: "el-icon-loading",
  background: "rgba(0, 0, 0, 0.7)",
};

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
  let loading = input.$loading(loadingData);
  input.$cookies.keys().forEach((cookie) => input.$cookies.remove(cookie));
  input.nickname = "";
  if (input.$route.path != "/") {
    input.$router.push("/");
  }
  loading.close();
}

// api
function loginRequest(input) {
  const form = new FormData();
  form.append("username", input.login_username);
  form.append("password", input.login_password);

  if (input.login_username && input.login_password) {
    let loading = input.$loading(loadingData);
    axios
      .post(global_.apiUrl + "/login", form)
      .then(function (response) {
        if (typeof response.data != undefined) {
          input.$cookies.set("token", response.data.token);
          input.$cookies.set("balance", response.data.balance);
          input.$cookies.set("nickname", response.data.nickname);

          input.nickname = response.data.nickname;
          input.balance = response.data.balance;
          input.$modal.hide("login_box");
          clearBoxData(input);
        } else {
          input.login_message = "回傳格式錯誤";
        }
      })
      .catch(function (error) {
        input.login_message = error.response.data.error;
      })
      .finally(() => {
        loading.close();
      });
  } else {
    input.login_message = "請輸入帳號密碼";
  }
}

function signUpRequest(input) {
  const form = new FormData();
  form.append("username", input.signup_username);
  form.append("nickname", input.signup_nickname);
  form.append("password", input.signup_password);

  if (input.signup_username && input.signup_nickname && input.signup_password) {
    let loading = input.$loading(loadingData);
    axios
      .post(global_.apiUrl + "/player", form)
      .then(function (response) {
        if (typeof response.data != undefined) {
          input.$cookies.set("token", response.data.token);
          input.$cookies.set("balance", response.data.balance);
          input.$cookies.set("nickname", response.data.nickname);

          input.nickname = response.data.nickname;
          input.balance = response.data.balance;
          input.$modal.hide("signup_box");
          clearBoxData(input);
        } else {
          input.signup_message = "回傳格式錯誤";
        }
      })
      .catch(function (error) {
        input.signup_message = error.response.data.error;
      })
      .finally(() => {
        loading.close();
      });
  } else {
    input.signup_message = "請輸入帳號、暱稱、密碼";
  }
}

function updateBalance(input) {
  let loading = input.$loading(loadingData);
  axios
    .get(global_.apiUrl + "/player/wallet", {
      params: {
        token: input.$cookies.get("token"),
      },
    })
    .then(function (response) {
      if (typeof response.data.data != undefined) {
        response.data.data.forEach((v) => {
          if (v.bank == "Main") {
            input.$cookies.set("balance", v.balance);
            input.balance = v.balance;
          }
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(() => {
      loading.close();
    });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.css" scoped></style>
<template src="./template.html"></template>