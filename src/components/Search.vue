<template>
  <div class="search-container">
    <a-form layout="inline" :model="searchForm" @submit="handleSubmit">
      <a-form-item label="检索关键字">
        <a-input
          v-model:value="searchForm.keyWords"
          placeholder="input keywords"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="商品类目">
        <a-select
          v-model:value="searchForm.category"
          placeholder="select category"
          style="width: 140px"
          allowClear
        >
          <a-select-option
            v-for="item in searchData"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit"> 搜索 </a-button>
        <a-button type="primary" style="margin-left: 10px" @click="handleBack">
          返回
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { reactive } from "vue";

export default {
  props: ["searchData"],
  setup(props, ctx) {
    const searchForm = reactive({
      keyWords: "",
      category: "",
    });

    const handleSubmit = () => {
      ctx.emit("submit", searchForm);
    };

    const handleBack = () => {
      searchForm.keyWords = "";
      searchForm.category = "";
      ctx.emit("back");
    };

    return {
      searchForm,
      handleSubmit,
      handleBack,
    };
  },
};
</script>

<style lang="less" scoped>
.search-container {
  padding: 20px;
}
</style>