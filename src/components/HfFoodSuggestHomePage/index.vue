<script setup>
import { getAllProduct } from '@/api/product.api';
const listProduct = ref([]);
onBeforeMount(async () => {
  await getProducts();
});
const getProducts = async () => {
  try {
    let res = await getAllProduct();
    if (res && res.data) {
      listProduct.value = res.data.items;
    }
  } catch (err) {
    console.log(err);
  }
};
</script>
<template>
  <div class="container food-suggest">
    <div class="wide pad40-0-60">
      <h1 class="home-title">Gợi ý món ăn</h1>
      <n-carousel
        class="carousel-category"
        autoplay
        show-arrow="true"
        :interval="3000"
        :space-between="20"
        :loop="true"
        :slides-per-view="4"
        draggable
      >
        <hf-card-product-vertical
          v-for="item in listProduct"
          :key="item.id"
          :product="item"
        />
      </n-carousel>
      <div class="suggest-showmore">
        <HfButton class="btn-showmore">Xem thêm</HfButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.food-suggest {
  width: 100vw;
  background-image: url('@/assets/images/suggest-image1.png');

  .home-title {
    text-align: center;
  }

  .suggest-showmore {
    display: flex;
    justify-content: center;
  }

  .btn-showmore {
    margin: 60px 0 0;
    padding: 20px 36px;
    background-color: $secondary-color;

    &:hover {
      background-color: $primary-color;
    }
  }
}
</style>