<script setup>
import { getCustomerBills, getPlaceOrder, postBuyProducts } from '@/api/order.api';
import { getUserById } from '@/api/user.api';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { onBeforeMount, ref } from 'vue';

let currentUserLogin = ref({});
const authStore = useAuthStore();
const cartStore = useCartStore();
const message = useMessage();
const router = useRouter();

let dataBill = ref({});
onBeforeMount(async () => {
  try {
    let res = await getUserById(authStore.auth.customerId);
    if (res && res.data) {
      currentUserLogin.value = res.data;
    }
    let resBill = await getPlaceOrder(authStore.auth.customerId);
    if (resBill && resBill.data) {
      dataBill.value = resBill.data[0];
    }
  } catch (e) {
    console.log(e);
  }
});
const handlePlaceOrder = async () => {
  try {
    let res = await getPlaceOrder(authStore.auth.customerId);
    if (res && res.data) {
      let resBuy = await postBuyProducts(authStore.auth.customerId, res.data[0].billId);
      if (resBuy.status === 'SUCCESS') {
        message.success(resBuy.data.message);
        cartStore.clear();
        router.push('/');
      }
    }
  } catch (e) {
    console.log(e);
  }
};
</script>
<template>
  <div class="order order-container">
    <div>
      <div class="order-infor">
        <div class="order-infor-user">
          <div class="order-infor-user-title">
            <h3>THÔNG TIN NHẬN HÀNG</h3>
          </div>
          <div class="order-infor-user-form">
            <div class="form-item">
              <div>
                <label htmlFor="">Họ tên người nhận <span>*</span></label> <br />
                <input type="text" :value="currentUserLogin.fullName" />
              </div>
            </div>
            <div class="form-item">
              <div>
                <label htmlFor="">Số điện thoại <span>*</span></label> <br />
                <input type="text" :value="currentUserLogin.phoneNumber" />
              </div>
            </div>
            <div class="form-item">
              <div>
                <label htmlFor="">Gmail <span>*</span></label> <br />
                <input type="text" :value="currentUserLogin.email ?? ''" />
              </div>
            </div>
            <div class="form-item">
              <div>
                <label htmlFor="">Địa chỉ cụ thể <span>*</span></label> <br />
                <input type="text" :value="currentUserLogin?.address?.addressName" />
              </div>
            </div>
          </div>
        </div>
        <div class="order-infor-products">
          <div class="order-infor-products-title">
            <h3>SẢN PHẨM BẠN ĐẶT</h3>
          </div>
          <div class="order-infor-products-form">
            <table>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Tổng giá</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cartStore.products" :key="item.productId">
                  <td class="products-name">
                    {{ item.detail.productName }}
                    <span class="attention">x {{ item.quantity }}</span>
                  </td>
                  <td>{{ item.detail.productPrice * item.quantity }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="order-pay">
        <div class="order-pay-title">
          <h3>THANH TOÁN</h3>
        </div>
        <div class="order-pay-infor">
          <table>
            <thead>
              <tr>
                <th>Tổng tiền hàng:</th>
                <td>
                  {{ parseInt(dataBill?.payment - dataBill?.feeShip).toLocaleString('vi-VN') }}đ
                </td>
              </tr>
              <tr>
                <th>Phí vận chuyển:</th>
                <td>{{ parseInt(dataBill?.feeShip).toLocaleString('vi-VN') }}đ</td>
              </tr>
              <tr>
                <th>Thời gian giao dự kiến:</th>
                <td>{{ new Date(dataBill?.timeShip).toLocaleString() }}</td>
              </tr>
              <tr>
                <th>Khoảng cách :</th>
                <td>{{ parseInt(dataBill?.distance).toLocaleString('vi-VN') }}km</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="{2}">
                  <hr />
                </td>
              </tr>
              <tr>
                <th>Tổng tiền:</th>
                <th class="pay-money">
                  {{ parseInt(dataBill?.payment).toLocaleString('vi-VN') }}đ
                </th>
              </tr>
              <tr>
                <td colSpan="2">
                  <div>
                    <button class="order-btn" @click="handlePlaceOrder">XÁC NHẬN MUA HÀNG</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
body {
  background-color: white;
}

.order-container {
  display: flex;
  justify-content: center;

  > div {
    width: 1200px;
    padding: 100px 0;

    @include tablet() {
      width: 80%;
    }
    @include mobile() {
      width: 90%;
      margin: 0 auto;
    }
  }
}

.order {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  margin-bottom: 40px;

  &-infor {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;

    &-user,
    &-products {
      width: 48%;
      background-color: white;
      box-shadow: 0 0px 20px rgba(36, 39, 37, 0.1);
      border-radius: 0.625rem;
      position: relative;

      &-title {
        display: block;
        background-color: #f06c25 !important;
        height: 48px;

        h3 {
          line-height: 48px !important;
          margin-left: 16px;
          color: white;
          font-weight: 500;
          font-size: 20px;
        }
      }

      &-form {
        background-color: white;
        padding: 0 0 40px;
        border-radius: 0.625rem;
      }

      .form-item {
        margin: 10px 20px 20px;

        span {
          color: red;
        }

        label {
          color: #808080;
          font-size: 15.5px;
        }

        input {
          width: 96%;
          padding: 8px;
          margin-top: 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 5px;

          &::placeholder {
            color: #0000007f;
          }
        }

        &-group {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }

      .attention {
        color: #00a149;
        font-weight: 700;
        text-transform: lowercase;
        font-size: 20px;
      }

      table {
        width: 100%;
        text-align: center;
      }

      td,
      th {
        width: 65%;
        padding: 16px 0;
        border-bottom: 1px solid #ccc;
      }
    }

    @include mobile() {
      flex-direction: column;

      &-user,
      &-products {
        width: 100%;
        margin: 30px auto;
      }
    }
  }

  &-pay {
    margin-top: 40px;
    background-color: white;
    box-shadow: 0 0px 20px rgba(36, 39, 37, 0.1);
    border-radius: 0.625rem;
    position: relative;

    &-title {
      display: block;
      background-color: #f06c25 !important;
      height: 48px;

      h3 {
        line-height: 48px !important;
        margin-left: 16px;
        color: white;
        font-weight: 500;
        font-size: 20px;
      }
    }

    &-infor {
      padding: 20px 40px 40px 10px;

      table {
        width: 100%;
        @include mobile() {
          width: 200px;
        }
        text-align: left;
      }

      th,
      td {
        padding: 12px 0;
      }

      td {
        text-align: right;
      }

      th {
        padding-left: 24px;
        @include mobile() {
          padding: 0;
        }
      }

      hr {
        margin-left: 20px;
      }

      div {
        margin-top: 24px;
        display: flex;
        justify-content: end;
      }

      button {
        transition: all ease 0.5s;
        background-color: #f06c25;
        padding: 10px 20px;
        color: white;
        border-radius: 10px;
        border: none;
        font-size: 16px;

        &:hover {
          background-color: #00a149;
          cursor: pointer;
        }
      }

      .pay-money {
        color: #00a149;
        text-align: right;
        font-size: 28px;
      }
    }
  }

  @include mobile() {
    &-pay {
      width: 100%;
      margin: 30px auto 0;

      th,
      td {
        font-size: 16px;
        // text-align: left;
      }

      &-title {
        width: 100%;
      }

      hr {
        width: 94%;
        margin-right: 24px;
      }

      th {
        white-space: nowrap;
      }

      .pay-money {
        font-size: 17px;
      }
    }
  }
}
</style>
<route lang="yaml">
    name: Order
    meta:
      layout: default
      requiresAuth: true
    </route>
    