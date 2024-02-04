<script setup>
import { getInfo } from '@/api/product.api';
import { useRoute, useRouter } from 'vue-router';
import { getAllProduct } from '@/api/product.api';
const loading = ref(false);
const listProduct = ref([]);
const route = useRoute();
const router = useRouter();
const productInfo = ref({});
const handleGetProductInfo = async () => {
  try {
    const id = route?.params?.id;
    let res = await getInfo(id);
    if (res) {
      productInfo.value = res.data;
    }
  } catch (err) {
    console.log(err);
  }
};
onBeforeMount(() => {
  handleGetProductInfo();
  getProducts();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
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
watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (newId !== oldId) {
      await handleGetProductInfo();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
);
</script>
<template>
  <div class="detail detail-container">
    <div>
      <div class="detail-product">
        <div class="detail-product-image">
          <img :src="productInfo.image" alt="" />
        </div>
        <div class="detail-product-infor">
          <h3>{{ productInfo.name }}</h3>
          <span class="product-rating"><IconStarFilled color="#ffc222" /></span>
          <span class="product-rating"><IconStarFilled color="#ffc222" /></span>
          <span class="product-rating"><IconStarFilled color="#ffc222" /></span>
          <span class="product-rating"><IconStarFilled color="#ffc222" /></span>
          <span class="product-rating"><IconStarFilled color="#ffc222" /></span>
          <br />
          <span class="shop-address">{{ productInfo.description }}</span> <br />
          <div class="detail-product-infor-price">
            <span>{{ productInfo.price }} VND</span>
          </div>
          <hr />
          <div class="detail-product-infor-number">
            <div>
              <span>Số lượng</span>
              <div class="detail-product-infor-number-change">
                <button>-</button>
                <input value="1" />
                <button>+</button>
              </div>
            </div>
          </div>
          <hr />
          <br />
          <div class="detail-product-add">
            <button class="detail-product-add-to-cart">Thêm vào giỏ hàng</button>
            <button class="detail-product-add-to-buy">Đặt hàng</button>
          </div>
          <br />
          <hr />
          <div>
            <ul>
              <li>Nguyên liệu làm món ăn cam kết là nguyên liệu sạch</li>
              <li>Giao hàng nhanh</li>
              <li>Nếu sản phẩm bị lỗi, cửa hàng sẽ hoàn tiền</li>
            </ul>
          </div>
          <hr />
          <div class="detail-share">
            <p>Danh mục: <span>Bún</span></p>
            <p class="btn-group-icons">
              Chia sẻ
              <button class="btn-icon">
                <IconBrandFacebookFilled color="blue" />
              </button>
              <button class="btn-icon">
                <IconBrandInstagram color="red" />
              </button>
            </p>
          </div>
        </div>
      </div>
      <div class="detail-description">
        <div>
          <div class="title-description">Mô Tả</div>
          <p>
            <br />
            Bún tôm, một món ăn truyền thống của miền Nam Việt Nam, được biết đến với sự tươi ngon
            và hương vị độc đáo. Sợi bún mềm mịn, kết hợp với tôm tươi ngon, tạo nên một món ăn hấp
            dẫn và đậm đà. Tôm là nhân vật chính trong món bún tôm. Tôm tươi được chế biến thành
            những miếng nhỏ, thêm vào bát bún tạo nên sự phong phú về hương vị. Vị ngọt tự nhiên của
            tôm hòa quyện với vị chua, mặn và ngọt của nước mắm, tạo nên một hương vị độc đáo và hấp
            dẫn. Bên cạnh đó, món bún tôm còn kèm theo các nguyên liệu khác như rau sống tươi mát,
            hành phi giòn thơm và các loại gia vị như ớt, tỏi, và nước mắm chua ngọt. Tất cả các
            thành phần này tạo nên sự cân đối và hài hòa về hương vị trong món ăn. Khi thưởng thức
            món bún tôm, bạn sẽ cảm nhận được sự tươi mát và đậm đà của hương vị. Sợi bún mềm mịn
            kết hợp với tôm tươi ngon, rau sống tươi mát và hành phi giòn thơm tạo nên một trải
            nghiệm ẩm thực tuyệt vời và đáng nhớ.
            <br />
            Mỳ trộn full topping, một món ăn đường phố phổ biến và thú vị, đang làm mưa làm gió
            trong thế giới ẩm thực hiện nay. Mỳ trắng mềm mịn được trộn đều với các loại topping đa
            dạng, tạo nên một sự kết hợp hài hòa giữa vị ngọt, mặn, chua và cay. Khi bạn nhìn vào mỳ
            trộn full topping, bạn sẽ ngạc nhiên bởi sự phong phú của các loại topping đa dạng. Từ
            thịt gà nướng mềm mịn, xúc xích thơm ngon, đậu phụ chiên giòn, đến rau sống tươi mát,
            hành phi giòn thơm và chấm nước mắm chua ngọt, tất cả được trộn đều với mỳ tạo nên một
            tác phẩm ẩm thực đẹp mắt và hấp dẫn. Khi bạn thưởng thức mỳ trộn full topping, mỗi miếng
            mỳ mềm mịn sẽ mang đến một trải nghiệm đa vị tuyệt vời. Vị ngọt tự nhiên của thịt gà, vị
            thơm của xúc xích, vị giòn của đậu phụ
          </p>
          <br />

          <div class="embed-responsive aspect-video">
            <iframe
              src="https://www.youtube.com/embed/I_n1IQggIQ4"
              width="300px"
              height="600px"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              title="video"
            />
          </div>
        </div>
      </div>
      <hr />
      <div class="detail-similar">
        <n-carousel
          class="carousel-category"
          autoplay="true"
          show-arrow="true"
          interval="3000"
          :space-between="20"
          :loop="true"
          :slides-per-view="4"
          transition-style="{duration: '1000ms'}"
          draggable
        >
          <hf-card-product-vertical
            @click="handleClickShowProduct(item.id)"
            v-for="item in listProduct"
            :key="item.id"
            :product="item"
          />
        </n-carousel>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.detail-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 100px;
}

.detail {
  > div {
    width: 1200px;

    h1 {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
        'Open Sans', 'Helvetica Neue', sans-serif !important;
    }
    .detail-similar {
      margin-bottom: 60px;
    }
  }
}

.detail-product {
  display: flex;
  font-size: 16px;
  margin: 0 auto;
  margin: 60px 0;
  gap: 60px;
  background-color: #fff;

  @include tablet {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @include small-tablet {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @include mobile {
    width: 100%;
    padding: 0 10px;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
  }

  .numberOfProd {
    color: #000;
  }

  &-image {
    width: 610px;
    border-radius: 20px;
    overflow: hidden;

    @include tablet {
      width: 80%;
      height: 500px;
    }
    @include small-tablet {
      width: 80%;
      height: 400px;
    }

    @include mobile {
      width: 100%;
      margin: 0 auto;
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-infor {
    width: auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;

    .shop-address {
      font-size: 14px;
      color: #808080;
      line-height: 60px;
    }

    .product-rating {
      padding: 50px 0;
      width: 14px;
    }

    & h3 {
      font-size: gilroy, helveticaneue-light, helvetica neue light, helvetica neue, Helvetica, Arial,
        lucida grande, sans-serif;
      color: #1e1d23;
      font-size: 42px;
      line-height: 60px;
      text-align: center;
      font-weight: 500;
      text-align: left;
      line-height: 40px;
      margin: 0 0 16px;
      @include small-tablet {
        font-size: 35px;
      }
      @include mobile {
        font-size: 30px;
        line-height: 30px;
      }
    }

    & span {
      color: #000;
    }

    &-number {
      > div {
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: left;
        padding: 15px 0;

        &-change {
          align-items: center;
          justify-content: center;
        }
      }

      button {
        border: none;
        background-color: #f2f2f2;
        border-radius: 50%;
        width: 30px !important;
        height: 30px !important;
        text-align: center;
        padding: 0;
      }

      input {
        border: 1px solid rgb(165, 163, 163);
        width: 30px;
        height: 30px;
        font-size: 15px;
        background-color: #fff;
        border: none;
        outline: none;
        text-align: center;
        margin: 0 8px;
      }
    }

    &-price {
      font-size: 24px;
      line-height: 40px;

      span {
        color: #ffc222 !important;
        font-weight: 600;
        font-family: gilroy, helveticaneue-light, helvetica neue light, helvetica neue, Helvetica,
          Arial, lucida grande, sans-serif;
      }
    }
  }

  hr {
    border-bottom: #ccc;
  }

  &-add {
    display: flex;
    gap: 16px;
    transition: all ease 1s;

    @include mobile {
      flex-direction: column;
      gap: 20px;
    }

    &-to-cart {
      padding: 15px 20px;
      background-color: #00b14f;
      border-radius: 10px;
      color: white;
      border: none;
      font-size: 16px;
      font-family: 'Roboto', sans-serif;
      cursor: pointer;

      @include mobile {
        width: 100%;
      }
    }

    &-to-buy {
      padding: 15px 20px;
      background-color: #f06c25;
      border-radius: 10px;
      color: white;
      border: none;
      font-size: 16px;
      font-family: 'Roboto', sans-serif;
      cursor: pointer;

      @include mobile {
        width: 100%;
      }
    }

    button:hover {
      opacity: 0.8;
    }
  }
}

li {
  color: #808080;
  font-size: 15px;
  line-height: 30px;
}

.detail-share {
  p {
    font-size: 14px;
    color: #808080;
  }

  span {
    font-weight: 600;
  }

  button {
    background-color: #fff;
    padding: 0;
    margin: 0 0 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      i {
        color: #f06c25;
      }
    }
  }
  .btn-group-icons {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  .btn-icon {
    border: none;
  }
}

.detail-description {
  > div {
    width: 100%;
    margin: 0 auto;

    .title-description {
      background-color: #ffc222;
      align-items: center;
      display: flex;
      justify-content: center;
      width: 200px;
    }

    > div {
      padding: 10px 36px;
      margin: 0 auto 24px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
        'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 24px;
      font-weight: 700;
      border-radius: 8px;
      color: #1e1d23;
    }

    p {
      color: #808080;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
        'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 32px;
      padding: 0 20px;
    }
  }
}

@include mobile {
  .detail {
    > div {
      width: 360px;
      margin: 0 auto;

      .detail-description {
        margin: 0 auto;

        > div {
          width: 100%;
        }

        p {
          white-space: break-spaces !important;
        }
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .detail {
    > div {
      width: 90%;
      margin: 0 auto;
    }
  }
}

@include tablet {
  .detail {
    > div {
      .detail-description {
        margin: 0 auto;

        > div {
          width: 100%;
        }

        p {
          white-space: break-spaces !important;
        }
      }

      .detail-similar {
        width: 100%;
        overflow: hidden;
      }

      .card {
        width: 94%;

        &-main {
          margin-top: 20px;
          display: flex;
          width: 95%;
          flex-wrap: wrap;
          margin-left: 50px;
          gap: 20px;

          @include tablet {
            margin-left: 20px;
            justify-content: center;
            gap: 40px;
          }

          @include mobile {
            gap: 20px;
            margin-left: 40px;
          }
        }
      }
    }
  }
}

.aspect-video {
  display: flex;
  justify-content: center;
  width: 100%;
}

hr {
  margin: 15px 0;
}

ul {
  margin-left: 30px;
}

iframe {
  width: 80%;
  height: 500px !important;

  @include tablet {
    width: 100% !important;
    height: 400px !important;
  }

  @include mobile {
    width: 100% !important;
    height: 300px !important;
  }
}
</style>

<route lang="yaml">
    name: ProductDetail
    meta:
</route>