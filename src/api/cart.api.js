import { api } from "./index";
import { ApiConstant } from "@/constant/api.constant";

const cartApi = () => ({
    getProductsInCart: async (id) =>
        api.get(`${ApiConstant.cart}/${id}`),
    addProduct: async (id, product, quantity) =>
        api.post(`${ApiConstant.cart}/${id}/products`, null, {
            params: {
                productId: product.productId,
                quality: quantity,
                shopId: product?.detail?.shopId ?? product.shopId
            }
        }),
    updateProduct: async (id, product, quantity) =>
        api.put(`${ApiConstant.cart}/${id}/products/${product.productId}`, null, {
            params: {
                quantity: quantity,
                shopId: product.detail.shopId
            }
        })
});
export const { getProductsInCart, addProduct, updateProduct } = cartApi();
