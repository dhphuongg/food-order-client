<script setup>
import { forgotPassword } from '@/api/auth.api';
import { validateEmail } from '@/utils/validator';

const message = useMessage();
const router = useRouter();

const loading = ref(false);
const account = reactive({
  username: null,
  email: null
});
const formRef = ref(null);
const rules = {
  username: {
    required: true,
    message: 'Vui lòng nhập tên người dùng!',
    trigger: 'blur'
  },
  email: {
    required: true,
    validator: validateEmail,
    trigger: 'blur'
  }
};

const forgotPasswordHandler = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;
      try {
        await forgotPassword(account);
        message.success(
          'Chúng tôi đã tạo mật khẩu mới cho tài khoản của bạn. Hãy kiểm tra Email và dùng nó để đăng nhập'
        );
        router.push('/login');
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
  <div class="forgot-password">
    <n-form class="forgot-password-form" :model="account" :rules="rules" ref="formRef">
      <h2>Quên mật khẩu</h2>
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
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item class="form-item" path="email" label="Địa chỉ Email">
        <n-input
          :theme-overrides="{
            border: '0'
          }"
          class="form-input"
          v-model:value="account.email"
          size="large"
          placeholder=""
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-button
        attr-type="submit"
        block
        :bordered="false"
        text-color="white"
        icon-placement="left"
        size="large"
        :loading="loading"
        @click="forgotPasswordHandler"
      >
        Gửi mật khẩu mới
      </n-button>
    </n-form>
  </div>
</template>

<style scoped lang="scss">
.forgot-password {
  .forgot-password-form {
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
}
</style>

<route lang="yaml">
name: ForgotPassword
meta:
  layout: auth
</route>
