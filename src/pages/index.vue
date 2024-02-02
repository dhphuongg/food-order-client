<script setup></script>
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
