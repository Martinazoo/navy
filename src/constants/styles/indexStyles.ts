import { ThemeColors } from "@/constants/themes";
import { StyleSheet } from "react-native";

export const createIndexStyles = (
  themeColors: ThemeColors,
  highContrast: boolean,
  fontScale: number
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.primary[50],
    },
    mapArea: {
      flex: 1,
      backgroundColor: themeColors.primary[50],
      borderColor: highContrast ? themeColors.primary[950] : "transparent",
      borderWidth: highContrast ? 2 : 0,
    },
    bottomPanel: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 30,
      backgroundColor: highContrast ? themeColors.primary[50] : themeColors.primary[800],
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      elevation: 5,
    },
    dropdownRow: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "flex-start",
      padding: 20,
      gap: 10,
    },
    dropdownContainer: {
      flex: 1,
    },
    dropdownTriggerPrimary: {
      borderRadius: 8,
      backgroundColor: themeColors.secondary[200],
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 8,
      borderColor: highContrast ? themeColors.primary[950] : "transparent",
      borderWidth: highContrast ? 2 : 0,
      minHeight: 42,
    },
    dropdownTriggerSecondary: {
      borderRadius: 8,
      backgroundColor: highContrast ? themeColors.secondary[200] : themeColors.primary[800],
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 8,
      borderColor: highContrast ? themeColors.primary[950] : "transparent",
      borderWidth: highContrast ? 2 : 0,
      minHeight: 42,
    },
    dropdownTextPrimary: {
      color: themeColors.primary[950],
      fontSize: 16 * fontScale,
      paddingVertical: 8,
      paddingHorizontal: 6,
      flex: 1,
    },
    dropdownTextSecondary: {
      color: highContrast ? themeColors.primary[950] : themeColors.secondary[100],
      fontSize: 16 * fontScale,
      paddingVertical: 8,
      paddingHorizontal: 6,
      flex: 1,
    },
    dropdownMenuPrimary: {
      marginTop: 6,
      borderRadius: 8,
      backgroundColor: themeColors.primary[50],
      borderColor: themeColors.primary[950],
      borderWidth: highContrast ? 2 : 1,
      overflow: "hidden",
    },
    dropdownMenuSecondary: {
      marginTop: 6,
      borderRadius: 8,
      backgroundColor: highContrast ? themeColors.primary[50] : themeColors.primary[800],
      borderColor: highContrast ? themeColors.primary[950] : themeColors.primary[700],
      borderWidth: highContrast ? 2 : 1,
      overflow: "hidden",
    },
    dropdownOption: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderTopColor: highContrast ? themeColors.primary[950] : themeColors.primary[500],
      borderTopWidth: 1,
    },
    dropdownOptionTextPrimary: {
      color: themeColors.primary[950],
      fontSize: 14 * fontScale,
    },
    dropdownOptionTextSecondary: {
      color: highContrast ? themeColors.primary[950] : themeColors.secondary[100],
      fontSize: 14 * fontScale,
    },
    connectButton: {
      backgroundColor: themeColors.accent[600],
      padding: 8,
      borderRadius: 8,
      borderColor: highContrast ? themeColors.primary[950] : "transparent",
      borderWidth: highContrast ? 2 : 0,
    },
    connectButtonPressed: {
      backgroundColor: themeColors.accent[700],
    },
  });

export type IndexStyles = ReturnType<typeof createIndexStyles>;
