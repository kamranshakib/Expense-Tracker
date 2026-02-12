// utils/axiosInstance.js
import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosinstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor: اضافه کردن توکن به هدر
axiosinstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: مدیریت خطاها
axiosinstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login"; // ریدایرکت به صفحه ورود
      } else if (error.response.status === 500) {
        console.error("Server error, please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout, please try again.");
    }
    return Promise.reject(error);
  }
);

export default axiosinstance;
