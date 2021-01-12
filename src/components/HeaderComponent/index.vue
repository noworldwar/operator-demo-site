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
      this.$modal.show(v);
    },
    closeBox(v) {
      this.$modal.hide(v);
    },
  },
  beforeMount() {
    console.log(this.nickname);
    if (this.nickname) {
      this.updateBalanceHandler();
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
  input.$store.commit("updateNickname", "");
  if (input.$route.path != "/") {
    input.$router.push("/");
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
          input.$store.commit("updateNickname", response.data.nickname);
          input.$store.commit("updateBalance", response.data.balance);
          input.$modal.hide("login_box");
          clearBoxData(input);
        } else {
          input.login_message = "回傳格式錯誤";
        }
      })
      .catch(function (error) {
        console.log(error);
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
          input.$store.commit("updateNickname", response.data.nickname);
          input.$store.commit("updateBalance", response.data.balance);
          input.$modal.hide("signup_box");
          clearBoxData(input);
        } else {
          input.signup_message = "回傳格式錯誤";
        }
      })
      .catch(function (error) {
        console.log(error);
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