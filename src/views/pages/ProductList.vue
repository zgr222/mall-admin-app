<template>
  <div class="product-list-container">
    <!-- 搜索 -->
    <Search
      @submit="handleSearchSubmit"
      @back="handleBack"
      :searchData="categoryList"
    />

    <a-button class="add-btn">
      <router-link :to="{ name: 'ProductAdd' }">新增商品</router-link>
    </a-button>

    <!-- 表格 -->
    <ProductTable
      :tableData="productsData"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import ProductTable from "@/components/ProductTable.vue";
import { ref, createVNode } from "vue";
import * as productApi from "@/api/product";
import { getCategory } from "@/api/category";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { Modal, message } from "ant-design-vue";
import { useRouter } from "vue-router";

export default {
  components: { Search, ProductTable },
  setup() {
    const router = useRouter();

    //获取下拉框的类目选择
    let categoryList = ref([]);
    getCategory().then((res) => {
      categoryList.value = res.data;
    });

    // 获取商品列表数据
    let productsData = ref([]);
    const initProducts = (params) => {
      productApi.getProducts(params).then((res) => {
        productsData.value = res.data.map((it) => {
          return {
            ...it,
            categoryName: categoryList.value[it.category - 1]?.name,
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

    // 编辑商品
    const handleEdit = (product) => {
      console.log(product);
      router.push({ name: "ProductEdit", params: { id: product.id } });
    };

    // 删除商品
    const handleDelete = (product) => {
      console.log("...", product.id);
      Modal.confirm({
        title: "是否确认删除该商品?",
        icon: createVNode(ExclamationCircleOutlined),
        content: `${product.title}`,
        onOk() {
          productApi
            .deleteProduct(product.id)
            .then((res) => {
              message.success("删除成功！", [1.5]);
              initProducts();
            })
            .catch((err) => {
              message.error(`删除失败！${err}`, [1.5]);
            });
        },
        onCancel() {
          return;
        },
      });
    };

    return {
      categoryList,
      productsData,
      handleSearchSubmit,
      handleBack,
      handleEdit,
      handleDelete,
    };
  },
};
</script>

<style lang="less" scoped>
.product-list-container {
  position: relative;
  .add-btn {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>