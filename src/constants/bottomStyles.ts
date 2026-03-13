import { StyleSheet } from "react-native";
import { colors } from "./colours";

export const bottomStyles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: colors.secondary[50],
    marginBottom: 4,
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.primary[50],
    color: colors.primary[950],
  },
  primaryIconButton: {
    width: 50,
    height: 50,
    backgroundColor: colors.primary[500],
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  secondaryIconButton: {
    width: 50,
    height: 50,
    backgroundColor: colors["oriental-pink"][600],
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  primaryButton: {
    marginTop: 20,
    backgroundColor: colors["oriental-pink"][600],
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  primaryButtonText: {
    color: colors["oriental-pink"][50],
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
    fontSize: 24,
    color: colors.secondary[50],
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
  },
  categoryLabel: {
    marginTop: 8,
    color: colors.primary[800],
    textAlign: "center",
    fontSize: 14,
  },
  scheduleItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: colors.primary[700],
    backgroundColor: colors.primary[50],
    color: colors.primary[800],
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",  
    justifyContent: "space-between" 
  },
  scheduleTitle: {
    fontWeight: "600",
    color: colors.primary[800],
    marginBottom: 4,
  },
  scheduleSubtitle: {
    fontSize: 12,
    color: colors.primary[800],
  },
  scheduleTime: {
    fontSize: 12,
    color: colors.primary[800],
  },
});