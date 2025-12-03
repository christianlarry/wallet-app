import { StyleSheet, View, ViewProps } from "react-native"
import { COLORS, SPACING } from "../../constants/themes"
import AppText from "../atoms/AppText"
import TextButton from "../atoms/TextButton"

interface CardProps extends Pick<ViewProps, "style" | "children"> {
  heading?:{
    title: string
    subTitle?: string
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
            <TextButton label="More"/>
          }
        </View>
      }
      
      {/* Card Content Section */}
      <View>
        {children}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: 16,
    marginBottom: SPACING.md
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: SPACING.md
  },
  cardContent: {
    
  }
})

export default Card