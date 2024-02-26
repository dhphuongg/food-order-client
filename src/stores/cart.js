import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref, watchEffect } from 'vue';

import { addProduct, getProductsInCart } from '@/api/cart.api';
import { useAuthStore } from './auth';
import { LocalStorage } from '@/constant/localStorage.constant';

export const useCartStore = defineStore('cart', () => {
  const authStore = useAuthStore();

  const products = ref(JSON.parse(localStorage.getItem(LocalStorage.cart)) || []);
  watchEffect(async () => {
    if (authStore.loggedIn) {
      try {
        const res = await getProductsInCart(authStore.auth.customerId);
        products.value = res.data;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  });

  async function saveCart() {
    localStorage.setItem(LocalStorage.cart, JSON.stringify(products.value));
    await addItemsToDatabase();
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
    await saveCart();
  }
  function updateItem(item, quantity) {
    let index = -1;
    index = products.value.findIndex((it) => it.productId === item.productId);
    if (quantity < products.value[index].detail.productStock)
      products.value[index].quantity = quantity;
    else {
      products.value[index].quantity = products.value[index].detail.productStock;
    }
    saveCart();
  }
  function deleteItem(item) {
    products.value = products.value.filter((it) => it.productId !== item.productId);
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
  return { products, saveCart, addItem, updateItem, deleteItem, addItemsToDatabase, clear };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
