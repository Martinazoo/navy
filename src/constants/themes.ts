import { colors } from "./colours";

export type ThemeType = 'calm' | 'warm' | 'dark' | 'custom';

export interface ThemeColors {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  accent: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
}

export const themes: Record<ThemeType, ThemeColors> = {
  calm: {
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors['oriental-pink'],
  },
  warm: {
    primary: colors['warm-primary'],
    secondary: colors['warm-secondary'],
    accent: colors['warm-accent'],
  },
  dark: {
    primary: colors['dark-primary'],
    secondary: colors['dark-secondary'],
    accent: colors['dark-accent'],
  },
  custom: {
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors['oriental-pink'],
  },
};