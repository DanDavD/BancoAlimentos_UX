import axios from "axios";


const instance = axios.create({
   baseURL: 'http://localhost:3001',
   withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const t = localStorage.getItem('token');
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});
export default instance;
