import { StyleSheet } from "react-native";

import { theme } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    width: 260,
    height: 65,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    flexDirection: "row",
    position: "absolute",
    alignSelf: "center",
    borderRadius: theme.borderRadius.xxl,
  },
  iconContainer: {
    flex: 1,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
