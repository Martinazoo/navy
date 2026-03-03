import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../types/user';

class AuthStore {
  user: User | null = null;
  token: string | null = null;
  isAuthenticated = false;
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  bootstrapAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userJson = await AsyncStorage.getItem('user');
      const user: User | null = userJson ? JSON.parse(userJson) : null;

      runInAction(() => {
        this.token = token;
        this.user = user;
        this.isAuthenticated = !!token && !!user;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.token = null;
        this.user = null;
        this.isAuthenticated = false;
        this.isLoading = false;
      });
    }
  };

  login = async (token: string, user: User) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    runInAction(() => {
      this.token = token;
      this.user = user;
      this.isAuthenticated = true;
    });
  };

  logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    runInAction(() => {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
    });
  };
}

export const authStore = new AuthStore();