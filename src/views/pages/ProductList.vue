<template>
  <!-- 搜索 -->
  <Search
    @submit="handleSearchSubmit"
    @back="handleBack"
    :searchData="categoryList"
  />

  <!-- 表格 -->
  <ProductTable :tableData="productsData" />
</template>

<script>
import Search from "@/components/Search.vue";
import ProductTable from "@/components/ProductTable.vue";
import { ref, reactive } from "vue";
import { getProducts } from "@/api/product";
import { getCategory } from "@/api/category";
export default {
  components: { Search, ProductTable },
  setup() {
    //获取下拉框的类目选择
    let categoryList = ref([]);
    getCategory().then((res) => {
      categoryList.value = res.data;
    });

    // 获取商品列表数据
    let productsData = ref([]);
    const initProducts = (params) => {
      getProducts(params).then((res) => {
        productsData.value = res.data.map((it) => {
          return {
            ...it,
            categoryName: categoryList.value[it.category - 1].name,
          };
        });
      });
    };
    initProducts();

    // 根据搜索重新获取数据
    let searchParams = {};
    const handleSearchSubmit = (searchForm) => {
      searchParams = {
        // page: 1,
        // size: 10,
        searchWord: searchForm.keyWords,
        category: searchForm.category,
      };
      initProducts(searchParams);
    };

    // 搜索后返回
    const handleBack = () => {
      initProducts();
    };

    return {
      categoryList,
      productsData,
      handleSearchSubmit,
      handleBack,
    };
  },
};
</script>

<style>
</style>