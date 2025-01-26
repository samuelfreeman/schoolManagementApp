import axios from "axios";
const authToken = localStorage.getItem("token");

export const api = axios.create({
  baseURL: "https://schoolbasedapi.onrender.com/api/web/",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    Authorization: `Bearer ${authToken}`,
  },
  withCredentials: true,
});
