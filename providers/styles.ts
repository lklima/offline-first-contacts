import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  connectionToast: {
    height: 40,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    alignSelf: "center",
    zIndex: 1000,
    borderRadius: theme.borderRadius.md,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  connectionToastText: {
    fontSize: theme.fontSizes.small,
    fontWeight: "600",
    color: theme.colors.green,
  },
});
