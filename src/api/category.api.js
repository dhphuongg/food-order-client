import { api } from "./index";
import { ApiConstant } from "@/constant/api.constant";

const categoryApi = () => ({
    getCategory: async () =>
        api.get(`${ApiConstant.category}`),
});
export const { getCategory } = categoryApi();
