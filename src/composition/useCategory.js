import { ref, reactive } from "vue";
import useHeader from "@/composition/useHeader";
import * as categoryApi from "@/api/category";
import { message } from "ant-design-vue";

export default function useCategory() {
  const categoryList = ref([]);
  const loading = ref(false);
  const visible = ref(false);
  const title = ref("");
  const data = reactive({
    formState: {
      id: '',
      name: '',
      c_items: []
    },
    tempFromState: {}
  })
  const categoryItems = ref([]);
  const canChange = ref(true);

  // 获取表头渲染数据
  const { categoryColumns } = useHeader();

  //获取表格渲染数据
  const initCategory = () => {
    loading.value = true;
    categoryApi.getCategory().then((res) => {
      categoryList.value = res.data;
      loading.value = false;
    }).catch((err) => {
      message.error(`网络错误${err}`, 2)
    });
  }
  initCategory();


  // 新增时
  const addNewTag = () => {
    title.value = '新增标签'
    visible.value = true;
    canChange.value = false;
    data.formState = {};
  };

  // 编辑时表单回填
  const handleEdit = (val) => {
    title.value = '编辑标签'
    visible.value = true;
    canChange.value = true;
    data.formState = val;
  };

  // 取消编辑
  const handleCancel = () => {
    visible.value = false;
    initCategory();
  };
  const afterClose = () => {
    initCategory();
  }


  const handlePageChange = () => { };

  // 确认提交或修改
  const handleOk = () => {
    loading.value = true;
    if (canChange.value) {
      operateCategory(categoryApi.editCategory);
    } else {
      operateCategory(categoryApi.addCategory);
    }
  };

  // 删除
  const handleDelete = () => {
    message.info('由于新增标签接口有点问题, 暂时不写删除，怕误删', 4)
    // categoryApi.deleteCategory(data.formState.id).then(() => {
    //   message.success('删除成功', 1.5)
    // }).catch((err) => {
    //   message.error('删除失败', 2);
    // })
  };

  const operateCategory = (callback) => {
    callback(data.formState).then((res) => {
      message.success('操作成功', 1.5, () => {
        console.log(res);
        loading.value = false;
        visible.value = false;
      })
    }).catch((err) => {
      message.error(`操作失败${err}`, 1.5, () => {
        loading.value = false;
        visible.value = false;
      })
    })
  }

  return {
    categoryList,
    categoryColumns,
    loading,
    title,
    visible,
    data,
    categoryItems,
    canChange,
    handleEdit,
    handleDelete,
    handlePageChange,
    addNewTag,
    handleCancel,
    handleOk,
    afterClose
  };
}