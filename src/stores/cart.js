import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref, toRaw, watchEffect } from 'vue';

import { addProduct, getProductsInCart, updateProduct } from '@/api/cart.api';
import { useAuthStore } from './auth';
import { LocalStorage } from '@/constant/localStorage.constant';
import { getInfo } from '@/api/product.api';

export const useCartStore = defineStore('cart', () => {
  const authStore = useAuthStore();
  const products = ref(JSON.parse(localStorage.getItem(LocalStorage.cart)) || []);
  watchEffect(async () => {
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
  });
  async function updateCartAfterLogin() {
    let productsBeforeLogin = JSON.parse(localStorage.getItem(LocalStorage.cart)) || [];
    try {
      const res = await getProductsInCart(authStore.auth.customerId);
      if (res && res.data) {
        let products = res.data;
        productsBeforeLogin.map(async (item) => {
          if (products.some(it => it.productId === item.productId)) {
            await updateItem(item, item.quantity);
          }
          else await addItem(item, item.quantity)
        })
      }
    }
    catch (e) {
      console.log(e);
    }
  }
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
    // await addItemsToDatabase();
  }

  async function addItem(item, quantity) {
    console.log(item, quantity);
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

    if (authStore.loggedIn) {
      try {
        console.log(item, quantity);
        let res = await addProduct(authStore.auth.customerId, item, quantity);
        console.log("res add: ", res);
      } catch (e) {
        console.log(e);
      }
    }
    await saveCart();
  }
  async function updateItem(item, quantity) {
    console.log("update", item, quantity, products.value);
    let index = -1;
    index = products.value.findIndex((it) => it.productId === item.productId);
    if (quantity < products.value[index].detail.productStock)
      products.value[index].quantity = quantity;
    else {
      products.value[index].quantity = products.value[index].detail.productStock;
    }
    console.log(item, quantity);
    if (authStore.loggedIn) {
      try {
        let res = await updateProduct(authStore.auth.customerId, item, quantity);
      } catch (e) {
        console.log(e);
      }
    }
    saveCart();
  }
  async function deleteItem(item) {
    products.value = products.value.filter((it) => it.productId !== item.productId);
    if (authStore.loggedIn) {
      try {
        let res = await updateProduct(authStore.auth.customerId, item, 0);
      } catch (e) {
        console.log(e);
      }
    }
    saveCart();
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
  return { products, updateCartAfterLogin, saveCart, addItem, updateItem, deleteItem, addItemsToDatabase, clear };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}