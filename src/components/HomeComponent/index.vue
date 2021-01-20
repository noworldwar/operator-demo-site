<script>
export default {
  name: "Home",
  data() {
    return {
      items: [
        {
          key: "1",
          img: require("../../assets/game/we/dt.jpg"),
          title: "WE 龍虎之戰",
          link: "/live",
        },
        {
          key: "2",
          img: require("../../assets/game/tpg/71.webp"),
          title: "TPG 樂趣猴",
          link: "/elec",
        },
        {
          key: "3",
          img: require("../../assets/game/we/ba.jpg"),
          title: "WE 決勝時刻",
          link: "/live",
        },
        {
          key: "4",
          img: require("../../assets/game/tpg/70.webp"),
          title: "TPG 幸運777",
          link: "/elec",
        },
        {
          key: "5",
          img: require("../../assets/game/we/ro.jpg"),
          title: "WE 急速輪盤",
          link: "/live",
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.css" scoped></style>
<template src="./template.html"></template>