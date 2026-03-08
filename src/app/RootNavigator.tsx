import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from '../features/auth/auth.store';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import SplashScreen from '../components/SplashScreen';

export const RootNavigator = observer(() => {
  useEffect(() => {
    authStore.bootstrapAuth();
  }, []);

  if (authStore.isLoading) return <SplashScreen />;

  //return authStore.isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
  return <AppNavigator />;
});