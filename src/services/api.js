import axios from "axios";

const api = axios.create({
  baseURL: "https://spring-back-third-semester-senai.onrender.com",
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("nexo_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  else delete config.headers.Authorization;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem("nexo_token")) {
      localStorage.removeItem("nexo_token");
      localStorage.removeItem("nexo_user");
      window.dispatchEvent(new Event("session-expired"));
    }
    return Promise.reject(error);
  },
);

export default api;
