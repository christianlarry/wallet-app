import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "./themes";

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: SPACING.xs,
    backgroundColor: COLORS.background
  }
})