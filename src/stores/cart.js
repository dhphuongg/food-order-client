import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref, watchEffect } from 'vue';

import { addProduct, getProductsInCart, updateProduct } from '@/api/cart.api';
import { useAuthStore } from './auth';
import { LocalStorage } from '@/constant/localStorage.constant';
import { getInfo } from '@/api/product.api';

export const useCartStore = defineStore('cart', () => {
  const authStore = useAuthStore();
  const products = ref(JSON.parse(localStorage.getItem(LocalStorage.cart)) || []);
  // watchEffect(async () => {
  //   if (authStore.loggedIn) {
  //     try {
  //       console.log(authStore.auth.customerId);
  //       const res = await getProductsInCart(authStore.auth.customerId);
  //       let dataProduct = res.data;
  //       const promises = dataProduct.map(async (item) => {
  //         try {
  //           let res = await getInfo(item.productId, item.shopId);
  //           if (res && res.data) {
  //             let detailItem = res.data;
  //             return {
  //               productId: detailItem.productId,
  //               quantity: item.quantity,
  //               detail: detailItem
  //             }
  //           }
  //         }
  //         catch (e) {
  //           console.log(e);
  //         }
  //       });
  //       const result = await Promise.all(promises);
  //       dataProduct = result;
  //       products.value = dataProduct;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   localStorage.setItem(LocalStorage.cart, JSON.stringify(products.value));
  // });
  async function saveCart() {
    if (authStore.loggedIn) {
      try {
        const res = await getProductsInCart(authStore.auth.customerId);
        let dataProduct = res.data;
        const promises = dataProduct.map(async (item) => {
          try {
            let res = await getInfo(item.productId, item.shopId);
            if (res && res.data) {
              let detailItem = res.data;
              return {
                productId: detailItem.productId,
                quantity: item.quantity,
                detail: detailItem
              }
            }
          }
          catch (e) {
            console.log(e);
          }
        });
        const result = await Promise.all(promises);
        dataProduct = result;
        products.value = dataProduct;
      } catch (error) {
        console.log(error);
      }
    }
    localStorage.setItem(LocalStorage.cart, JSON.stringify(products.value));
  }
  async function updateCartAfterLogin() {
    let productsBeforeLogin = JSON.parse(localStorage.getItem(LocalStorage.cart)) || [];
    try {
      const res = await getProductsInCart(authStore.auth.customerId);
      if (res && res.data) {
        let product = res.data;
        productsBeforeLogin.map(async (item) => {
          if (product.some(it => it.productId === item.productId)) {
            await updateItem(item, item.quantity);
          }
          else await addItem(item, item.quantity)
        })
        products.value = productsBeforeLogin;
      }
    }
    catch (e) {
      console.log(e);
    }
    localStorage.setItem(LocalStorage.cart, JSON.stringify(products.value));
  }

  async function addItem(item, quantity) {
    let index = -1;
    index = products.value.findIndex((it) => it.productId === item.productId);
    if (index === -1) {
      products.value.push({
        productId: item.productId,
        quantity: quantity,
        detail: item
      });
    } else {
      let quantityToAdd = quantity + products.value[index].quantity;
      if (quantityToAdd < products.value[index].detail.productStock)
        products.value[index].quantity = quantityToAdd;
      else {
        products.value[index].quantity = products.value[index].detail.productStock;
      }
    }
    localStorage.setItem(LocalStorage.cart, JSON.stringify(products.value));
    if (authStore.loggedIn) {
      try {
        let res = await addProduct(authStore.auth.customerId, item, quantity);
        console.log("res add: ", res);
      } catch (e) {
        console.log(e);
      }
    }
  }
  async function updateItem(item, quantity) {
    let index = -1;
    index = products.value.findIndex((it) => it.productId === item.productId);
    if (quantity < products.value[index].detail.productStock)
      products.value[index].quantity = quantity;
    else {
      products.value[index].quantity = products.value[index].detail.productStock;
    }
    localStorage.setItem(LocalStorage.cart, JSON.stringify(products.value));
    if (authStore.loggedIn) {
      try {
        let res = await updateProduct(authStore.auth.customerId, item, quantity);
      } catch (e) {
        console.log(e);
      }
    }
  }
  async function deleteItem(item) {
    products.value = products.value.filter((it) => it.productId !== item.productId);
    localStorage.setItem(LocalStorage.cart, JSON.stringify(products.value));
    if (authStore.loggedIn) {
      try {
        let res = await updateProduct(authStore.auth.customerId, item, 0);
      } catch (e) {
        console.log(e);
      }
    }
  }
  async function addItemsToDatabase() {
    if (authStore.loggedIn) {
      products.value.map(async (item) => {
        await addProduct(authStore.auth.customerId, item);
      });
    }
  }
  function clear() {
    products.value = [];
  }
  return { products, saveCart, updateCartAfterLogin, addItem, updateItem, deleteItem, addItemsToDatabase, clear };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}