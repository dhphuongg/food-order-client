import { apiDefault } from './index';
import { ApiConstant } from '@/constant/api.constant';

const authApi = () => ({
  login: async ({ username, password }) =>
    apiDefault.post(ApiConstant.auth.login, { username, password }),
  register: async ({ username, email, password, repeatPassword, latitude, longitude }) => {
    return apiDefault.post(
      ApiConstant.auth.register,
      {
        username,
        email,
        password,
        repeatPassword
      },
      {
        params: {
          latitude,
          longitude
        }
      }
    );
  },
  forgotPassword: async ({ username, email }) =>
    apiDefault.post(ApiConstant.auth.forgotPassword, { username, email })
});

export const { login, register, forgotPassword } = authApi();
