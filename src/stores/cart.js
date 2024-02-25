import { defineStore, acceptHMRUpdate } from 'pinia';
import { getProductsInCart, addProduct, removeProduct } from "@/api/cart.api"
export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        productsInCart: [],
        quantityCart: 0
    }),
    getters: {
        items: (state) => state.productsInCart.data,
        quantity: (state) => state.quantityCart
    },
    actions: {
        async getAllProducts(cartId) {
            try {
                this.productsInCart = await getProductsInCart(cartId)
                if (this.productsInCart.data && this.productsInCart.data.length > 0) {
                    this.quantityCart = this.productsInCart.data.length
                }
            } catch (e) {
                console.log(e);
            }
        },
        async addItem(cartId, item) {
            try {
                console.log(cartId);
                let res = await addProduct(cartId, item, 1);
                // if (res && res.data) {
                //     await this.getAllProducts(cartId);
                // }
            } catch (e) {
                console.log(e);
            }
        },
        async removeItem(cartId, item) {
            try {
                let res = await removeProduct(cartId, item, item.quantity - 1);
                // if (res && res.data) {
                //     await this.getAllProducts(cartId);
                // }
            } catch (e) {
                console.log(e);
            }
        },
        async deleteItem(cartId, item) {
            try {
                let res = await removeProduct(cartId, item, 0);
                // if (res && res.data) {
                //     await this.getAllProducts(cartId);
                // }
            } catch (e) {
                console.log(e);
            }
        },
        async clear() {
            this.quantityCart = 0;
            this.productsInCart = [];
            this.id = -1;
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
