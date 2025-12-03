import { StyleSheet, Pressable, PressableProps } from "react-native"
import { COLORS, SPACING } from "../../../constants/themes"
import AppText from "../../atoms/AppText"
import Icon from "../../atoms/Icon"
import { Ionicons } from "@expo/vector-icons"

interface AddAccountCardProps extends Pick<PressableProps, 'onPress'> {}

const AddAccountCard = ({ onPress }: AddAccountCardProps) => {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      {/* Plus Icon */}
      <Icon size={28} color="mutedForeground">
        <Ionicons name="add-circle-outline" />
      </Icon>

      {/* Label */}
      <AppText variant="body" color="mutedForeground" style={styles.label}>
        Tambah Akun
      </AppText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderRadius: 16,
    padding: SPACING.md,
    marginRight: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.xs,
    // Dashed border style
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed'
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: COLORS.muted
  },
  label: {
    textAlign: 'center'
  }
})

export default AddAccountCard
