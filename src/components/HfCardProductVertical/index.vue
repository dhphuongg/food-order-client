<script setup>
defineProps({
  product: {
    type: Object,
    default(rawProps) {
      return {
        id: '',
        image: '',
        name: '',
        price: 0,
        description: ''
      };
    }
  }
});
</script>
<template>
  <router-link  v-if="product && product.id" :to="{ name: 'ProductDetail', params: { id: product.id } }">
    <div class="card">
      <div class="box">Đang hoạt động</div>
      <div class="imgProduct">
        <div>
          <img :src="product.image" alt="" />
        </div>
      </div>
      <div class="card-content">
        <div>
          <div class="card-content-nameproduct">
            <span>{{ product.name }}</span>
          </div>
          <p class="product-description">{{ product.description }}</p>
          <div class="productItem">
            <div style="display: flex, alignItems: center">
              <h3>{{ product.price }} VND</h3>
            </div>
            <div>
              <button class="orderBtn">
                <IconShoppingCartFilled color="#fff" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
<style scoped lang="scss">
.card {
  min-height: 486px;
  overflow: hidden;
  border: 1px solid #e5e5e5;
  border-radius: 30px !important;
  padding: 10px;
  background: #fff;
  font-family: gilroy, helveticaneue-light, helvetica neue light, helvetica neue, Helvetica, Arial,
    lucida grande, sans-serif;
  transition: all ease 0.35s;
  padding-bottom: 24px;
  max-width: 280px;
  margin: 40px 0 0;
}

.card {
  position: relative;

  .box {
    background-color: #00b14f;
    position: absolute;
    top: 10px;
    left: 0;
    color: #fff;
    padding: 8px 10px 10px;
    z-index: 5;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .imgProduct {
    position: relative;

    > div {
      width: 240px;
      height: 240px;
      border-radius: 50%;
      margin: 0 auto;
      transition: all ease 4s;
      overflow: hidden;
      padding-top: 24%;

      img {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        object-fit: cover;
        position: relative;
        z-index: 50;
        margin: 0 auto;
        z-index: 3;
        transition: all ease 2s;
        display: flex;

        @include mobile {
          position: absolute;
          top: 24%;
          left: 24%;
        }

        @include tablet {
          position: absolute;
          top: 24%;
          left: 21%;
        }
      }
    }

    &::after {
      content: '';
      width: 100%;
      height: 50%;
      border-radius: 20px;
      position: absolute;
      bottom: 0;
      left: 0;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: #ffc222;
      opacity: 0.1;
      transition: all ease 0.35s;
    }
  }

  .card-content {
    padding: 10px;
    margin-top: 16px;

    span {
      line-height: 36px;
      font-size: 24px;
      color: #1e1d23;
      font-weight: 500;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
        'Open Sans', 'Helvetica Neue', sans-serif;
      display: block;
    }

    p {
      color: #808080;
      margin: 0 0 15px 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
        'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 14px;
      height: 20px;
      overflow: hidden;
    }
  }

  .productItem {
    display: flex;
    width: 100%;
    align-items: center;
    margin: 0;
    justify-content: space-between;

    img {
      width: 20px;
      height: 20px;
    }

    h3 {
      font-size: 18px;
      font-weight: 600;
      margin: 0;
      margin-left: 8px;
      color: #00b14f;
    }
  }

  .card-icon {
    display: flex;

    img {
      margin-right: 4px;
      width: 14px;
    }
  }

  .orderBtn {
    border: none;
    transition: all linear 0.4s;
    padding: 10px 8px 10px 8px;
    height: 40px;
    width: 40px;
    text-align: center;
    border-radius: 16px;
    background-color: #00b14f;
    cursor: pointer;

    &:hover {
      background-color: #f06c25;
    }
  }

  &:hover {
    .imgProduct::after {
      opacity: 1;
      height: 100%;
    }

    .imgProduct img {
      transform: scale(1.2);
    }
  }
}

.card-content-nameproduct {
  display: flex;
  height: 80px !important;
  align-items: center;
}
</style>