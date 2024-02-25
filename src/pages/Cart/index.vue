<script setup>
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
    render(row) {
      return h('div', [
        h(NInputNumber, {
          style: {
            margin: '0 auto',
            width: '150px',
            textAlign: 'center'
          },
          value: row.quantity,
          min: 1,
          max: row.detail.productStock,
          onChange: async (value) => {
            try {
              await cartStore.updateItem(row, value);
            } catch (e) {
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
    render(row) {
      return h(
        'span',
        {
          style: {
            color: 'red'
          }
        },
        new Intl.NumberFormat().format(row.detail.productPrice * row.quantity) + 'đ'
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
          :data="cartStore.items"
        />
      </div>
      <div class="order-btn">
        <!-- <button @click="cartStore.addItemsToDatabase()">Lưu giỏ hàng</button> -->
      </div>
    </div>
  </div>
</template>
<style setup lang="scss">
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
  &:hover {
    background: #f06c25;
    transition: all ease 0.3s;
    color: white;
  }
}
.order-btn {
  text-align: right;
  margin-bottom: 220px;
}
</style>
<route lang="yaml">
    name: Cart
    meta: {requiresAuth: true}
    layout: default
</route>
    