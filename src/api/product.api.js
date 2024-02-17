import { api } from "./index";
import { ApiConstant } from "@/constant/api.constant";

const productApi = () => ({
  getInfo: async (id, shopId) =>
    api.get(`user/get-product-detail/${id}/shop/${shopId}`),
  getAllProduct: async () =>
    api.get(`user/find-product-info`),
});
export const { getAllProduct, getInfo } = productApi();