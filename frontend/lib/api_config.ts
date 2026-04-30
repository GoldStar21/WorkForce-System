import axios from "axios";

const api_config = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "/api" : "http://localhost:8080",
  withCredentials: true,
  timeout: 30000,
});

export default api_config;
