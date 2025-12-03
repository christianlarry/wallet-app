import { StyleSheet, View, ViewProps } from "react-native"
import AppText from "../atoms/AppText"
import { SPACING } from "../../constants/themes"
import { Button } from "../atoms/Button"
import TextButton from "../atoms/TextButton"

interface SectionProps extends Pick<ViewProps, 'style' | 'children'>{
  heading?:{
    title: string
    action?:{
      label: string
      onPress: () => void
    }
  }
}

const Section = ({
  children,
  style,
  heading
}:SectionProps)=>{
  return (
    <View style={[style]}>

      {/* Card Heading Section */}
      {heading && (
        <View style={styles.headingContainer}>

          <AppText variant="subtitle">{heading.title}</AppText>

          {heading.action && (
            <TextButton 
              label={heading.action.label}  
              onPress={heading.action.onPress}
            />
          )}
        </View>
      )}

      {/* Card Content Section */}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: SPACING.md
  }
})

export default Section