<script setup>
defineProps({
  category: {
    type: Object,
    default(rawProps) {
      return {
        image: '',
        name: '',
        quantity: 0
      };
    }
  }
});
</script>
<template>
  <div class="categoryItem" key="1">
    <div class="categoryImage">
      <img :src="category.image" alt="" />
    </div>
    <div class="categoryContent">
      <h4>{{ category.name }}</h4>
      <p>{{ category.quantity }} sản phẩm</p>
    </div>
  </div>
</template>
<style lang="scss">
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
.categoryItem {
  width: 170px;
  background-color: #fff9e9;
  border-radius: 30px;
  padding: 50px 0 20px;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  transition: all 0.4s;
  cursor: pointer;

  .categoryImage {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #fff;
    margin: 0 auto;
    padding-top: 12%;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      transition: all 0.4s;
      display: block;
      margin: 0 auto;
    }
  }

  .categoryContent {
    padding: 20px 0;

    h4 {
      font-size: 14px;
      color: #1e1d23;
      line-height: 30px;
      opacity: 0.95;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
        'Open Sans', 'Helvetica Neue', sans-serif;
      font-weight: 700;
      text-transform: uppercase;
    }

    p {
      color: #808080;
      line-height: 5px;
      font-size: 13px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
        'Open Sans', 'Helvetica Neue', sans-serif;
    }
  }

  &:hover {
    background-color: #ffc222;

    img {
      transform: scale(1.4);
    }
  }
}
</style>