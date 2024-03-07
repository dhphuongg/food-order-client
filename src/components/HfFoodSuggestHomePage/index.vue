<script setup>
import { getAllProduct } from '@/api/product.api';
const numberSlides = ref(4);
const listProduct = ref([]);
const updateNumberSlides = () => {
  const width = window.innerWidth;
  if (width < 700) {
    numberSlides.value = 1;
  } else if (width < 870) {
    numberSlides.value = 2;
  } else if (width < 1200) {
    numberSlides.value = 3;
  } else {
    numberSlides.value = 4;
  }
};
onMounted(() => {
  window.addEventListener('resize', updateNumberSlides);
});
onUnmounted(() => {
  window.removeEventListener('resize', updateNumberSlides);
});

onBeforeMount(async () => {
  updateNumberSlides();
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
        show-arrow
        show-dots
        :interval="3000"
        :space-between="20"
        loop
        :slides-per-view="numberSlides"
        draggable
      >
        <hf-card-product-vertical v-for="item in listProduct" :key="item.productId" :product="item" />
        <template #dots="{ total, currentIndex, to }">
          <hf-custom-dots :total="total" :currentIndex="currentIndex" @to="to"></hf-custom-dots>
        </template>
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
  > div {
    padding-bottom: 0 !important;
  }
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
.custom-dots {
  bottom: 180px;
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
    bottom: 160px;
  }
}
</style>