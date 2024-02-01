import { apiDefault } from './index';

export const authApi = {
  login: async ({ email, password }) => apiDefault.post(ApiConstant.auth.login, { email, password })
};
