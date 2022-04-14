<template>
  <div class="home">
    <LeftMenu :state="state" />
    <SliderNav :state="state" />
  </div>
</template>

<script>
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
};
</script>
