<template>
  <div class="menu-list">
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="state.collapsed"
      style="height: 100%"
    >
      <template v-for="route in $store.state.menuRoutes">
        <a-sub-menu v-if="!route.meta.hidden" :key="route.name">
          <!-- <template #icon>
            <AppstoreOutlined />
          </template> -->
          <template #icon>
            <IconFont :type="route.meta.icon" class="icon" />
          </template>
          <template #title>{{ route.meta.title }}</template>

          <template v-for="child in route.children">
            <a-menu-item v-if="!child.meta.hidden" :key="child.name">
              <template #icon>
                <IconFont :type="child.meta.icon" class="icon" />
              </template>
              <router-link :to="{ name: child.name }">{{
                child.meta.title
              }}</router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { createFromIconfontCN } from "@ant-design/icons-vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_3320887_rr4icpi9hro.js",
});

export default {
  components: { IconFont },
  props: ["state"],
  setup() {
    const router = useRouter();
    const openKeys = ref([router.currentRoute.value.matched[0].name]);
    let selectedKeys = ref([router.currentRoute.value.matched[1]?.name ?? ""]);
    watch(
      () => router.currentRoute.value,
      () => {
        let routeVal = router.currentRoute.value?.matched[1]?.name;
        routeVal === "ProductEdit" && (routeVal = "ProductAdd");
        selectedKeys.value.splice(0, 1, routeVal);
      }
    );

    return {
      openKeys,
      selectedKeys,
    };
  },
  // setup(props) {
  //   // const state = reactive({
  //   //   collapsed: false,
  //   //   selectedKeys: ["1"],
  //   //   openKeys: ["sub1"],
  //   //   preOpenKeys: ["sub1"],
  //   // });
  //   watch(
  //     () => props.state.openKeys,
  //     (_val, oldVal) => {
  //       props.state.preOpenKeys = oldVal;
  //     }
  //   );

  //   return { ...toRefs(state) };
  // },
};
</script>

<style lang="less" scoped>
.menu-list {
  width: 180px;
  position: fixed;
  height: 100%;

  // .ant-menu {
  //   height: 100%;
  // }
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>