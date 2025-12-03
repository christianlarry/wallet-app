import { View, ViewProps, StyleSheet } from "react-native"
import { COLORS } from "../../constants/themes"
import React from "react"

interface IconProps extends Pick<ViewProps, 'style'> {
  children: React.ReactNode
  size?: number
  color?: keyof typeof COLORS
}

const Icon = ({
  children,
  size = 24,
  color,
  style
}: IconProps) => {
  const iconColor = color ? COLORS[color] : undefined

  return (
    <View 
      style={[
        styles.container,
        { width: size, height: size },
        style
      ]}
    >
      {React.isValidElement(children) && iconColor
        ? React.cloneElement(children as React.ReactElement<any>, { 
            color: iconColor,
            size: size 
          })
        : children
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Icon