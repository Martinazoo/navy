import { StyleSheet } from "react-native";
import { ThemeColors } from "../themes";

interface BottomStyleOptions {
  fontScale: number;
  highContrast: boolean;
}

export const createBottomStyles = (
  colors: ThemeColors,
  { fontScale, highContrast }: BottomStyleOptions
) =>
  StyleSheet.create({
  label: {
    fontSize: 14 * fontScale,
    color: highContrast ? colors.primary[950] : colors.secondary[50],
    marginBottom: 4,
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: highContrast ? colors.primary[50] : colors.primary[50],
    color: highContrast ? colors.primary[950] : colors.primary[950],
    borderWidth: highContrast ? 2 : 0,
    borderColor: highContrast ? colors.primary[950] : "transparent",
  },
  primaryIconButton: {
    width: 50,
    height: 50,
    backgroundColor: highContrast ? colors.primary[950] : colors.primary[500],
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    borderWidth: highContrast ? 2 : 0,
    borderColor: highContrast ? colors.primary[50] : "transparent",
  },
  secondaryIconButton: {
    width: 50,
    height: 50,
    backgroundColor: highContrast ? colors.primary[950] : colors.accent[600],
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    borderWidth: highContrast ? 2 : 0,
    borderColor: highContrast ? colors.primary[50] : "transparent",
  },
  primaryButton: {
    marginTop: 20,
    backgroundColor: highContrast ? colors.primary[950] : colors.accent[600],
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    borderWidth: highContrast ? 2 : 0,
    borderColor: highContrast ? colors.primary[50] : "transparent",
  },
  primaryButtonText: {
    fontSize: 14 * fontScale,
    color: highContrast ? colors.primary[50] : colors.accent[50],
    fontWeight: "600",
  },
 
  categoriesHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  categoriesTitle: {
    flex: 1,
    textAlign: "left",
    fontSize: 24 * fontScale,
    color: highContrast ? colors.primary[950] : colors.secondary[50],
    fontWeight: "600",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "48%",
    backgroundColor: colors.primary[50],
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: highContrast ? 2 : 0,
    borderColor: highContrast ? colors.primary[950] : "transparent",
  },
  categoryLabel: {
    marginTop: 8,
    color: colors.primary[800],
    textAlign: "center",
    fontSize: 14 * fontScale,
  },
  scheduleItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: highContrast ? 2 : 1,
    borderColor: highContrast ? colors.primary[950] : colors.primary[700],
    backgroundColor: colors.primary[50],
    color: colors.primary[800],
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: highContrast ? 2 : 0,
  },
  scheduleTitle: {
    fontWeight: "600",
    color: colors.primary[800],
    marginBottom: 4,
  },
  scheduleSubtitle: {
    fontSize: 12 * fontScale,
    color: colors.primary[800],
  },
  scheduleTime: {
    fontSize: 12 * fontScale,
    color: colors.primary[800],
  },
  });