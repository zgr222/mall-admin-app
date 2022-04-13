<template>
  <a-table :columns="columns" :data-source="tableData">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'operation'">
        <div>
          <a-button>编辑</a-button>
          <a-button>删除</a-button>
        </div>
      </template>
      <template v-if="column.dataIndex === 'tags'">
        <span v-for="tag in record.tags">{{ tag }}</span>
      </template>
    </template>
  </a-table>
</template>
<script>
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 80,
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    ellipsis: true,
  },
  {
    title: "描述",
    dataIndex: "desc",
    key: "desc",
    ellipsis: true,
  },
  {
    title: "类目",
    dataIndex: "categoryName",
    key: "category",
    ellipsis: true,
  },
  {
    title: "预售价格",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "折扣价格",
    dataIndex: "price_off",
    key: "price_off",
  },
  {
    title: "标签",
    dataIndex: "tags",
    key: "tags",
  },
  {
    title: "限制购买数量",
    dataIndex: "inventory",
    key: "inventory",
  },
  {
    title: "上架状态",
    dataIndex: "status",
    key: "status",
    customRender({ text, record }) {
      return record.status === 1 ? "上架" : "下架";
    },
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
  },
];

import { ref } from "vue";
export default {
  props: ["tableData"],
  setup() {
    return {
      columns,
    };
  },
};
</script>