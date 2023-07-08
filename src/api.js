import axios from "axios";

const api = axios.create({
  baseURL: "https://mywallet-api-vu1n.onrender.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.VITE_APP_JWT_SECRET}`,
  },
});

export default api;
