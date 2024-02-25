<script setup>
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
const user = useAuthStore();
const cartStore = useCartStore();

const customerId = ref(-1);
onBeforeMount(async () => {
    if (!(typeof user.auth.customerId === 'undefined') || !(typeof user.auth.customerName === 'undefined')) {
        customerId.value = user.auth.customerId;
        await cartStore.getAllProducts(customerId.value);
    }
})
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
