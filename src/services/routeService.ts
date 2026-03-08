import { api } from './api';
import { RouteResponse } from '../types/route';

export const getRouteRequest = async (): Promise<RouteResponse> => {
  const response = await api.get<RouteResponse>('/route/get_route');
  return response.data;
};