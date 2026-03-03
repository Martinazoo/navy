import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  placeholder: string;
}

export default function Input({ placeholder, ...props }: Props) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#888"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 8,
    fontSize: 16,
  },
});