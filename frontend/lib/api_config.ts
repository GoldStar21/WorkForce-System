import axios from "axios";

/*
  Basic Axios configuration
*/

const api_config = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export default api_config;
