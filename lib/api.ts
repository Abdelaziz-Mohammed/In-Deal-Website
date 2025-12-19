import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * REQUEST INTERCEPTOR => Attach token automatically
 */

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR => Handle token expiration
 */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response?.status === 401) {
      Cookies.remove("access_token");
      Cookies.remove("user");
      Cookies.remove("company");

      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
