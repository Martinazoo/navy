import axios from 'axios';
import Config from "react-native-config";
import { authStore } from '../features/auth/auth.store';


export const api = axios.create({
  baseURL: "http://10.92.8.208:8000",
});

api.interceptors.request.use((config) => {
  const token = authStore.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});