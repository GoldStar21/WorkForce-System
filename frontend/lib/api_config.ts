import axios from "axios";

/*
  Basic Axios configuration
*/

const api_config = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  withCredentials: true,
  timeout: 30000, // 30 sekundicd f
});

export default api_config;
