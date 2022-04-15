<template>
  <div class="category-container">
    <a-button class="add-btn" type="primary" @click="addNewTag">
      新增标签
    </a-button>
    <a-modal
      v-model:visible="visible"
      :title="title"
      @ok="handleOk"
      :afterClose="afterClose"
    >
      <template #footer>
        <a-button key="back" @click="handleCancel">返回</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
          >提交</a-button
        >
      </template>
      <a-form
        :model="data.formState"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
        autocomplete="off"
        class="form-container"
      >
        <a-form-item label="标签ID" name="id">
          <a-input v-model:value="data.formState.id" :disabled="canChange" />
        </a-form-item>

        <a-form-item
          label="标签名称"
          name="name"
          :rules="[{ required: true, message: 'Please input your tag name!' }]"
        >
          <a-input v-model:value="data.formState.name" />
        </a-form-item>
        <a-form-item label="所属子类别">
          <a-select mode="tags" v-model:value="data.formState.c_items">
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 表格 -->
    <ProductTable
      :tableData="categoryList"
      :columns="categoryColumns"
      :loading="loading"
      @edit="handleEdit"
      @delete="handleDelete"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import ProductTable from "@/components/ProductTable.vue";
import useCategory from "@/composition/useCategory";
export default {
  components: { ProductTable },
  setup() {
    return {
      ...useCategory(),
    };
  },
};
</script>

<style lang="less" scoped>
.category-container {
  display: flex;
  flex-direction: column;
  .add-btn {
    margin: 20px 10px;
    align-self: flex-end;
  }
}
</style>