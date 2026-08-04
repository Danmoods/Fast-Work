import axios from "axios";

const api = axios.create({
  baseURL: "https://fast-work.onrender.com",
});

export default api;