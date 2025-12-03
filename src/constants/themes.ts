export const COLORS = {
  primary: '#202020',
  primaryForeground: '#FFFFFF',
  secondary: '#c9f158',
  secondaryForeground: '#202020',
  muted: '#E0E0E0',
  mutedForeground: '#707070',
  background: '#F2F3F5',
  foreground: '#202020',
  white: '#FFFFFF',
  border: 'oklch(0.922 0 0)'
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 32
}

export const FONTS = {
  family: {
    sg_light: "SpaceGrotesk_300Light",
    sg_regular: "SpaceGrotesk_400Regular",
    sg_medium: "SpaceGrotesk_500Medium",
    sg_semibold: "SpaceGrotesk_600SemiBold",
    sg_bold: "SpaceGrotesk_700Bold"
  },
  sizes: {
    display: 42,
    header: 34,
    title: 26,
    subtitle: 22,
    headline: 20,
    body: 15,
    caption: 12
  }
}

export type ColorType = keyof typeof COLORS;
export type SpacingType = keyof typeof SPACING;
export type FontSizeType = keyof typeof FONTS.sizes;
export type FontFamilyType = keyof typeof FONTS.family;