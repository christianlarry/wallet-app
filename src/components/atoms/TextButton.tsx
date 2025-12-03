import { Pressable, PressableProps, StyleSheet } from "react-native"
import AppText from "./AppText"
import { ColorType, FONTS } from "../../constants/themes"

interface TextButtonProps extends Pick<PressableProps, 'onPress' | 'disabled' | 'style'> {
  label: string
  color?: ColorType
  variant?: "body" | "caption" | "headline"
}

const TextButton = ({
  label,
  onPress,
  disabled = false,
  color = "primary",
  variant = "body",
  style
}: TextButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        disabled && styles.disabled,
        typeof style === 'function' ? style({ pressed }) : style
      ]}
    >
      <AppText 
        variant={variant} 
        color={disabled ? "mutedForeground" : color}
        style={styles.label}
      >
        {label}
      </AppText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: FONTS.family.sg_bold
  },
  container: {
    padding: 4
  },
  pressed: {
    opacity: 0.7
  },
  disabled: {
    opacity: 0.5
  }
})

export default TextButton
