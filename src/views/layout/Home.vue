<template>
  <div class="home">
    <LeftMenu :state="state" />
    <SliderNav :state="state" />
  </div>
</template>
<script>
import { reactive, toRefs, watch } from "vue";
import LeftMenu from "./components/menu.vue";
import SliderNav from "./components/sliderNav.vue";
export default {
  components: { LeftMenu, SliderNav },
  data() {
    return {
      state: {
        collapsed: false,
        selectedKeys: ["1"],
        openKeys: ["sub1"],
        preOpenKeys: ["sub1"],
      },
    };
  },

  // setup() {
  //   const router = useRouter();
  //   console.log(router.currentRoute.value.matched);
  //   const openKey = ref(router.currentRoute.value.matched[0].name);
  //   const selectedKey = ref(router.currentRoute.value.matched[1].name);
  //   return {
  //     openKey,
  //     selectedKey,
  //   };
  // },
};
</script>

<style lang="less" scoped>
</style>