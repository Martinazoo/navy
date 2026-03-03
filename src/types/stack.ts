export type AuthStackParamList = {
  Login: undefined;       
  Register: undefined;    
};

export type AppStackParamList = {
  Home: undefined;
  Profile: { userId: string }; 
};