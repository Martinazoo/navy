import axios from 'axios';
import Config from "react-native-config";

export const api = axios.create({
  baseURL: Config.API_URL,
});

api.interceptors.request.use((config) => {
  // inyectar token aquí
  return config;
});