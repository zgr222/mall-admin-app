<template>
  <div class="register-container">
    <a-form
      :model="formState"
      name="register"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 7 }"
      autocomplete="off"
      class="form-container"
    >
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item
        label="Email"
        name="email"
        :rules="[{ required: true, message: 'Please input your email!' }]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item
        label="验证码"
        name="code"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-group compact>
          <a-input
            v-model:value="formState.code"
            style="width: calc(100% - 180px)"
          />
          <a-button type="primary" @click="getCode">获取验证码</a-button>
        </a-input-group>
      </a-form-item>

      <a-form-item
        label="角色"
        name="role"
        :rules="[{ required: true, message: 'Please select your role!' }]"
      >
        <a-radio-group v-model:value="formState.role" :options="plainOptions" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 9, span: 16 }" class="btn-item">
        <a-button type="default">
          <router-link :to="{ name: 'Login' }">返回</router-link>
        </a-button>
        <a-button type="primary" html-type="submit" @click="handleSubmit"
          >提交</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive } from "vue";
import * as userApi from "@/api/user";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const formState = reactive({
      email: "",
      password: "",
      username: "",
      code: "",
      role: "customer",
    });
    const plainOptions = ["customer", "admin"];
    const router = useRouter();

    const getCode = () => {
      console.log(formState.email);
      userApi
        .getCode(formState.email)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const handleSubmit = () => {
      console.log(formState);
      userApi
        .register(formState)
        .then((res) => {
          message.success("注册成功", 1.5, () => {
            console.log(res);
            router.push("/login");
          });
        })
        .catch((err) => {
          message.error(`注册失败${err}`, 1.5);
        });
    };

    return {
      formState,
      plainOptions,
      handleSubmit,
      getCode,
    };
  },
});
</script>

<style lang="less" scoped>
.register-container {
  width: 100vw;
  height: 100vh;
  background-color: rgb(204, 226, 161);
  position: absolute;
  .form-container {
    margin: 100px auto;
    .btn-item {
      button {
        margin: 0 10px;
      }
    }
  }
}
</style>