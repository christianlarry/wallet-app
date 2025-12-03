import { StyleSheet, View, ViewProps } from "react-native"
import { COLORS, SPACING } from "../../constants/themes"
import AppText from "../atoms/AppText"
import TextButton from "../atoms/TextButton"

interface CardProps extends Pick<ViewProps, "style" | "children"> {
  heading?:{
    title: string
    action?:{
      label: string
      onPress: () => void
    }
  }
}

const Card = ({
  children,
  heading
}:CardProps) => {
  return (
    <View style={styles.cardContainer}>
      {/* Card Heading Section */}
      {heading &&
        <View style={styles.cardHeader}>
          <AppText variant="subtitle">{heading.title}</AppText>

          {heading.action &&
            <TextButton 
              label={heading.action.label}  
              onPress={heading.action.onPress}
            />
          }
        </View>
      }
      
      {/* Card Content Section */}
      {children}

    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: 16
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: SPACING.md
  }
})

export default Card