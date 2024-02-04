<template>
  <div class="auth-layout">
    <div class="auth-card">
      <div @click="$router.back" class="close-form">
        <icon-x />
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../styles/mixins';
.auth-layout {
  background-color: #fff9e9;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  position: relative;
  .auth-card {
    margin-top: 30px;
    height: max-content;
    width: max-content;
    width: 360px;
    background-color: #ffffff;
    border-radius: 20px;
    position: relative;
    box-shadow: 0 0px 20px rgba(36, 39, 37, 0.3);
    padding: 30px 36px;
    margin-bottom: 18px;
    @include mobile() {
      margin: 0 20px;
      padding: 30px 20px;
    }
    .close-form {
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #926868;
      color: #ffffff;
      text-align: center;
      right: -10px;
      top: -10px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color 0.2s ease-in-out;
      &:hover {
        background-color: red;
      }
    }
  }
}
</style>
