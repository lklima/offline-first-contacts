import { StyleSheet } from "react-native";

import { theme } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: theme.fontSizes.h2,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: theme.spacing.xl,
    boxShadow: "0 0px 10px rgba(0, 0, 0, 0.09)",
  },
  input: {
    width: "100%",
    height: 60,
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.gray,
    color: theme.colors.primary,
    fontSize: theme.fontSizes.body,
    fontWeight: "600",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    paddingRight: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.xl,
    alignSelf: "center",
    marginTop: theme.spacing.lg,
  },
  addButtonText: {
    fontSize: theme.fontSizes.body,
    fontWeight: "700",
    color: theme.colors.white,
    marginLeft: theme.spacing.sm,
  },
});
