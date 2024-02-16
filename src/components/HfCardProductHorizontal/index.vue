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
        address: ''
      };
    }
  }
});
</script>
<template>
  <div class="horizontal-card">
    <div>
      <div class="horizontal-card-img">
        <img :src="product.productImageUrl" alt="" />
      </div>
      <div class="horizontal-card-content">
        <div>
          <router-link
            class="custom-center"
            v-if="product && product.productId"
            :to="{ name: 'ProductDetail', params: { id: product.productId, shopId: product.shopId } }"
          >
            <span>{{ product.productName }}</span>
          </router-link>
          <div class="card-icon">
            <IconStarFilled color="#ffc222" size="15" />
            <IconStarFilled color="#ffc222" size="15" />
            <IconStarFilled color="#ffc222" size="15" />
            <IconStarFilled color="#ffc222" size="15" />
            <IconStarFilled color="#ffc222" size="15" />
          </div>
          <p>{{ product.categoryName }}</p>
          <h5>{{ product.productPrice }} VND</h5>
        </div>
        <div>
          <button class="orderBtn">
            <IconShoppingCartFilled color="#fff" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.horizontal-card {
  cursor: pointer;
  width: 48.5%;
  padding: 10px;
  border-radius: 30px;
  border: 1px solid #e5e5e5;
  margin-top: 30px;
  min-height: 180px;
  z-index: 5;
  @include mobile {
    width: 100%;
    margin: 16px auto;
  }
  @include small-tablet {
    width: 100%;
    margin: 16px auto;
  }

  @include tablet {
    width: 47%;
    margin: 16px 0;
  }

  > div {
    transition: all ease 0.8s;
    position: relative;
    background-color: #fff8e8;
    border-radius: 20px;
    padding: 10px 16px;
    display: flex;
    @include mobile {
      flex-direction: column;
    }
    align-items: center;
    min-height: 180px;
  }

  &-img {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      transition: all ease 1s;
    }

    @include mobile {
      width: 100px !important;
      height: 85px;
      border-radius: 50%;

      img {
        width: 100%;
        transition: all ease 1s;
      }
    }
    @include tablet {
      width: 200px !important;
      height: 100px;
      border-radius: 50%;

      img {
        width: 120%;
        transition: all ease 1s;
      }
    }
  }

  &-content {
    padding: 24px 0px 24px 16px;

    .card-icon {
      display: flex;
      margin: 28px 0 0;

      img {
        margin-right: 4px;
        width: 12px;
      }
    }

    p {
      color: #808080;
      font-size: 14px;
      // line-height: 2;
      margin: 16px 0 22px;
      font-weight: 300;
    }

    span {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
        'Open Sans', 'Helvetica Neue', sans-serif;
      margin: 0;
      color: #1e1d23;
      line-height: 0;
      text-decoration: none !important;
      font-weight: 700;
      font-size: 20px;
      line-height: 30px;

      &:hover {
        color: #f06c25;
      }
    }

    h5 {
      font-size: 15px;
      color: #ffc222;
      font-family: gilroy, helveticaneue-light, helvetica neue light, helvetica neue, Helvetica,
        Arial, lucida grande, sans-serif;
      margin: 0;
      line-height: 0;
      font-weight: 700;

      &:hover {
        color: #f06c25;
      }
    }

    .orderBtn {
      position: absolute;
      bottom: 10%;
      right: 3%;
      border: none;
      cursor: pointer;
      .icon-tabler {
        font-size: 18px;
      }

      transition: all linear 0.4s;
      padding: 10px 8px 10px 8px;
      height: 40px;
      width: 40px;
      text-align: center;
      border-radius: 16px;
      background-color: #ffc222;

      &:hover {
        background-color: #f06c25;
      }
      @include mobile {
        bottom: 10px !important;
      }
    }
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }
}
.custom-center {
  display: flex;
  justify-content: center;
}
</style>