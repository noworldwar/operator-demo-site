<script>
import axios from "../../../node_modules/axios";
import global_ from "../Global";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      signup_username: "",
      signup_nickname: "",
      signup_password: "",
      login_message: "",
      signup_message: "",
    };
  },
  components: {},
  methods: {
    loginHandler() {
      loginRequest(this);
    },
    signUpModalHandler() {
      signUpModalRequest(this);
    },
    signUpHandler() {
      signUpRequest(this);
    },
  },
};

function loginRequest(input) {
  const form = new FormData();
  form.append("username", input.username);
  form.append("password", input.password);
  let vm = input;
  console.log(input.$store.state.status.loggedIn);
  if (input.username && input.password) {
    axios
      .post(global_.apiUrl + "/login", form)
      .then(function (response) {
        // console.log(input.$store.state.status.loggedIn);
        // console.log(response);
        vm.$cookies.set("username", vm.username);
        // console.log(response.data.token);
        vm.$cookies.set("token", response.data.token);
        input.$store.commit("loginSuccess");
      })
      .catch(function (error) {
        vm.login_message = error.response.data.error;
        // console.log(error.response.data.error);
        // input.$store.commit("loginSuccess");
        // vm.$cookies.set("username", vm.username);
        // console.log(input.$store.state.status.loggedIn);
      });
  } else {
    vm.login_message = "請輸入帳號密碼";
  }
  return;
}

function signUpModalRequest(input) {
  return input.$modal.show("signup");
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
        input.$store.commit("loginSuccess");
        console.log(response)
      })
      .catch(function (error) {
        vm.signup_message = error.response.data.error;
      });
  } else {
    vm.signup_message = "請輸入帳號、暱稱、密碼";
  }
  return input;
}
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>