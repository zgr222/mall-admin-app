import { ref } from 'vue';

// 产品列表的表头
const productHead = [
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
    width: 100,
  },
  {
    title: "折扣价格",
    dataIndex: "price_off",
    key: "price_off",
    width: 100,
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
    width: 170,
  },
];

const categoryHead = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
  },

]

export default function useHeader() {
  const proColumns = ref(productHead);
  const categoryColumns = ref(categoryHead)

  return {
    proColumns,
    categoryColumns
  }
}