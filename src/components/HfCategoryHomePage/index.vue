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
  updateNumberSlides();
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
  <div class="container">
    <div class="wide pad40-0-60 category">
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
        <template #dots="{ total, currentIndex, to }">
          <ul class="custom-dots">
            <li
              v-for="index of total"
              :key="index"
              :class="{ ['is-active']: currentIndex === index - 1 }"
              @click="to(index - 1)"
            />
          </ul>
        </template>
      </n-carousel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.category {
  margin-bottom: 60px;
}
.custom-dots {
  display: flex;
  margin: 0 auto;
  padding: 0;
  position: absolute;
  bottom: 70px;
  left: 0;
  @media screen and (max-width: 379px) {
    bottom: 100px;
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
  background: #f06c25;
}
</style>