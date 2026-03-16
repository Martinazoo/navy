import { StyleSheet } from "react-native";
import { ThemeColors } from "../themes";

interface ProfileStyleOptions {
  fontScale: number;
  highContrast: boolean;
}

export const createProfileStyles = (
  colors: ThemeColors,
  { fontScale, highContrast }: ProfileStyleOptions
) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary[50],
  },
  header: {
    paddingTop: 32,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 22 * fontScale,
    fontWeight: "700",
    color: colors.primary[950],
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: highContrast ? colors.primary[50] : colors.secondary[100],
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    borderWidth: highContrast ? 2 : 0,
    borderColor: highContrast ? colors.primary[950] : "transparent",
  },
  sectionCard: {
    paddingTop: 18,
  },
  sectionHeaderSection: {
    flexDirection: "row",
    gap: 8,
    paddingBottom: 8
  },
  sectionHeader: {
    marginBottom: 8,
  },
  sectionIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: highContrast ? colors.primary[950] : colors.secondary[500],
    alignItems: "center",
    justifyContent: "center",
  },
  subSectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: highContrast ? colors.primary[950] : colors.secondary[500],
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 18 * fontScale,
    fontWeight: "700",
    color: colors.primary[950],
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13 * fontScale,
    color: colors.primary[700],
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: highContrast ? colors.primary[50] : colors.primary[50],
    color: highContrast ? colors.primary[950] : colors.primary[950],
    borderWidth: highContrast ? 2 : 0,
    borderColor: highContrast ? colors.primary[950] : "transparent",
    marginBottom: 12,
  },
  loginButton: {
    marginTop: 8,
    backgroundColor: highContrast ? colors.primary[950] : colors.secondary[500],
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  loginButtonText: {
    color: colors.primary[50],
    fontWeight: "700",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: highContrast ? 2 : 1,
    borderColor: highContrast ? colors.primary[950] : colors.primary[200],
  },
  settingRowLast: {
    borderBottomWidth: 0,
  },
  settingRowColumn: {
    flexDirection: "column",
    paddingVertical: 12,
    borderBottomWidth: highContrast ? 2 : 1,
    borderColor: highContrast ? colors.primary[950] : colors.primary[200],
  },
  settingLabel: {
    fontSize: 16 * fontScale,
    fontWeight: "700",
    color: colors.primary[900],
  },
  settingDesc: {
    fontSize: 12 * fontScale,
    color: colors.primary[700],
    marginTop: 2,
    maxWidth: 220,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  fontSizeOptions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  colorThemeOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  optionButton: {
    flex: 1,
    marginRight: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: highContrast ? colors.primary[50] : colors.secondary[200],
    alignItems: "center",
    borderWidth: highContrast ? 2 : 0,
    borderColor: highContrast ? colors.primary[950] : "transparent",
  },
  optionButtonActive: {
    backgroundColor: highContrast ? colors.primary[950] : colors.secondary[500],
  },
  optionText: {
    fontSize: 14 * fontScale,
    color: highContrast ? colors.primary[950] : colors.secondary[800],
    fontWeight: "600",
  },
  optionTextActive: {
    fontSize: 14 * fontScale,
    color: colors.primary[50],
  },
  themeButton: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: highContrast ? colors.primary[50] : colors.secondary[200],
    width: "48%",
    marginBottom: 8,
    borderWidth: highContrast ? 2 : 0,
    borderColor: highContrast ? colors.primary[950] : "transparent",
  },
  themeButtonActive: {
    backgroundColor: highContrast ? colors.primary[950] : colors.secondary[500],
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  colorSquare: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderColor: highContrast ? colors.primary[950] : colors.primary[700],
    borderWidth: highContrast ? 2 : 1,
  },
  footer: {
    marginTop: 6,
    padding: 14,
    backgroundColor: highContrast ? colors.primary[50] : colors.primary[100],
    borderRadius: 18,
    alignItems: "center",
    borderWidth: highContrast ? 2 : 0,
    borderColor: highContrast ? colors.primary[950] : "transparent",
  },
  footerText: {
    fontSize: 12 * fontScale,
    fontWeight: "600",
    color: colors.primary[700],
  },
  footerNote: {
    marginTop: 6,
    fontSize: 11 * fontScale,
    color: colors.primary[600],
  },
  });