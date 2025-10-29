import { StyleSheet } from "react-native";

import { theme } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    alignItems: "center",
    backgroundColor: theme.colors.background,
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.gray,
  },
  headerTitle: {
    fontSize: theme.fontSizes.h2,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  leftContent: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: theme.spacing.md,
    backgroundColor: theme.colors.gray,
  },
  userName: {
    fontSize: theme.fontSizes.body,
    fontWeight: "600",
    color: theme.colors.primary,
  },
  lastMessage: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  rightContent: {
    alignItems: "center",
  },
  lastMessageTime: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    fontWeight: "bold",
  },
  unreadCountContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.xs,
  },
  unreadCount: {
    fontSize: theme.fontSizes.min,
    color: theme.colors.white,
    fontWeight: "bold",
  },
});
