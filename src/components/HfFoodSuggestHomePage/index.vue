<script setup>
import { getAllProduct } from '@/api/product.api';
import router from "@/router"
const loading = ref(false);
const listProduct = ref([]);
onBeforeMount(() => {
  getProducts();
});
const getProducts = async () => {
  loading.value = true;
  try {
    let res = await getAllProduct();
    if (res && res.data) {
      listProduct.value = res.data.items;
      loading.value = false;
    }
  } catch (err) {
    console.log(err);
  }
};
const handleClickShowProduct = (id) => {
  router.push(`/productdetail/${id}`);
};
</script>
<template>
  <div class="container food-suggest">
    <div class="wide pad40-0-60">
      <h1 class="home-title">Gợi ý món ăn</h1>
      <n-carousel
        class="carousel-category"
        autoplay="true"
        show-arrow="true"
        interval="3000"
        :space-between="20"
        :loop="true"
        :slides-per-view="4"
        draggable
      >
        <hf-card-product-vertical
          @click="handleClickShowProduct(item.id)"
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