<script setup>
import { IconTrash } from '@tabler/icons-vue';
const data = reactive([
  {
    key: 0,
    image:
      'https://www.shutterstock.com/image-photo/banh-mi-vietnamese-word-bread-600nw-1954013653.jpg',
    name: 'John Brown',
    price: 32,
    quantity: 1
  },
  {
    key: 1,
    image:
      'https://www.shutterstock.com/image-photo/banh-mi-vietnamese-word-bread-600nw-1954013653.jpg',
    name: 'Jim Green',
    price: 42,
    quantity: 1
  },
  {
    key: 2,
    image:
      'https://www.shutterstock.com/image-photo/banh-mi-vietnamese-word-bread-600nw-1954013653.jpg',
    name: 'Joe Black',
    price: 32,
    quantity: 2
  }
]);
const columns = reactive([
  {
    title: 'Xóa',
    key: 'actions',
    align: 'center',
    render(row) {
      return h(IconTrash, {
        onClick: () => console.log(row)
      });
    }
  },
  {
    title: 'Ảnh',
    key: 'image',
    align: 'center',
    render(row) {
      return h('img', {
        src: row.image,
        style: {
          width: '70px',
          height: '50px'
        },
        onClick: () => console.log(row)
      });
    }
  },
  {
    title: 'Tên sản phẩm',
    key: 'name',
    align: 'center',
    render(row) {
      return h(
        'span',
        {
          style: {
            color: 'green'
          }
        },
        row.name
      );
    }
  },
  {
    title: 'Giá',
    key: 'price',
    align: 'center'
  },
  {
    title: 'Số lượng',
    key: 'quantity',
    align: 'center',
    render(row) {
      return h('div', [
        h(
          'button',
          {
            onClick: () => console.log('Decrease')
          },
          '-'
        ),
        h('input', {
          style: {
            border: 'none',
            width: '40px',
            textAlign: 'center'
          },
          type: 'text',
          value: row.quantity
        }),
        h(
          'button',
          {
            onClick: () => console.log('Increase')
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
        row.price * row.quantity + ' đ'
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
          :data="data"
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
    meta:
      layout: default
</route>
    