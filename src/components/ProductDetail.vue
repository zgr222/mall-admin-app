<template>
  <a-form
    ref="formRef"
    :model="detailForm"
    :labelCol="{ span: 7 }"
    :wrapperCol="{ span: 12 }"
    :validate-messages="validateMessages"
  >
    <a-form-item label="标题" name="title" :rules="[{ required: true }]">
      <a-input v-model:value="detailForm.title" />
    </a-form-item>
    <a-form-item label="商品描述">
      <a-textarea v-model:value="detailForm.desc" />
    </a-form-item>

    <a-form-item label="商品类目" name="category" :rules="[{ required: true }]">
      <a-select
        v-model:value="detailForm.category"
        placeholder="请选择商品类别"
        allowClear
        @change="handleChange"
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

    <a-form-item
      label=""
      name="categoryChild"
      :wrapper-col="{ offset: 7, span: 8 }"
    >
      <a-select
        placeholder="请选择子类目"
        style="margin-top: 10px"
        v-model:value="detailForm.c_item"
      >
        <a-select-option v-for="c in categoryItems" :key="c" :value="c">
          <template v-if="categoryItems.length > 0">{{ c }}</template>
          <!-- {{ c }} -->
        </a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="商品标签" name="tags">
      <a-select
        mode="tags"
        placeholder="Please select"
        v-model:value="detailForm.tags"
      >
        <a-select-option value="包邮，最晚次日达">
          包邮，最晚次日达
        </a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 24 }">
      <a-button type="primary" @click="next">下一步</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { reactive, ref } from "vue";
import { Modal } from "ant-design-vue";
import { getCategory } from "@/api/category";

export default {
  props: ["detailForm"],
  setup(props, ctx) {
    const validateMessages = {
      required: "${label}不能为空！",
    };
    const formRef = ref();

    let categoryList = ref([]);
    let categoryItems = ref([]);
    let tempItems = [];

    //获取下拉框的类目选择
    getCategory().then((res) => {
      categoryList.value = res.data;
      tempItems = res.data.map((item) => {
        return {
          ...item.c_items,
        };
      });
    });

    const handleChange = (id) => {
      if (!id) {
        categoryItems.value = [];
      }
      for (let i = 0; i < tempItems.length; i++) {
        if (i === id - 1) {
          categoryItems.value = Object.values(tempItems[i]);
        }
      }
    };

    const next = () => {
      formRef.value
        .validateFields()
        .then(() => {
          ctx.emit("next", props.detailForm);
        })
        .catch(() => {
          Modal.warning({
            title: "温馨提示",
            content: "请正确填写商品基本信息...",
            closable: true,
            width: 400,
          });
        });
    };

    return {
      formRef,
      validateMessages,
      categoryList,
      categoryItems,
      next,
      handleChange,
    };
  },
};
</script>