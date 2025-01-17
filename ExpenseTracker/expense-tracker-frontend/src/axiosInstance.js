import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7058/',
});

export default axiosInstance;
