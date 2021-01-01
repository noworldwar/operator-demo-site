<script>
import axios from "../../../node_modules/axios";
import global_ from "../Global";
export default {
  name: "HomePage",
  props: {
    msg: String,
  },
  data() {
    return {
      username: this.$cookies.get("username"),
      balance_msg: "",
      signup_message: "",
      login_message: "",
      login_username: "",
      login_password: "",
      signup_username: "",
      signup_nickname: "",
      signup_password: "",
      is_login: this.$store.state.status.loggedIn,
    };
  },
  methods: {
    loginBoxHandler() {
      loginModal(this);
    },
    signUpBoxHandler() {
      signUpModal(this);
    },
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
      this.$cookies.keys().forEach((cookie) => this.$cookies.remove(cookie));
      this.$store.commit("logout");
      location.reload();
    },
  },
  beforeMount() {
    if (this.$cookies.get("balance")) {
      showBalanceMsg(this);
    }
    console.log();
    console.log(this.$store.state.status.loggedIn);
  },
};

function loginModal(input) {
  return input.$modal.show("login_box");
}

function signUpModal(input) {
  return input.$modal.show("signup_box");
}

function loginRequest(input) {
  const form = new FormData();
  form.append("username", input.login_username);
  form.append("password", input.login_password);
  let vm = input;
  console.log(input.$store.state.status.loggedIn);
  if (input.login_username && input.login_password) {
    axios
      .post(global_.apiUrl + "/login", form)
      .then(function (response) {
        // console.log(input.$store.state.status.loggedIn);
        // console.log(response);
        vm.$cookies.set("username", vm.login_username);
        // console.log(response.data.token);
        vm.$cookies.set("token", response.data.token);
        vm.$cookies.set("balance", response.data.balance);
        input.$modal.hide("login_box");
        vm.balance_msg =
          "Welcome " +
          response.data.nickname +
          "! Credit: " +
          response.data.balance;
        input.$store.commit("loginSuccess");
        location.reload();
      })
      .catch(function (error) {
        // vm.login_message = error.response;
        console.log(error);
        // input.$store.commit("loginSuccess");
        // vm.$cookies.set("username", vm.username);
        // console.log(input.$store.state.status.loggedIn);
      });
  } else {
    vm.login_message = "請輸入帳號密碼";
  }
  return;
}

function signUpRequest(input) {
  const form = new FormData();
  form.append("username", input.signup_username);
  form.append("nickname", input.signup_nickname);
  form.append("password", input.signup_password);
  let vm = input;
  if (input.signup_username && input.signup_nickname && input.signup_password) {
    axios
      .post(global_.apiUrl + "/player", form)
      .then(function (response) {
        vm.$cookies.set("username", vm.username);
        vm.$cookies.set("nickname", vm.nickname);
        vm.$cookies.set("token", response.data.token);
        vm.$cookies.set("balance", response.data.balance);
        input.$modal.hide("login_box");
        showBalanceMsg(vm, response.data.balance, response.data.nickname);
        input.$store.commit("loginSuccess");
        console.log(response);
        location.reload();
      })
      .catch(function (error) {
        vm.signup_message = error.response.data.error;
      });
  } else {
    vm.signup_message = "請輸入帳號、暱稱、密碼";
  }
  return input;
}

function showBalanceMsg(input) {
  input.balance_msg =
    "Welcome " +
    input.$cookies.get("username") +
    "! Credit: " +
    input.$cookies.get("balance");
  return;
}

function updateBalance(input) {
  let vm = input;
  axios
    .get(global_.apiUrl + "/player/wallet", {
      params: {
        token: vm.$cookies.get("token"),
      },
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.css" scoped></style>
<template src="./template.html"></template>