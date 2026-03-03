export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    name: string;
    surname: string;
    email: string;
    bachelor_degree: string;
  };
}