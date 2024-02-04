<script setup>
import { login } from '@/api/auth.api';
import { useAuthStore } from '@/stores/auth';
import { validateUsername, validatePassword } from '@/utils/validator';

const message = useMessage();
const authStore = useAuthStore();
const router = useRouter();

const loading = ref(false);
const account = reactive({
  username: null,
  password: null
});
const formRef = ref(null);
const rules = {
  username: {
    required: true,
    validator: validateUsername,
    trigger: 'blur'
  },
  password: {
    required: true,
    validator: validatePassword,
    trigger: 'blur'
  }
};

const loginHandler = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;
      try {
        const { data } = await login(account);
        authStore.save(data.data);
        message.success('Đăng nhập thành công. Xin chào <b>' + account.username + '</b>');
        if (data.data.authorities[0].authority === 'ROLE_USER') router.push('/');
        else router.push('/admin');
      } catch (err) {
        if (!!err.response) {
          message.error(err.response.data.message);
        } else {
          message.error(err.message);
        }
      }
      loading.value = false;
    }
  });
};
</script>

<template>
  <div class="login">
    <n-form class="login-form" :model="account" :rules="rules" ref="formRef">
      <h2>Đăng nhập</h2>
      <n-form-item class="form-item" path="username" label="Tên người dùng">
        <n-input
          :theme-overrides="{
            border: '0'
          }"
          class="form-input"
          v-model:value="account.username"
          size="large"
          placeholder=""
          type="text"
        />
      </n-form-item>
      <n-form-item class="form-item" path="password" label="Mật khẩu">
        <n-input
          :theme-overrides="{
            border: '0'
          }"
          class="form-input"
          v-model:value="account.password"
          size="large"
          placeholder=""
          type="password"
          show-password-on="click"
        />
      </n-form-item>
      <div class="forgot-password">
        <router-link to="/forgot-password">Quên mật khẩu?</router-link>
      </div>
      <n-button
        attr-type="submit"
        block
        :bordered="false"
        text-color="white"
        icon-placement="left"
        size="large"
        :loading="loading"
        @click="loginHandler"
      >
        Đăng nhập
      </n-button>
    </n-form>
    <div class="register">
      Bạn chưa có tài khoản?
      <router-link to="/register">Đăng ký</router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  .login-form {
    h2 {
      font-size: 32px;
      text-align: center !important;
      font-weight: 500;
      margin: 0;
      margin-bottom: 0px;
      margin-top: 20px;
      // font-family: $gilroyFont;
      line-height: 30px;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .form-item {
      position: relative;
      margin-top: 30px;
      .form-input {
        border-bottom: 1px solid black;
      }
    }
    .forgot-password {
      text-align: right;
      a {
        &:hover {
          color: #fd8f52;
        }
      }
    }
  }
  button {
    background: linear-gradient(to bottom right, #fd8f52, #ffb056);
    padding: 25px 0;
    font-size: 16px;
    border-radius: 8px;
    width: 90%;
    margin: 0 auto;
    margin-top: 32px;
    &:hover {
      opacity: 0.8;
      border: 0;
      box-shadow: none;
    }
  }
  .register {
    margin-top: 35px;
    text-align: center;
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    color: #a9a9a9;
    padding-bottom: 18px;
    a {
      color: #fd8f52;
      &:hover {
        color: #04aa6d;
      }
    }
  }
}
</style>

<route lang="yaml">
name: Login
meta:
  layout: auth
</route>
