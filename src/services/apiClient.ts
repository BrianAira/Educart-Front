import axios from "axios";
import { store } from "../store/store";
import { logout } from "../features/Auth/redux/authSlice";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    let token = store.getState().auth.token;
    if (!token) {
      token = localStorage.getItem("token");
    }

    console.log(`🚀 Petición a: ${config.url} | Token: ${token ? 'PRESENTE' : 'AUSENTE'}`);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    
    const isAuthError=error.response?.status==401;
    const url = error.config?.url||"";
    const isAdminRoute=url.includes("admin");
    // const isAdminRoute=error.config.VITE_API_URL.includes('admin')
    if (isAuthError && !isAdminRoute) {
      store.dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // window.location.href = "/login"; // Evita usar esto, mejor usa navigate de React Router
    }
    return Promise.reject(error);
    // if (error.response?.status === 401) {
    //   store.dispatch(logout());
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("user");
    //   window.location.href = "/login";
    // }
    // return Promise.reject(error);
  }
);
