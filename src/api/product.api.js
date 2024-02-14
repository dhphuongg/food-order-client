import { api } from "./index";
import { ApiConstant } from "@/constant/api.constant";

const productApi = () => ({
  getInfo: async (id) =>
    api.get(`${ApiConstant.product}/${id}`),
  getAllProduct: async () =>
    api.get(`${ApiConstant.product}`),
});
export const { getAllProduct, getInfo } = productApi();
