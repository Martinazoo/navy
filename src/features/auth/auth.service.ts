import { api } from '../../services/api';
import { LoginResponse } from '../../types/login';
import { RegisterResponse } from '../../types/register';

export const loginRequest = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', {
    email,
    password,
  });

  return response.data;
};

export const registerRequest = async (
  name: string,
  surname: string,
  email: string,
  password: string,
  bachelor_degree: string
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/auth/register', {
    name,
    surname,
    email,
    password,
    bachelor_degree,
  });

  return response.data;
};