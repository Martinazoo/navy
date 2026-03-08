import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { authStore } from './auth.store';
import { RegisterResponse } from '../../types/register';
import { registerRequest } from './auth.service';
import { AuthStackParamList } from '../../types/stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export default observer(function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bachelorDegree, setBachelorDegree] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const data:  RegisterResponse = await registerRequest(name, surname, email, password, bachelorDegree);
      Alert.alert('Registration Successful', data.message);
      navigation.replace("Login"); 
    } catch (error) {
      Alert.alert('Registration Failed', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Input placeholder="Name" value={name} onChangeText={setName} />
      <Input placeholder="Surname" value={surname} onChangeText={setSurname} />
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Input
        placeholder="Bachelor Degree"
        value={bachelorDegree}
        onChangeText={setBachelorDegree}
      />
      <Button title="Register" onPress={handleRegister} />
      <Text
              style={styles.loginText}
              onPress={() => navigation.replace('Login')} 
            >
              Already have an account? Login
            </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  loginText: { marginTop: 20, color: '#007AFF', textAlign: 'center' },

});