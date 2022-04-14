<template>
  <div class="product-add-container">
    <a-steps :current="current" class="step-container">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <ProductDetail
        v-if="current === 0"
        @next="next"
        :detailForm="data.detailForm"
      />
      <SaleDetail
        v-else-if="current === 1"
        @prev="prev"
        :detailForm="data.detailForm"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script>
import ProductDetail from "@/components/ProductDetail.vue";
import SaleDetail from "@/components/SaleDetail.vue";
import { ref, reactive, watch } from "vue";
import { message } from "ant-design-vue";
import * as productApi from "@/api/product";
import { useRouter, useRoute } from "vue-router";

const container = document.querySelector(".step-container");
message.config({
  top: "100px",
  getContainer: container,
});

export default {
  components: { ProductDetail, SaleDetail },
  setup() {
    let data = reactive({
      detailForm: {
        title: "",
        desc: "",
        category: "",
        c_item: [],
        tags: [],
        price: "",
        price_off: "",
        inventory: "",
        unit: "",
        status: true,
        images: [],
      },
    });
    const current = ref(0);
    const router = useRouter();
    const route = useRoute();

    const next = (formVal) => {
      current.value++;
      data.detailForm = {
        ...data.detailForm,
        ...formVal,
      };
    };

    const prev = () => {
      current.value--;
    };

    // 判断是否是编辑商品
    if (route.params.id) {
      productApi
        .getProductById(route.params.id)
        .then((res) => {
          data.detailForm = res;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // 处理添加商品
    const handleSubmit = (formData) => {
      if (route.params.id) {
        productApi
          .editProduct(data.detailForm)
          .then((res) => {
            message.success(`商品修改成功`, 1.5, () => {
              router.push({ name: "ProductList" });
            });
          })
          .catch((err) => {
            message.error(`商品修改失败,${err}`);
          });
      } else {
        productApi
          .addProduct(formData)
          .then((res) => {
            message.success(`商品已添加`, 1.5, () => {
              router.push({ name: "ProductList" });
            });
          })
          .catch((err) => {
            message.error(`商品添加失败,${err}`);
          });
      }
    };

    return {
      message,
      current,
      steps: [{ title: "填写商品基本信息" }, { title: "填写商品销售信息" }],
      next,
      prev,
      data,
      handleSubmit,
    };
  },
};
</script>

<style scoped lang="less">
.product-add-container {
  .step-container {
    width: 50%;
    margin: 20px auto;
  }

  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }

  [data-theme="dark"] .steps-content {
    background-color: #2f2f2f;
    border: 1px dashed #404040;
  }
}
</style>