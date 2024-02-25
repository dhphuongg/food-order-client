<script setup>
import { IconTrash } from '@tabler/icons-vue';
import { useCartStore } from '@/stores/cart.js';
import { useAuthStore } from '@/stores/auth.js';
import router from '@/router';

const cartStore = useCartStore();
const user = useAuthStore();
const message = useMessage();
const customerId = ref(-1);
onBeforeMount(async () => {
  if (
    !(typeof user.auth.customerId === 'undefined') ||
    !(typeof user.auth.customerName === 'undefined')
  ) {
    customerId.value = user.auth.customerId;
    await cartStore.getAllProducts(customerId.value);
  }
  console.log(customerId.value);
});
const columns = ref([
  {
    title: 'Xóa',
    key: 'actions',
    align: 'center',
    render(row) {
      return h(IconTrash, {
        onClick: () => {
          cartStore.deleteItem(customerId.value, row);
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
        src: row.productImageUrl,
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
            router.push(`/productdetail/${row.productId}/${row.shopId}`);
          }
        },
        row.productName
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
        row.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
      );
    }
  },
  {
    title: 'Số lượng',
    key: 'quantity',
    align: 'center',
    render(row, index) {
      return h('div', [
        h(
          'button',
          {
            onClick: () => cartStore.removeItem(customerId.value, row)
          },
          '-'
        ),
        h(
          'span',
          {
            style: {
              margin: '0 20px',
              border: 'none',
              width: '40px',
              textAlign: 'center',
              backgroundColor: 'transparent'
            }
          },
          row.quantity
        ),
        h(
          'button',
          {
            onClick: () => {
              console.log('id: ', customerId.value);
              cartStore.addItem(customerId.value, row);
            }
          },
          '+'
        )
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
        (row.price * row.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
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
  margin-bottom: 200px;
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
</style>
<route lang="yaml">
    name: Cart
    meta: {requiresAuth: true}
    layout: default
</route>
    