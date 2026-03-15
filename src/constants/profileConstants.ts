import { themes } from "./themes";

export const FONT_SIZE_LABELS = {
  normal: "Normal",
  large: "Large",
  xl: "XL",
} as const;

export const COLOR_THEME_LABELS = {
  calm: "Calm (Default)",
  warm: "Warm",
  dark: "Dark",
  custom: "Custom",
} as const;

export const THEME_COLORS = {
  calm: themes.calm.secondary[400],
  warm: themes.warm.secondary[400],
  dark: themes.dark.primary[200],
  custom: themes.custom.secondary[500],
} as const;