import axios from "axios";
import { env } from "./env";
import { handleApiError, isAuthError } from "../utils/errorHandler";

export const api = axios.create({
  baseURL: env.API_URL
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(handleApiError(error));
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = handleApiError(error);
    console.log('apiError', apiError);
    
    // Don't handle auth errors here at all - let useTokenExpirationMonitor handle it
    // The hook will detect token expiration and trigger logout automatically
    
    return Promise.reject(apiError);
  }
);