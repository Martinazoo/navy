import { UserPositionResponse } from "../types/user";
import { api } from "./api";

export const getUserPosition = async (): Promise<UserPositionResponse> => {
  const response = await api.get<UserPositionResponse>('/users/position');
  return response.data;
};