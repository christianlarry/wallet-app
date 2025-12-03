import { Pressable, StyleSheet, View } from "react-native"
import { getGreetingWithSubtext } from "../../../utils/greetings"
import AppText from "../../atoms/AppText"
import Section from "../../molecules/Section"
import { useState } from "react"
import IconButton from "../../atoms/IconButton"
import Icon from "../../atoms/Icon"
import { Ionicons } from "@expo/vector-icons"
import { SPACING } from "../../../constants/themes"

const DashboardHeader = ()=>{
  
  const [greeting,setGreeting] = useState<{greeting:string, subtext:string}>(getGreetingWithSubtext("Christian"))

  const handlePress = ()=>{
    setGreeting(getGreetingWithSubtext("Christian"))
  }

  return (
    <Section>
      <View style={styles.wrapper}>
        <Pressable onPress={handlePress} style={styles.greetingsWrapper}>
          <AppText variant="headline">{greeting.greeting}</AppText>
          <AppText color="mutedForeground">{greeting.subtext}</AppText>
        </Pressable>
        
        <IconButton variant="outline">
          <Icon>
            <Ionicons name="notifications-outline"/>
          </Icon>
        </IconButton>
      </View>
    </Section>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    justifyContent: "space-between"
  },
  greetingsWrapper: {
    flexShrink: 1,
    alignSelf: "flex-start"
  }
})

export default DashboardHeader