<template>
  <!-- <h1>Home Page</h1>
  <h2 v-if="user">{{ user.username }}</h2>
  <a-button @click="handleLoginOut">退出</a-button> -->
  <router-view></router-view>
</template>



<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  // setup() {
  //   const store = useStore();
  //   const router = useRouter();
  //   const handleLoginOut = () => {
  //     store.dispatch("userLogin/loginOut");
  //     router.push("/login");
  //   };
  //   return {
  //     handleLoginOut,
  //     user: computed(() => store.state.userLogin.user),
  //   };
  // },
};
</script>

<style>
</style>