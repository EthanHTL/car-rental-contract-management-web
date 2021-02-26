<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import util from "@/libs/util";
export default {
  name: "app",
  watch: {
    "$i18n.locale": "i18nHandle",
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem("store")) {
    //   this.$store.replaceState(
    //     Object.assign(
    //       {},
    //       this.$store.state,
    //       JSON.parse(sessionStorage.getItem("store"))
    //     )
    //   );
    // }
    // //在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener("beforeunload", () => {
    //   sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    // });
    this.i18nHandle(this.$i18n.locale);
  },
  methods: {
    i18nHandle(val, oldVal) {
      util.cookies.set("lang", val);
      document.querySelector("html").setAttribute("lang", val);
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/style/public-class.scss";
</style>
