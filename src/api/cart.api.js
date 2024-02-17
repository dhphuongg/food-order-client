import { api } from "./index";
import { ApiConstant } from "@/constant/api.constant";

const cartApi = () => ({
    getProductsInCart: async (id) =>
        api.get(`${ApiConstant.cart}/${id}`),
    addProduct: async (id, product, quantity) =>
        api.post(`${ApiConstant.cart}/${id}/products?productId=${product.productId}&quality=${quantity}&shopId=${product.shopId}`),
    removeProduct: async (id, product, quantity) =>
        api.put(`${ApiConstant.cart}/${id}/products/${product.productId}?&quantity=${quantity}&shopId=${product.shopId}`)
});
export const { getProductsInCart, addProduct, removeProduct } = cartApi();
