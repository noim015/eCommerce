import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Add JWT token from localStorage if available
API.interceptors.request.use((config) => {
  const user = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export default API;
