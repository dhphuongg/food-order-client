import { api } from '@/api/index';
import { ApiConstant } from '@/constant/api.constant';
const userApi = () => ({
    getCurrentUser: async () => api.get(ApiConstant.user.current),
    getUserById: async (customerId) => api.get(`${ApiConstant.user.customer}/${customerId}`),
    updateUserAddress: async ({ customerId, latitude, longitude }) => {
        return api.post(
            `${ApiConstant.user.address}/${customerId}`,
            {
                latitude,
                longitude
            },
            {
                params: {
                    customerId,
                    latitude,
                    longitude
                },
            }
        )
    },
    updateUserInformation: async ({ customerId, fullName, dob, phoneNumber }) => api.put(`${ApiConstant.user.customer}/${customerId}`, {
        fullName,
        dob,
        phoneNumber
    }),
    changeUserPassword: async ({ oldPassword, password, repeatPassword }) => api.post(ApiConstant.user.changePassword, { oldPassword, password, repeatPassword }),
    deleteUserById: async (customerId) => api.delete(`${ApiConstant.user.customer}/${customerId}`)
})
export const {
    getCurrentUser,
    getUserById,
    updateUserAddress,
    updateUserInformation,
    changeUserPassword,
    deleteUserById } = userApi();