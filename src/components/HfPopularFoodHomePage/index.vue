<script setup>
import { getAllProduct } from '@/api/product.api';
import router from '@/router';
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
      listProduct.value = res.data.items.slice(0, 6).reverse();
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
  <div class="container popular-food">
    <div class="wide pad40-0-60">
      <!-- Title -->
      <h1 class="home-title">Món ăn phổ biến</h1>

      <!-- List popular food -->
      <div class="list-foods">
        <hf-card-product-horizontal
          @click="handleClickShowProduct(item.id)"
          v-for="item in listProduct"
          :key="item.id"
          :product="item"
        />
      </div>

      <!-- Cofirm popular -->
      <div class="popular-confirm">
        <img src="@/assets/images/popular-image1.png" alt="" />
        <div class="confirm-info">
          <h1 class="h1-logo">HitFood</h1>
          <h1 class="h1-confirm">LÀM ĐÚNG. LÀM NGON. DÀNH RIÊNG CHO BẠN.</h1>
          <HfButton class="btn-order">ORDER NOW</HfButton>
        </div>
      </div>
    </div>
  </div>
  <div class="popular-images">
    <div><img src="@/assets/images/popular-image3.jpg" alt="" /></div>
    <div><img src="@/assets/images/popular-image4.jpg" alt="" /></div>
    <div><img src="@/assets/images/popular-image5.jpg" alt="" /></div>
    <div><img src="@/assets/images/popular-image6.jpg" alt="" /></div>
  </div>
</template>

<style lang="scss" scoped src="./hfPopularFoodHomePage.scss"></style>