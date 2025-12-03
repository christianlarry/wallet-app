import { Pressable } from "react-native"
import { getGreetingWithSubtext } from "../../../utils/greetings"
import AppText from "../../atoms/AppText"
import Section from "../../molecules/Section"
import { useState } from "react"

const DashboardHeader = ()=>{
  
  const [greeting,setGreeting] = useState<{greeting:string, subtext:string}>(getGreetingWithSubtext("Christian"))

  const handlePress = ()=>{
    setGreeting(getGreetingWithSubtext("Christian"))
  }

  return (
    <Section>
      <Pressable onPress={handlePress}>
        <AppText variant="headline">{greeting.greeting}</AppText>
        <AppText color="mutedForeground">{greeting.subtext}</AppText>
      </Pressable>
    </Section>
  )
}

export default DashboardHeader