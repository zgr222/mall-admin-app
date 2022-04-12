<template>
  <!-- 搜索 -->
  <Search @submit="handleSearchSubmit" />

  <!-- 表格 -->
</template>

<script>
import Search from "@/components/Search.vue";
import { ref, reactive } from "vue";
export default {
  components: { Search },
  setup() {
    const categoryList = ref([]);
    const handleSearchSubmit = (form) => {
      console.log(form);
    };
  },
};
</script>

<style>
</style>