import { api } from "./index";
import { ApiConstant } from "@/constant/api.constant";

export const productApi = {
  getInfo: async (id) =>
    api.get(`${ApiConstant.product}/${id}`)
};