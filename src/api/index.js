import axios from "axios";
import { LocalStorage } from "@/constant/localStorage.constant";
import router from "@/router";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(LocalStorage.accessToken);
  config.headers.Authorization = "Bear " + accessToken;
  return config;
}, Promise.reject);
api.interceptors.response.use(
  (value) => value,
  (error) => {
    if (error.response.status === 401) {
      router.push("/login");
    }
  }
);

const apiDefault = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { api, apiDefault };
