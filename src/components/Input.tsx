import React, { useMemo } from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { createBottomStyles } from '../constants/styles/bottomStyles';
import { useTheme } from '../constants/ThemeContext';

interface Props extends TextInputProps {
  placeholder: string;
}

export default function Input({ placeholder, ...props }: Props) {
  
  const { colors: themeColors, fontScale, highContrast } = useTheme();

  const styles = useMemo(
    () => createBottomStyles(themeColors, { fontScale, highContrast }),
    [themeColors, fontScale, highContrast]
  );

  return (
    <TextInput
      style={[styles.input, {marginBottom: 12, borderColor: themeColors.primary[400], borderWidth: 1 }]}
      placeholder={placeholder}
      placeholderTextColor={highContrast ? themeColors.primary[900] : themeColors.secondary[400]}
      {...props}
    />
  );
}