import { api } from "./index";
import { ApiConstant } from "@/constant/api.constant";

const orderAPI = () => ({
    getOrderedProducts: async (customerId) => api.get(`${ApiConstant.order.history}/${customerId}`),
    getCustomerBills: async (customerId) => api.get(`${ApiConstant.order.myorder}/${customerId}`),
    cancelOrder: async (billId) => api.put(`${ApiConstant.order.cancel}/${billId}`),
    getPlaceOrder: async (customerId) => api.get(`${ApiConstant.customer}/${customerId}/bill`),
    postBuyProducts: async (customerId, billId) => api.post(`${ApiConstant.customer}/${customerId}/bill/${billId}`)
})

export const { getOrderedProducts, getCustomerBills, cancelOrder, getPlaceOrder, postBuyProducts } = orderAPI();