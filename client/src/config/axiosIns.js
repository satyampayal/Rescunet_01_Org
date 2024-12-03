import axios from 'axios';
const BASE_URL="http://localhost:3000";
// const BASE_URL="https://sssr-xfzj.onrender.com/api/v1";

const axiosInstance=axios.create();

axiosInstance.defaults.baseURL=BASE_URL;
axiosInstance.defaults.withCredentials=true;
axiosInstance.defaults.timeout=10000000000000;
export default axiosInstance;