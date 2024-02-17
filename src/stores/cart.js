import { defineStore, acceptHMRUpdate } from 'pinia';
import { getProductsInCart, addProduct, removeProduct } from "@/api/cart.api"
export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        productsInCart: [],
        idCart: -1,
        quantityCart: 0
    }),
    getters: {
        items: (state) => state.productsInCart.data,
        id: (state) => state.idCart,
        quantity: (state) => state.quantityCart
    },
    actions: {
        async getAllProducts(cartId) {
            try {
                this.productsInCart = await getProductsInCart(cartId)
                if (this.productsInCart.data && this.productsInCart.data.length > 0) {
                    this.idCart = this.productsInCart.data[0].cartId
                    this.quantityCart = this.productsInCart.data.length
                }
            } catch (e) {
                console.log(e);
            }
        },
        async addItem(item) {
            try {
                let res = await addProduct(this.id, item, 1);
                if (res && res.data) {
                    const cartStore = useCartStore();
                    cartStore.getAllProducts(this.id);
                }
            } catch (e) {
                console.log(e);
            }
        },
        async removeItem(item) {
            try {
                let res = await removeProduct(this.id, item, item.quantity - 1);
                if (res && res.data) {
                    const cartStore = useCartStore();
                    cartStore.getAllProducts(this.id);
                }
            } catch (e) {
                console.log(e);
            }
        },
        async deleteItem(item) {
            try {
                let res = await removeProduct(this.id, item, 0);
                if (res && res.data) {
                    const cartStore = useCartStore();
                    cartStore.getAllProducts(this.id);
                }
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
