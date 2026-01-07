import axios from "axios";

const cars = axios.create({
  baseURL: "http://localhost:8080/cars",
  withCredentials: true
});

export default cars;
