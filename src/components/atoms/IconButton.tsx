import { Pressable, PressableProps, StyleSheet } from "react-native"
import Icon from "./Icon"
import { COLORS } from "../../constants/themes"

interface IconButtonProps extends Pick<PressableProps, 'onPress' | 'disabled' | 'style'> {
  icon: React.ReactNode
  size?: number
  color?: keyof typeof COLORS
}

const IconButton = ({
  icon,
  size = 24,
  color = "primary",
  onPress,
  disabled = false,
  style
}: IconButtonProps) => {
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
      <Icon size={size} color={disabled ? "mutedForeground" : color}>
        {icon}
      </Icon>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: COLORS.muted
  },
  disabled: {
    opacity: 0.5
  }
})

export default IconButton