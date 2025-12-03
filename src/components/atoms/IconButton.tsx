import { Pressable, PressableProps, StyleSheet } from "react-native"
import { COLORS, SPACING } from "../../constants/themes"

type VariantType = 'ghost' | 'outline'

interface IconButtonProps extends Pick<PressableProps, 'onPress' | 'disabled' | 'style' | 'children'> {
  variant?: VariantType
}

const IconButton = ({
  variant = 'ghost',
  onPress,
  disabled = false,
  style,
  children
}: IconButtonProps) => {

  const variantStyle = styles[`variant_${variant}`]

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        variantStyle,
        pressed && (variant === 'ghost' ? styles.pressed_ghost : styles.pressed_outline),
        disabled && styles.disabled,
        typeof style === 'function' ? style({ pressed }) : style
      ]}
    >
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  pressed_ghost: {
    opacity: 0.6
  },
  pressed_outline: {
    opacity: 0.7,
    backgroundColor: COLORS.muted
  },
  disabled: {
    opacity: 0.4
  },
  variant_ghost: {
    padding: 4,
    backgroundColor: 'transparent'
  },
  variant_outline: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    width: 50,
    height: 50
  }
})

export default IconButton