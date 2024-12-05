import axios from "axios";
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://rescunet-01-org-4.onrender.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Needed for cookies or session-based auth
  timeout: 10000, // Optional, adjust as needed
});

export default axiosInstance;
