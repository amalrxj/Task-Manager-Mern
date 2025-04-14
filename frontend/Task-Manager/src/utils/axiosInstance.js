import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      }
    } else if (error.response.status === 500) {
      console.error("Server Error:", error.response.data.message);
    } else if (error.code === "ECONNABORTED") {
      console.error("Request Timeout:", error.message);
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };