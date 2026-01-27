import axios from "axios";

// Axios configuration for "employees" table
const employees = axios.create({
  baseURL: "http://localhost:8080/employees",
  withCredentials: true,
});


export default employees;