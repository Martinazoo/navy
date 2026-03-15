import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { FONT_SCALE_MAP, FontSizeOption } from './accessibility';
import { ThemeColors, ThemeType, themes } from './themes';

interface ThemeContextType {
  theme: ThemeType;
  colors: ThemeColors;
  fontSize: FontSizeOption;
  fontScale: number;
  highContrast: boolean;
  setTheme: (theme: ThemeType) => void;
  setFontSize: (fontSize: FontSizeOption) => void;
  setHighContrast: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'user_theme';
const FONT_SIZE_STORAGE_KEY = 'user_font_size';
const HIGH_CONTRAST_STORAGE_KEY = 'user_high_contrast';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeType>('calm');
  const [fontSize, setFontSizeState] = useState<FontSizeOption>('normal');
  const [highContrast, setHighContrastState] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const [savedTheme, savedFontSize, savedHighContrast] = await Promise.all([
          AsyncStorage.getItem(THEME_STORAGE_KEY),
          AsyncStorage.getItem(FONT_SIZE_STORAGE_KEY),
          AsyncStorage.getItem(HIGH_CONTRAST_STORAGE_KEY),
        ]);

        if (savedTheme && Object.keys(themes).includes(savedTheme)) {
          setThemeState(savedTheme as ThemeType);
        }

        if (savedFontSize && Object.keys(FONT_SCALE_MAP).includes(savedFontSize)) {
          setFontSizeState(savedFontSize as FontSizeOption);
        }

        if (savedHighContrast !== null) {
          setHighContrastState(savedHighContrast === 'true');
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };
    loadTheme();
  }, []);

  const setTheme = async (newTheme: ThemeType) => {
    try {
      setThemeState(newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const setFontSize = async (newFontSize: FontSizeOption) => {
    try {
      setFontSizeState(newFontSize);
      await AsyncStorage.setItem(FONT_SIZE_STORAGE_KEY, newFontSize);
    } catch (error) {
      console.error('Failed to save font size:', error);
    }
  };

  const setHighContrast = async (enabled: boolean) => {
    try {
      setHighContrastState(enabled);
      await AsyncStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, String(enabled));
    } catch (error) {
      console.error('Failed to save high contrast setting:', error);
    }
  };

  const baseColors = themes[theme];
  const colors = highContrast
    ? {
        primary: {
          50: '#ffffff',
          100: '#ffffff',
          200: '#f2f2f2',
          300: '#dddddd',
          400: '#bbbbbb',
          500: '#8c8c8c',
          600: '#5f5f5f',
          700: '#3f3f3f',
          800: '#1f1f1f',
          900: '#000000',
          950: '#000000',
        },
        secondary: {
          50: '#ffffff',
          100: '#ffffff',
          200: '#f2f2f2',
          300: '#dddddd',
          400: '#bbbbbb',
          500: '#8c8c8c',
          600: '#5f5f5f',
          700: '#3f3f3f',
          800: '#1f1f1f',
          900: '#000000',
          950: '#000000',
        },
        accent: {
          50: '#ffffff',
          100: '#ffffff',
          200: '#f2f2f2',
          300: '#dddddd',
          400: '#bbbbbb',
          500: '#8c8c8c',
          600: '#5f5f5f',
          700: '#3f3f3f',
          800: '#1f1f1f',
          900: '#000000',
          950: '#000000',
        },
      }
    : baseColors;
  const fontScale = FONT_SCALE_MAP[fontSize];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors,
        fontSize,
        fontScale,
        highContrast,
        setTheme,
        setFontSize,
        setHighContrast,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}