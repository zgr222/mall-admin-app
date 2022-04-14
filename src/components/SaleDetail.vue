<template>
  <a-form
    ref="formRef"
    :model="detailForm"
    :labelCol="{ span: 7 }"
    :wrapperCol="{ span: 12 }"
    :validate-messages="validateMessages"
  >
    <a-form-item label="商品售价" name="price" :rules="[{ required: true }]">
      <a-input v-model:value="detailForm.price" />
    </a-form-item>
    <a-form-item label="折扣价格" name="price_off">
      <a-input v-model:value="detailForm.price_off" />
    </a-form-item>
    <a-form-item
      label="商品库存"
      name="inventory"
      :rules="[{ required: true }]"
    >
      <a-input v-model:value="detailForm.inventory" />
    </a-form-item>
    <a-form-item label="计量单位" name="unit" :rules="[{ required: true }]">
      <a-input v-model:value="detailForm.unit" />
    </a-form-item>
    <a-form-item label="上架状态" name="status" style="text-align: start">
      <a-checkbox v-model:checked="isUp">是否上架</a-checkbox>
    </a-form-item>
    <a-form-item label="商品相册" name="images" style="text-align: start">
      <a-upload
        v-model:file-list="fileListForm"
        :action="
          'http://mallapi.duyiedu.com/upload/images?appkey=' +
          $store.state.userLogin.user.appkey
        "
        list-type="picture-card"
        @preview="handlePreview"
        @change="handleChange"
        name="avatar"
      >
        <div v-if="fileListForm.length < 8">
          <plus-outlined />
          <div style="margin-top: 8px">Upload</div>
        </div>
      </a-upload>
      <a-modal
        :visible="previewVisible"
        :title="previewTitle"
        :footer="null"
        @cancel="handleCancel"
      >
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 24 }">
      <a-button type="default" @click="prev" style="margin: 0 10px"
        >上一步</a-button
      >
      <a-button type="primary" @click="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
import { computed, ref } from "vue";
import { Modal } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
export default {
  components: { PlusOutlined },
  props: ["detailForm"],
  setup(props, ctx) {
    const validateMessages = {
      required: "${label}不能为空！",
    };
    const formRef = ref();
    const isUp = ref(true);
    if (props.detailForm.status === 1) {
      isUp.value = true;
    } else if (props.detailForm.status === 0) {
      isUp.value = false;
    }

    const prev = () => {
      ctx.emit("prev");
    };

    const previewVisible = ref(false);
    const previewImage = ref("");
    const previewTitle = ref("");
    let fileListForm = ref([]);

    if (props.detailForm.images.length > 0) {
      fileListForm = props.detailForm.images.map((item, index) => ({
        uid: index,
        name: `image-${index}.png`,
        status: "done",
        url: item,
      }));
    }

    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
      previewTitle.value =
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
    };

    const handleCancel = () => {
      previewVisible.value = false;
      previewTitle.value = "";
    };

    const handleChange = ({ file, fileList }) => {
      if (file.status === "done") {
        props.detailForm.images.push(file.response.data.url);
      } else if (file.status === "removed") {
        const url = file.response.data.url;
        props.detailForm.images = props.detailForm.images.filter(
          (it) => it !== url
        );
      }
      fileListForm.value = fileList;
    };

    const submit = () => {
      formRef.value
        .validateFields()
        .then(() => {
          ctx.emit("submit", props.detailForm);
        })
        .catch(() => {
          Modal.warning({
            title: "温馨提示",
            content: "请正确填写商品销售信息...",
            closable: true,
            width: 400,
          });
        });
    };

    return {
      formRef,
      validateMessages,
      submit,
      prev,
      fileListForm,
      previewVisible,
      previewImage,
      previewTitle,
      handlePreview,
      handleCancel,
      handleChange,
      isUp,
    };
  },
};
</script>