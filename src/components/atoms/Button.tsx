import React from 'react';
import { Text, StyleSheet, Pressable, PressableProps } from 'react-native';
import { COLORS } from '../../constants/themes';
import AppText from './AppText';
import { globalStyles } from '../../constants/globalStyles';

type VariantType = "primary" | "secondary" | "outline";

interface ButtonProps extends PressableProps{
  variant?: VariantType
  title: string
  fit?:boolean
}

export const Button = ({ 
  title,
  variant = "primary",
  fit = false,
  style,
  onPress
}: ButtonProps) => {

  const variantStyle = styles[`variant_${variant}`];
  const textVariantStyle = styles[`variant_${variant}_text`];
  const pressedVariantStyle = styles[`variant_${variant}_pressed`];

  const sizeStyle = fit ? [globalStyles.inline, globalStyles.noFlex] : globalStyles.fullWidth;
  
  return (
    <Pressable 
      style={({ pressed})=>[
        styles.button,
        sizeStyle,
        variantStyle,
        pressed && pressedVariantStyle,
        typeof style === 'function' ? style({ pressed }) : style,
      ]} 
      onPress={onPress}
      >
      <AppText style={textVariantStyle}>{title}</AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    marginVertical: 10,
  },
  variant_primary:{
    backgroundColor: COLORS.primary
  },
  variant_primary_pressed:{
    opacity: 0.8
  },
  variant_primary_text:{
    color: COLORS.primaryForeground
  },
  variant_secondary:{
    backgroundColor: COLORS.muted
  },
  variant_secondary_pressed:{
    opacity: 0.8
  },
  variant_secondary_text:{
    color: COLORS.secondaryForeground
  },
  variant_outline:{
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: 'transparent'
  },
  variant_outline_pressed:{
    backgroundColor: COLORS.muted,
    opacity: 0.8
  },
  variant_outline_text:{
    color: COLORS.primary
  }
});
