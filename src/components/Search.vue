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
            v-for="item in categoryList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit"> 搜索 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
import { getCategory } from "../api/category";
export default {
  setup(props, ctx) {
    const searchForm = reactive({
      keyWords: "",
      category: "",
    });

    const categoryList = ref([]);

    getCategory().then((res) => {
      categoryList.value.push(...res.data);
    });

    const handleSubmit = () => {
      console.log(searchForm.keyWords, searchForm.category);
      // const res = await getCategory(searchForm);
      // ctx.emit("submit", searchForm);
    };

    return {
      searchForm,
      handleSubmit,
      categoryList,
    };
  },
};
</script>

<style lang="less" scoped>
.search-container {
  padding: 20px;
}
</style>