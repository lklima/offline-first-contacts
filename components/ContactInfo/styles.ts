import { StyleSheet } from "react-native";

import { theme } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    paddingBottom: theme.spacing.base,
    paddingHorizontal: theme.spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    marginRight: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    top: 0,
  },
  userName: {
    fontSize: theme.fontSizes.h2,
    fontWeight: "400",
    color: theme.colors.primary,
    alignSelf: "center",
    marginTop: theme.spacing.xl,
  },
  desc: {
    fontSize: theme.fontSizes.body,
    fontWeight: "400",
    color: theme.colors.textSecondary,
    alignSelf: "center",
    marginTop: theme.spacing.sm,
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 1200,
  },
  rowButtons: {
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    alignSelf: "center",
    marginBottom: theme.spacing.md,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.gray,
  },
  card: {
    width: "100%",
    backgroundColor: theme.colors.gray,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  cardTitle: {
    fontSize: theme.fontSizes.h4,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  cardRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing.md,
  },
  cardRowTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: "400",
    color: theme.colors.primary,
  },
  cardRowValue: {
    fontSize: theme.fontSizes.body,
    fontWeight: "400",
    color: theme.colors.textSecondary,
  },
  textView: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
});
