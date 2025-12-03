import { ViewProps, StyleSheet } from "react-native"
import { COLORS, ColorType } from "../../constants/themes"
import React from "react"

interface IconProps extends Pick<ViewProps, 'style'> {
  children: React.ReactNode
  size?: number
  color?: ColorType
}

const Icon = ({
  children,
  size = 24,
  color = "primary",
  style
}: IconProps) => {
  const iconColor = COLORS[color]

  // Clone element dan pass props size dan color langsung ke icon component
  if (React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, { 
      color: iconColor,
      size: size,
      style: style
    })
  }

  return <>{children}</>
}

export default Icon