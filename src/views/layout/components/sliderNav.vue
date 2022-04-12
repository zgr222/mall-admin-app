<template>
  <div :class="{ 'main-app': true, 'main-unfold': state.collapsed }">
    <div class="main-header">
      <a-button
        type="primary"
        style="margin-bottom: 16px"
        @click="toggleCollapsed"
      >
        <MenuUnfoldOutlined v-if="state.collapsed" />
        <MenuFoldOutlined v-else />
      </a-button>
      <div class="breadcrumb">
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item><a href="">统计</a></a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <ul class="user-info">
        <li>
          欢迎您，{{ username }}
          <down-outlined />
        </li>
        <li @click="handleLoginOut">退出</li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: { MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined },
  props: ["state"],
  setup(props) {
    const toggleCollapsed = () => {
      props.state.collapsed = !props.state.collapsed;
      props.state.openKeys = props.state.collapsed
        ? []
        : props.state.preOpenKeys;
    };
    const store = useStore();
    const router = useRouter();
    const username = computed(() => store.state.userLogin?.user?.username);
    const handleLoginOut = () => {
      store.dispatch("userLogin/loginOut");
      router.push("/login");
    };
    return {
      toggleCollapsed,
      username,
      handleLoginOut,
    };
  },
};
</script>

<style lang="less" scoped>
.main-app {
  margin-left: 180px;
  transition: all 0.3s;
  &.main-unfold {
    margin-left: 80px;
  }
  .main-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    padding-left: 10px;
    padding-right: 20px;
    .breadcrumb {
      display: inline-block;
      margin-left: 20px;
    }
    .user-info {
      float: right;
      text-align: center;
      cursor: pointer;
      li:not(:first-child) {
        display: none;

        &:hover {
          background-color: #eee;
          color: #999;
          font-weight: 700;
        }
      }
      li {
        padding: 0 20px;
      }
      &:hover {
        li {
          display: block;
        }
      }
    }
  }
}
</style>