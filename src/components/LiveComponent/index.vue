<script>
import axios from "../../../node_modules/axios";
import global_ from "../Global";
export default {
  name: "Live",
  data() {
    return {
      items: [
        {
          key: "1",
          img: require("../../assets/game/we/1.jpg"),
          title: "WE 真人直播(single)",
          gp: "we_s",
          gameid: "lobby",
        },
        {
          key: "2",
          img: require("../../assets/game/we/2.jpg"),
          title: "WE 真人直播(transfer)",
          gp: "we_t",
          gameid: "lobby",
        },
      ],
    };
  },
  methods: {
    gameURLHandler(gp, gameid) {
      gameURLRequest(this, gp, gameid);
    },
  },
};

// api
function gameURLRequest(input, gp, gameid) {
  if (!input.$cookies.get("token")) {
    input.$alert("請先登入!", { confirmButtonText: "明白了" });
    return;
  }

  let loading = input.$loading(global_.loadingConfig);
  axios
    .get(global_.apiUrl + "/gamelink", {
      params: {
        token: input.$cookies.get("token"),
        gp: gp,
        gameID: gameid,
      },
    })
    .then(function (response) {
      window.open(response.data.link, gp);
    })
    .catch(function (error) {
      console.log(error);
      input.$alert("閒置過久，請重新登入!", {
        confirmButtonText: "明白了",
        callback: () => {
          input.$cookies.remove("token");
          input.$store.commit("updateNickname", "");
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