<template>
  <div className="cart-container cart">
    <div>
      <h1>Giỏ Hàng</h1>
      <div className="cart-table">
        <table cellPadding="12px 16px" cellSpacing="0">
          <thead>
            <tr>
              <th>Xóa</th>
              <th>Ảnh</th>
              <th>Sản Phẩm</th>
              <th>Giá</th>
              <th>Số Lượng</th>
              <th>Thành Tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr key="">
              <td>
                <button><IconTrash /></button>
              </td>
              <td>
                <img
                  src="https://www.shutterstock.com/image-photo/banh-mi-vietnamese-word-bread-600nw-1954013653.jpg"
                  alt=""
                />
              </td>
              <td className="cart-product-name">Bánh mỳ</td>
              <td>50000 đ</td>
              <td className="cart-items-quantity">
                <button>-</button>
                <input type="text" value="1" />
                <button>+</button>
              </td>
              <td className="cart-product-price">100000 đ</td>
            </tr>
            <tr key="">
              <td>
                <button><IconTrash /></button>
              </td>
              <td>
                <img
                  src="https://www.shutterstock.com/image-photo/banh-mi-vietnamese-word-bread-600nw-1954013653.jpg"
                  alt=""
                />
              </td>
              <td className="cart-product-name">Bánh mỳ</td>
              <td>50000 đ</td>
              <td className="cart-items-quantity">
                <button>-</button>
                <input type="text" value="1" />
                <button>+</button>
              </td>
              <td className="cart-product-price">100000 đ</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="cart-pay">
        <hr />
        <div>
          <p>Tổng tiền: <span>100000 đ</span></p>
          <div><button>Thanh toán</button></div>
        </div>
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

.cart-table {
  width: 1200px;
  height: 400px;
  overflow: scroll;
  padding-bottom: 40px;

  table {
    width: 100%;
    text-align: center;
    border: 1px solid #f1f1f1;

    th,
    td {
      padding: 10px 0;
      white-space: nowrap;
      font-size: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
        'Open Sans', 'Helvetica Neue', sans-serif;
      border-bottom: 1px solid #f2f2f2;
    }

    img {
      width: 60px;
      height: 50px;
      object-fit: cover;
    }

    th {
      border-bottom: 2px solid #f06c25;
      font-weight: 500;
    }

    input {
      width: 40px;
      padding: 8px;
      text-align: center;
      font-size: 16px;
      border: none;
    }

    .cart-product-name {
      color: #00b14f;
      font-size: 16px;
    }

    button {
      background-color: white;
      color: black;

      &:hover {
        background-color: orangered;
        transition: all 0.2s;
        color: white;
        border-radius: 50%;
        i {
          color: white;
        }
      }

      i {
        transition: all ease 0.25s;
        font-size: 14px;
        color: black;
      }
    }

    .cart-product-price {
      color: red;
    }
  }

  hr {
    margin-top: 60px;
  }
}

.cart-table::-webkit-scrollbar {
  width: 4px;
  height: 6px;
}

.cart-table::-webkit-scrollbar-track {
  border: none;
}

.cart-table::-webkit-scrollbar-thumb {
  background-color: #00b14f;
}

.cart-pay {
  position: fixed;
  background-color: #fff;
  bottom: 0;
  // padding: 30px 0;
  right: 0;
  left: 0;
  height: 160px;

  hr {
    width: 100%;
    border: 1px solid #f2f2f2;
  }

  p {
    // width: 1080px;
    text-align: right;
    display: block;
    margin: 24px auto;
    font-size: 21px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  span {
    margin-left: 40px;
    color: red;
    font-size: 24px;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  > div {
    width: 1150px;
    margin: 0 auto;

    > div {
      display: flex;
      justify-content: end;
      width: 100%;
    }
  }
}

@include mobile {
  h1 {
    text-align: center !important;
  }

  .cart-table {
    width: 80%;
    margin: 0 auto;
  }

  .cart-pay {
    height: 150px;

    div {
      width: 80%;
      margin: 0 auto;

      > div {
        justify-content: center;
      }
    }
  }
}
@include small-tablet {
  h1 {
    text-align: center !important;
  }

  .cart-table {
    width: 80%;
    margin: 0 auto;
  }

  .cart-pay {
    height: 150px;

    div {
      width: 80%;
      margin: 0 auto;

      > div {
        justify-content: center;
      }
    }
  }
}
@include tablet {
  h1 {
    text-align: center !important;
  }

  .cart-table {
    width: 80%;
    margin: 0 auto;
  }

  .cart-pay {
    height: 200px;

    hr {
      width: 100%;
    }

    div {
      width: 80%;
      margin: 0 auto;

      > div {
        justify-content: end;
      }
    }
  }
}

/* .cart-items-quantity {
  display: flex;
  justify-content: center;
} */
button {
  padding: 12px 16px;
  background-color: #f06c25;
  border: none;
  border-radius: 5px;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  cursor: pointer;
}
</style>
<route lang="yaml">
    name: Cart
    meta:
      layout: default
</route>
    