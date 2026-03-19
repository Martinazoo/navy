import axios from 'axios';
import Config from "react-native-config";
import { authStore } from '../features/auth/auth.store';

export const api = axios.create({
  baseURL: Config.API_URL,
});

api.interceptors.request.use((config) => {
  const token = authStore.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});