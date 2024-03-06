<script setup>
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { onMounted } from 'vue';
const cartStore = useCartStore();
const authStore = useAuthStore();
onMounted(async () => {
  if (authStore.loggedIn) {
    await cartStore.updateCartAfterLogin();
  } 
  else await cartStore.saveCart();
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
