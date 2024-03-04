import { apiDefault, api } from "./index";
import { ApiConstant } from "@/constant/api.constant";

const orderAPI = () => ({
    getOrderedProducts: async (customerId) => api.get(`${ApiConstant.order.history}/${customerId}`),
    getPlacedOrders: async (customerId) => api.get(`${ApiConstant.order.myorder}/${customerId}`),
    cancelOrder: async (billId) => api.put(`${ApiConstant.order.cancel}/${billId}`),
})

export const { getOrderedProducts, getPlacedOrders, cancelOrder } = orderAPI();