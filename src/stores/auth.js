import { LocalStorage } from '@/constant/localStorage.constant';
import { defineStore, acceptHMRUpdate } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem(LocalStorage.accessToken) || '',
    userId: localStorage.getItem(LocalStorage.userId) || ''
  }),
  getters: {
    loggedIn: ({ accessToken, userId }) => !!accessToken && !!userId
  },
  actions: {
    save({ accessToken, userId }) {
      this.accessToken = accessToken;
      this.userId = userId;
      localStorage.setItem(LocalStorage.accessToken, this.accessToken);
      localStorage.setItem(LocalStorage.userId, this.userId);
    },
    clear() {
      this.accessToken = '';
      this.userId = '';
      localStorage.removeItem(LocalStorage.accessToken);
      localStorage.removeItem(LocalStorage.userId);
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
