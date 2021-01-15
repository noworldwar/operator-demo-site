<script>
import axios from "../../../node_modules/axios";
import global_ from "../Global";
export default {
  name: "Elec",
  data() {
    return {
      items: [
        {
          key: "82",
          img: require("../../assets/game/tpg/82.webp"),
          title: "五龍吐珠",
          gp: "tpg",
          gameid: "1,82",
        },
        {
          key: "78",
          img: require("../../assets/game/tpg/78.webp"),
          title: "幸運小妖精",
          gp: "tpg",
          gameid: "1,78",
        },
        {
          key: "75",
          img: require("../../assets/game/tpg/75.webp"),
          title: "龍皇天下",
          gp: "tpg",
          gameid: "1,75",
        },
        {
          key: "72",
          img: require("../../assets/game/tpg/72.webp"),
          title: "水果王",
          gp: "tpg",
          gameid: "1,72",
        },
        {
          key: "71",
          img: require("../../assets/game/tpg/71.webp"),
          title: "樂趣猴",
          gp: "tpg",
          gameid: "1,71",
        },
        {
          key: "70",
          img: require("../../assets/game/tpg/70.webp"),
          title: "TPG 777",
          gp: "tpg",
          gameid: "1,70",
        },
        {
          key: "69",
          img: require("../../assets/game/tpg/69.webp"),
          title: "仙侠",
          gp: "tpg",
          gameid: "1,69",
        },
        {
          key: "68",
          img: require("../../assets/game/tpg/68.webp"),
          title: "金鼠送福",
          gp: "tpg",
          gameid: "1,68",
        },
        {
          key: "67",
          img: require("../../assets/game/tpg/67.webp"),
          title: "宇宙銀河",
          gp: "tpg",
          gameid: "1,67",
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
    input.$parent.$parent.showLoginBox();
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