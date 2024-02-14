<script setup>
import { useGeolocation } from '@vueuse/core';

import { register, login } from '@/api/auth.api';
import { useAuthStore } from '@/stores/auth';
import { validateUsername, validateEmail, validatePassword } from '@/utils/validator';

const message = useMessage();
const authStore = useAuthStore();
const router = useRouter();

const { coords } = useGeolocation();
const loading = ref(false);
const formValue = reactive({
  username: null,
  email: null,
  password: null,
  repeatPassword: null
});
const formRef = ref(null);
const rules = {
  username: {
    required: true,
    validator: validateUsername,
    trigger: 'blur'
  },
  email: {
    required: true,
    validator: validateEmail,
    trigger: 'blur'
  },
  password: {
    required: true,
    validator: validatePassword,
    trigger: 'blur'
  },
  repeatPassword: {
    required: true,
    validator: (_, repeatPassword) => {
      if (repeatPassword !== formValue.password) {
        return new Error('Mật khẩu không giống với mật khẩu đã nhập lại!');
      }
      return true;
    },
    trigger: ['blur', 'password-input']
  }
};

const registerHandler = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;
      try {
        await register({
          ...formValue,
          latitude: coords.value.latitude,
          longitude: coords.value.longitude
        });
        const { data } = await login(formValue);
        authStore.save(data.data);
        message.success('Đăng ký tài khoản thành công. Xin chào ' + formValue.username);
        router.push('/');
      } catch (err) {
        console.log(err);
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
  <div class="register">
    <n-form class="register-form" :model="formValue" :rules="rules" ref="formRef">
      <h2>Đăng ký</h2>
      <n-form-item class="form-item" path="username" label="Tên người dùng">
        <n-input :theme-overrides="{
          border: '0'
        }" class="form-input" v-model:value="formValue.username" size="large" placeholder="" type="text" />
      </n-form-item>
      <n-form-item class="form-item" path="email" label="Địa chỉ email">
        <n-input :theme-overrides="{
          border: '0'
        }" class="form-input" v-model:value="formValue.email" size="large" placeholder="" type="text" />
      </n-form-item>
      <n-form-item class="form-item" path="password" label="Mật khẩu">
        <n-input :theme-overrides="{
          border: '0'
        }" class="form-input" v-model:value="formValue.password" size="large" placeholder="" type="password"
          show-password-on="click" />
      </n-form-item>
      <n-form-item class="form-item" path="repeatPassword" label="Xác nhận mật khẩu">
        <n-input :theme-overrides="{
          border: '0'
        }" class="form-input" v-model:value="formValue.repeatPassword" size="large" placeholder="" type="password"
          show-password-on="click" />
      </n-form-item>
      <n-button attr-type="submit" block :bordered="false" text-color="white" icon-placement="left" size="large"
        :loading="loading" @click="registerHandler">
        Đăng ký
      </n-button>
    </n-form>
    <div class="register">
      Bạn đã có tài khoản?
      <router-link to="/login">Đăng nhập</router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.register {
  .register-form {
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
      margin-top: 20px;

      .form-input {
        border-bottom: 1px solid black;
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
name: Register
meta:
  layout: auth
</route>
