<script setup>
import { toRaw } from 'vue';
import { IconTrash } from '@tabler/icons-vue';
import { useCartStore } from '@/stores/cart.js';
import router from '@/router';
import { NInputNumber, useMessage } from 'naive-ui';

const cartStore = useCartStore();
const message = useMessage();

const columns = ref([
  {
    title: 'Xóa',
    key: 'actions',
    align: 'center',
    render(row) {
      return h(IconTrash, {
        onClick: async () => {
          await cartStore.deleteItem(row);
          message.success('Xóa sản phẩm thành công');
        }
      });
    }
  },
  {
    title: 'Ảnh',
    key: 'productImage',
    align: 'center',
    render(row) {
      return h('img', {
        src: row.detail.productImageUrl,
        style: {
          width: '70px',
          height: '50px',
          cursor: 'pointer'
        },
        onClick: () => console.log(row)
      });
    }
  },
  {
    title: 'Tên sản phẩm',
    key: 'productName',
    align: 'center',
    render(row) {
      return h(
        'span',
        {
          style: {
            color: 'green',
            cursor: 'pointer'
          },
          onClick: () => {
            router.push(`/productdetail/${row.productId}/${row.detail.shopId}`);
          }
        },
        row.detail.productName
      );
    }
  },
  {
    title: 'Giá',
    key: 'productId',
    align: 'center',
    render(row) {
      return h(
        'span',
        {
          style: {
            color: 'red',
            cursor: 'pointer'
          }
        },
        new Intl.NumberFormat().format(row.detail.productPrice) + 'đ'
      );
    }
  },
  {
    title: 'Số lượng',
    key: 'quantity',
    align: 'center',
    render(row, index) {
      return h('div', [
        h(NInputNumber, {
          style: {
            margin: '0 auto',
            width: '150px',
            textAlign: 'center'
          },
          value: cartStore.products[index].quantity,
          min: 1,
          max: row.detail.productStock,
          onUpdateValue: async (value) => {
            console.log(row);
            try {
              console.log('row', row, value);
              await cartStore.updateItem(row, value);
            } catch (e) {
              console.log(e);
              message.error('Có lỗi khi cập nhật số lượng');
            }
          }
        })
      ]);
    }
  },
  {
    title: 'Thành tiền',
    key: 'address',
    align: 'center',
    render(row, index) {
      return h(
        'span',
        {
          style: {
            color: 'red'
          }
        },
        new Intl.NumberFormat().format(
          row.detail.productPrice * cartStore.products[index].quantity
        ) + 'đ'
      );
    }
  }
]);
</script>

<template>
  <div class="cart-container cart">
    <div>
      <h1>Giỏ Hàng</h1>
      <div>
        <n-data-table
          class="table-cart"
          :bordered="false"
          :single-line="false"
          :columns="columns"
          :data="toRaw(cartStore.products)"
        />
      </div>
      <div class="order-btn" v-if="cartStore.products.length > 0">
        <button><router-link to="/order">Đặt hàng</router-link></button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.cart-container {
  display: flex;
  justify-content: center;
}

.cart {
  > div {
    width: 1200px;
    overflow: hidden;
    margin-top: 100px;

    h1 {
      color: #1e1d23;
      line-height: 60px;
      font-weight: 500;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
        'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 35px;
      text-align: left;
      margin-bottom: 30px;
      margin-top: 30px;
      text-align: center;
    }
  }
}
.table-cart {
  margin-bottom: 50px;
}
button {
  padding: 12px 16px;
  border: none;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  cursor: pointer;
  background: #f06c25;
  color: white;

  &:hover {
    opacity: 0.9;
    transition: all ease 0.3s;
  }
}
.order-btn {
  a {
    color: white;
  }
  text-align: right;
  margin-bottom: 250px;
  button {
    &:hover {
      background-color: green;
    }
  }
}
.order-btn {
  text-align: right;
  margin-bottom: 220px;
}
</style>
<route lang="yaml">
    name: Cart
    layout: default
</route>
    