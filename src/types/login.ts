export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    name: string;
    surname: string;
    email: string;
    bachelor_degree: string;
  };
}