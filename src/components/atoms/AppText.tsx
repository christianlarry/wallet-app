import { StyleSheet, Text, TextProps } from "react-native"
import { COLORS, ColorType, FONTS } from "../../constants/themes"

export type VariantType = keyof typeof TextVariants 

interface AppTextProps extends Pick<TextProps, 'style' | 'children'> {
  variant?: VariantType
  color?: ColorType
}

const AppText = ({
  children,
  style,
  variant = "default",
  color
}: AppTextProps) => {

  const variantStyle = TextVariants[variant];
  const colorStyle = color ? colorStyles[color] : null;
  
  return (
    <Text
      style={[
        styles.app_text,
        variantStyle,
        colorStyle,
        style
      ]}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({

  app_text: {
    includeFontPadding: false,
  },

  variant_display: {
    fontFamily: FONTS.family.sg_bold,
    fontSize: FONTS.sizes.display,
    lineHeight: FONTS.sizes.display * 1, // 100% dari fontSize
    includeFontPadding: false, // Android only - hilangkan padding ekstra
    color: COLORS.primary
  },
  variant_header: {
    fontFamily: FONTS.family.sg_bold,
    fontSize: FONTS.sizes.header,
    lineHeight: FONTS.sizes.header * 1,
    includeFontPadding: false,
    color: COLORS.primary
  },
  variant_title: {
    fontFamily: FONTS.family.sg_bold,
    fontSize: FONTS.sizes.title,
    lineHeight: FONTS.sizes.title * 1,
    includeFontPadding: false,
    color: COLORS.primary
  },
  variant_subtitle: {
    fontFamily: FONTS.family.sg_bold,
    fontSize: FONTS.sizes.subtitle,
    lineHeight: FONTS.sizes.subtitle * 1,
    includeFontPadding: false,
    color: COLORS.primary
  },
  variant_headline: {
    fontFamily: FONTS.family.sg_bold,
    fontSize: FONTS.sizes.headline,
    lineHeight: FONTS.sizes.headline * 1,
    includeFontPadding: false,
    color: COLORS.primary
  },
  variant_body: {
    fontFamily: FONTS.family.sg_medium,
    fontSize: FONTS.sizes.body,
    lineHeight: FONTS.sizes.body * 1,
    includeFontPadding: false,
    color: COLORS.primary
  },
  variant_caption: {
    fontFamily: FONTS.family.sg_medium,
    fontSize: FONTS.sizes.caption,
    lineHeight: FONTS.sizes.caption * 1,
    includeFontPadding: false,
    color: COLORS.mutedForeground
  },
  variant_default: {
    fontFamily: FONTS.family.sg_medium,
    fontSize: FONTS.sizes.body,
    lineHeight: FONTS.sizes.body * 1,
    includeFontPadding: false,
    color: COLORS.primary
  }
})

const colorStyles = StyleSheet.create(
  Object.entries(COLORS).reduce((acc, [key, value]) => {
    acc[key as ColorType] = { color: value }
    return acc
  }, {} as Record<ColorType, { color: string }>)
)

export const TextVariants = {
  default: styles.variant_default,
  display: styles.variant_display,
  header: styles.variant_header,
  title: styles.variant_title,
  subtitle: styles.variant_subtitle,
  headline: styles.variant_headline,
  body: styles.variant_body,
  caption: styles.variant_caption
}

export default AppText