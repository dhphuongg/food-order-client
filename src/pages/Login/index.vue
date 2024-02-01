<script setup>
import { authApi } from '@/api/auth.api';
const { login } = authApi;
</script>

<template>
  <h1>login</h1>
  <form action="">
    <div>
      <label for="">Email: </label>
      <input type="text" />
    </div>
    <div>
      <label for="">Password: </label>
      <input type="text" />
    </div>
    <button>Login</button>
  </form>
</template>

<style scoped lang="scss"></style>

<route lang="yaml">
name: Login
meta:
  layout: auth
</route>
