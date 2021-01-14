<script>
import axios from "../../../node_modules/axios";
import global_ from "../Global";
export default {
  name: "Password",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("請輸入密碼"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("請再次輸入密碼"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("兩次輸入密碼不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      ChangePassword(this);
    },
  },
};

// api
function ChangePassword(input) {
  input.$refs["ruleForm"].validate((valid) => {
    if (!valid) {
      return false;
    } else {
      const form = new FormData();
      form.append("token", input.$cookies.get("token"));
      form.append("password", input.ruleForm.pass);

      let loading = input.$loading(global_.loadingConfig);
      axios
        .put(global_.apiUrl + "/password", form)
        .then(function () {
          input.$message({
            message: input.$createElement("h4", null, "變更密碼成功!"),
            type: "success",
            center: true,
            showClose: true,
          });
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
            }
          }
          input.$message.error({
            message: input.$createElement(
              "h4",
              null,
              "變更失敗，伺服器忙碌中!"
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