import React, { useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { createBottomStyles } from '../constants/styles/bottomStyles';
import { useTheme } from '../constants/ThemeContext';

interface Props {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

export default function Button({ title, onPress, disabled = false }: Props) {

  const { colors: themeColors, fontScale, highContrast } = useTheme();

  const styles = useMemo(
    () => createBottomStyles(themeColors, { fontScale, highContrast }),
    [themeColors, fontScale, highContrast]
  );

  return (
    <TouchableOpacity
      style={[styles.primaryButton, disabled && { backgroundColor: themeColors.primary[700] }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}
