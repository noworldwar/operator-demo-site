<script>
import axios from "../../node_modules/axios";

// common parameters
const apiUrl = "http://localhost:7901";

const loadingConfig = {
  lock: true,
  text: "Loading",
  spinner: "el-icon-loading",
  background: "rgba(0, 0, 0, 0.7)",
};

// common functions
const commonFunc = {
  gameListRequest: function (data, gameType) {
    let loading = data.$loading(loadingConfig);
    axios
      .get(apiUrl + "/gamelist", {
        params: {
          gameType: gameType,
        },
      })
      .then(function (response) {
        data.gamelist = gameDataProccess(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        loading.close();
      });
    return;
  },
  gameURLRequest: function (data, gp, gameid) {
    if (!data.$cookies.get("token")) {
      data.$parent.$parent.showLoginBox();
      return;
    }

    let loading = data.$loading(loadingConfig);
    axios
      .get(apiUrl + "/gamelink", {
        params: {
          token: data.$cookies.get("token"),
          gp: gp,
          gameID: gameid,
        },
      })
      .then(function (response) {
        window.open(response.data.link, gp);
      })
      .catch(function (error) {
        console.log(error);
        data.$alert("閒置過久，請重新登入!", {
          confirmButtonText: "明白了",
          callback: () => {
            data.$cookies.remove("token");
            data.$store.commit("updateNickname", "");
          },
        });
      })
      .finally(() => {
        loading.close();
      });
  },
};

// functions use for this file
function gameDataProccess(data) {
  let g_data = data;
  for (let i in g_data) {
    for (let index in g_data[i]) {
      if (index == "image") {
        g_data[i]["image"] = getImageUrl(g_data[i]["image"]);
      }
    }
  }
  return g_data;
}

function getImageUrl(path) {
  return require("../assets" + path);
}

export default {
  apiUrl,
  loadingConfig,
  commonFunc,
};
</script>