<script setup>
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
const cartStore = useCartStore();
const authStore = useAuthStore();
onBeforeMount(async () => {
  if (authStore.loggedIn) {
    await cartStore.updateCartAfterLogin();
  }
  await cartStore.saveCart();
});
</script>
<template>
  <div class="main">
    <HfSearchBannerHomePage />
    <HfCategoryHomePage />
    <HfHotDogdBannerHomePage />
    <HfFoodSuggestHomePage />
    <HfPopularFoodHomePage />
    <HfOurCommitmentHomePage />
  </div>
</template>

<style scoped lang="scss">
.main {
  margin-top: $header-height;
}
</style>

<route lang="yaml">
name: Home
meta:
  layout: default
</route>
