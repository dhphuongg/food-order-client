<script setup>
import { getCategory } from '@/api/category.api';
const numberSlides = ref(6);
const listCategory = ref([]);

const updateNumberSlides = () => {
  const width = window.innerWidth;
  if (width < 420) {
    numberSlides.value = 1;
  } else if (width < 700) {
    numberSlides.value = 2;
  } else if (width < 870) {
    numberSlides.value = 3;
  } else if (width < 1200) {
    numberSlides.value = 4;
  } else {
    numberSlides.value = 6;
  }
};
onBeforeMount(async () => {
  await getCategories();
});
// Lắng nghe sự kiện resize của window
onMounted(() => {
  window.addEventListener('resize', updateNumberSlides);
});
// Hủy lắng nghe sự kiện resize khi component bị hủy
onUnmounted(() => {
  window.removeEventListener('resize', updateNumberSlides);
});

const getCategories = async () => {
  try {
    let res = await getCategory();
    if (res && res.data) {
      listCategory.value = res.data;
    }
  } catch (err) {
    console.log(err);
  }
};
</script>
<template>
  <div class="container category">
    <div class="wide pad40-0-60">
      <h1 class="category-title home-title">Danh mục sản phẩm</h1>
      <n-carousel
        class="carousel-category"
        autoplay
        show-arrow="true"
        :interval="3000"
        :space-between="20"
        :loop="true"
        :slides-per-view="numberSlides"
        draggable
      >
        <hf-card-category v-for="item in listCategory" :key="item.id" :category="item" />
      </n-carousel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>