import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background,
    marginTop: theme.spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.base,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.09)",
    backgroundColor: theme.colors.white,
  },
  headerTitle: {
    fontSize: theme.fontSizes.h2,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  searchInputView: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.gray,
    borderRadius: theme.borderRadius.xl,
    marginBottom: theme.spacing.lg,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.fontSizes.body,
    color: theme.colors.primary,
    marginLeft: theme.spacing.sm,
  },
  addChatButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    position: "absolute",
    right: theme.spacing.md,
  },
});
