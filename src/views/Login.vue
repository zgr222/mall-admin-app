<template>
  <div class="container">
    <a-form
      :model="user"
      name="normal_login"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="user.username">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="user.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <!-- <div class="login-form-wrap">
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="user.remember">Remember me</a-checkbox>
        </a-form-item>
        <a class="login-form-forgot" href="">Forgot password</a>
      </div> -->

      <a-form-item>
        <a-button
          :disabled="loading"
          type="primary"
          html-type="submit"
          class="login-form-button"
        >
          {{ loading ? "loading..." : "登录" }}
        </a-button>
      </a-form-item>
      <div class="register-forgot-item">
        <div>
          <a href="https://mallapi.duyiedu.com/login/#/register" target="_blank"
            >注册</a
          >
          |
          <a href="https://mallapi.duyiedu.com/login/#/login" target="_blank"
            >忘记密码</a
          >
        </div>
      </div>
    </a-form>
  </div>
</template>

<script>
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
export default {
  components: { UserOutlined, LockOutlined },
  setup() {
    const user = reactive({
      username: "",
      password: "",
      remember: "",
    });

    const router = useRouter();
    const store = useStore();

    let pass = computed(() => {
      return user.username !== "" && user.password !== "";
    });

    const handleSubmit = async () => {
      if (!pass.value) {
        alert("账号或密码不能存在空项");
        return;
      }
      const result = await store.dispatch("userLogin/login", {
        username: user.username,
        password: user.password,
      });

      if (!result) {
        alert("账号或密码错误");
        user.username = "";
        user.password = "";
      } else {
        router.push("/");
      }
    };
    return {
      user,
      handleSubmit,
      loading: computed(() => store.state.userLogin.loading),
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  background-color: aliceblue;
  width: 100vw;
  height: 100vh;
  display: flex;
  .login-form {
    max-width: 400px;
    margin: 100px auto;
  }
  .login-form-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      width: 250px;
    }
  }
  // .login-form-forgot {
  //   margin-bottom: 24px;
  // }
  .login-form-button {
    width: 100%;
  }
  .register-forgot-item {
    display: flex;
    flex-direction: row-reverse;
    div {
      margin-right: 10px;
      a {
        margin: 0 5px;
        &:hover {
          color: red;
        }
      }
    }
  }
}
</style>