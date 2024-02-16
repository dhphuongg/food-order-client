import { api } from "./index";
import { ApiConstant } from "@/constant/api.constant";

const productApi = () => ({
  getInfo: async (id) =>
    api.get(`${ApiConstant.product}/${id}`),
  getAllProduct: async () =>
    api.get(`${ApiConstant.user}/find-product-info`),
});
export const { getAllProduct, getInfo } = productApi();
