import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
});

export default apiClient;
