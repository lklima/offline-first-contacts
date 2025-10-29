import { StyleSheet } from "react-native";

import { theme } from "@/constants/theme";

export const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing.lg,
  },
  emptyText: {
    fontSize: theme.fontSizes.body,
    fontWeight: "600",
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
  },
});
