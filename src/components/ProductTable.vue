<template>
  <a-table
    :columns="columns"
    :data-source="tableData"
    @change="handleChange"
    :loading="loading"
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'operation'">
        <div>
          <a-button @click="handleEdit(record)">编辑</a-button>
          <a-button @click="handleDelete(record)">删除</a-button>
        </div>
      </template>
      <template v-if="column.dataIndex === 'tags'">
        <span v-for="tag in record.tags">{{ tag }}</span>
      </template>
    </template>
  </a-table>
</template>
<script>
export default {
  props: ["tableData", "loading", "columns"],
  setup(props, ctx) {
    const handleEdit = (record) => {
      ctx.emit("edit", record);
    };
    const handleDelete = (record) => {
      ctx.emit("delete", record);
    };

    const handleChange = (val) => {
      ctx.emit("pageChange", {
        page: val.current,
        pageSize: val.pageSize,
      });
    };

    return {
      handleEdit,
      handleDelete,
      handleChange,
    };
  },
};
</script>