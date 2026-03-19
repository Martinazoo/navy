import { api } from './api';
import { RouteResponse } from '../types/route';

type RouteRequest = {
  start: string;
  end: string;
};

export const getRouteRequest = async (start: string, end: string): Promise<RouteResponse> => {
  const response = await api.post<RouteResponse>('/route/path', {start,end,} as RouteRequest);
  return response.data;
};