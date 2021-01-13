<script>
export default {
  name: "Home",
  data() {
    return {
      items: [
        {
          key: "1",
          img: require("../../assets/game/we/dt.jpg"),
          title: "龍虎之戰",
        },
        {
          key: "2",
          img: require("../../assets/game/we/ba.jpg"),
          title: "決勝時刻",
        },
        {
          key: "3",
          img: require("../../assets/game/we/ro.jpg"),
          title: "急速輪盤",
        },
        {
          key: "4",
          img: require("../../assets/game/tpg/70.webp"),
          title: "幸運777",
        },
        {
          key: "5",
          img: require("../../assets/game/tpg/71.webp"),
          title: "樂趣猴",
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.css" scoped></style>
<template src="./template.html"></template>