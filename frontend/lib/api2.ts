import axios from "axios";

// Axios configuration
const employees = axios.create({
  baseURL: "http://localhost:8080/employees",
  withCredentials: true,
});


export default employees;