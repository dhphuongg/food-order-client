<script setup>
defineProps({
  total: Number,
  currentIndex: Number,
  to: Function
});
</script>
<template>
  <ul class="custom-dots">
    <li
      class="custom-dots-li"
      v-for="index of total"
      :key="index"
      :class="{ ['is-active']: currentIndex === index - 1 }"
      @click="to(index - 1)"
    />
  </ul>
</template>
<style lang="scss" scoped>
.custom-dots {
  display: flex;
  margin: 0 auto;
  padding: 0;
  position: absolute;
  bottom: 70px;
  @media screen and (max-width: 379px) {
    bottom: 100px;
  }
  left: 40%;
  @include tablet {
    left: 35%;
  }
  @include small-tablet {
    left: 28%;
  }
  @include mobile {
    left: 10%;
  }
}

.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: #de731c7a;
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: #f06c25 !important;
}
</style>