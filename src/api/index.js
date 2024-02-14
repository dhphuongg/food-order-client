import axios from 'axios';
import { LocalStorage } from '@/constant/localStorage.constant';
import router from '@/router';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'vn'
  }
});
api.interceptors.request.use((config) => {
  const accessToken = JSON.parse(localStorage.getItem(LocalStorage.auth))?.accessToken;
  config.headers.Authorization = 'Bear ' + accessToken;
  return config;
}, Promise.reject);
api.interceptors.response.use(
  (value) => value.data,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem(LocalStorage.auth);
      router.push('/login');
    }
  }
);

const apiDefault = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'vn'
  }
});

export { api, apiDefault };
