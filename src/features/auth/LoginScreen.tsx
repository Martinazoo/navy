import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { authStore } from './auth.store';
import { loginRequest } from './auth.service';
import { LoginResponse } from '../../types/login';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/stack'; 

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default observer(function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const data: LoginResponse = await loginRequest(email, password);

      authStore.login(data.access_token, data.user);

    } catch (error: any) {
      Alert.alert('Login Failed', error?.message || 'Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={loading ? 'Loading...' : 'Login'} onPress={handleLogin} disabled={loading} />

      <Text
        style={styles.registerText}
        onPress={() => navigation.navigate('Register')} 
      >
        Don't have an account? Register
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  registerText: { marginTop: 20, color: '#007AFF', textAlign: 'center' },
});