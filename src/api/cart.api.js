import { api } from "./index";
import { ApiConstant } from "@/constant/api.constant";

const cartApi = () => ({
    getProductsInCart: async (id) =>
        api.get(`${ApiConstant.cart}/${id}`),
    addProduct: async (id, product) =>
        api.post(`${ApiConstant.cart}/${id}/products`, null, {
            params: {
                productId: product.productId,
                quality: product.quantity,
                shopId: product.detail.shopId
            }
        }),
    updateProduct: async (id, product, quantity) =>
        api.put(`${ApiConstant.cart}/${id}/products/${product.productId}`, null, {
            params: {
                quantity: quantity,
                shopId: product.shopId
            }
        })
});
export const { getProductsInCart, addProduct, updateProduct } = cartApi();
