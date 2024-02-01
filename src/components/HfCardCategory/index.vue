<script setup>
</script>
<template>
  <!-- <n-carousel :autoplay="true" :slides-per-view="3" :space-between="20" :loop="true" draggable :interval="1000">
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
    >

  </n-carousel> -->
  <div class="categoryItem" key="1">
    <div class="categoryImage">
      <img
        src="https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202312/MIT_Food-Diabetes-01_0.jpg?itok=Mp8FVJkC"
        alt=""
      />
    </div>
    <div class="categoryContent">
      <h4>Bánh</h4>
      <p>10 sản phẩm</p>
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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-weight: 700;
      text-transform: uppercase;
    }

    p {
      color: #808080;
      line-height: 5px;
      font-size: 13px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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