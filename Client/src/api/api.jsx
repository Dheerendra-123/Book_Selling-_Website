import axios from 'axios'
import { handleError } from '../Utils/Tostify';

export const api=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    withCredentials:true,
})


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Token expired or unauthorized. Redirecting to login.");
      handleError("Token expired or unauthorized. Redirecting to login.")

      // Clear storage
      localStorage.removeItem("token");

      // Redirect (if using React Router v6+)
      window.location.href = "/login"; // or use navigate("/login") if inside React

      // Optionally reject for further handling
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);