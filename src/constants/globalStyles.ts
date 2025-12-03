import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "./themes";

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: SPACING.xs,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: COLORS.background
  },

  // Layout helpers
  // row: { flexDirection: 'row', alignItems: 'center' },
  // center: { justifyContent: 'center', alignItems: 'center' },
  // spacer: { flex: 1 },

  // Width / sizing utilities
  fullWidth: { alignSelf: 'stretch', width: '100%' }, // stretch ke lebar parent
  inline: { alignSelf: 'flex-start' },                // mengikuti ukuran konten
  noFlex: { flexGrow: 0, flexShrink: 0, flexBasis: 'auto' }, // pastikan tidak mengembang/menyusut
})