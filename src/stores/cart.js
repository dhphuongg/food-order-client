import { addProduct } from '@/api/cart.api';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { useAuthStore } from './auth';
export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        productsInCart: JSON.parse(localStorage.getItem("hitfood-cart")) || [],
    }),
    getters: {
        items: (state) => state.productsInCart,
    },
    actions: {
        saveCart() {
            localStorage.setItem("hitfood-cart", JSON.stringify(this.productsInCart));
        },
        async getAllProducts() {
            this.saveCart();
        },
        async addItem(item, quantity) {
            let index = -1;
            index = this.productsInCart.findIndex(it => it.productId === item.productId);
            if (index === -1) {
                this.productsInCart.push({
                    productId: item.productId,
                    quantity: quantity,
                    detail: item
                })

            }
            else {
                let quantityToAdd = quantity + this.productsInCart[index].quantity;
                if (quantityToAdd < this.productsInCart[index].detail.productStock)
                    this.productsInCart[index].quantity = quantityToAdd;
                else {
                    this.productsInCart[index].quantity = this.productsInCart[index].detail.productStock;
                }
            }
            this.saveCart();
        },
        async updateItem(item, quantity) {
            let index = -1;
            index = this.items.findIndex(it => it.productId === item.productId);
            if (quantity < this.productsInCart[index].detail.productStock)
                this.productsInCart[index].quantity = quantity;
            else {
                this.productsInCart[index].quantity = this.productsInCart[index].detail.productStock;
            }
            this.saveCart();
        },
        async deleteItem(item) {
            this.productsInCart = this.productsInCart.filter(it => it.productId !== item.productId);
            this.saveCart();
        },
        async addItemsToDatabase() {
            const user = useAuthStore();
            const cartId = user.auth.customerId;
            await this.productsInCart.map(async (item) => {
                await addProduct(cartId, item)
            })
        },
        async clear() {
            this.productsInCart = [];
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
