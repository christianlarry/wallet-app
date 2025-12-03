import { GREETING_SUBTEXT } from "../constants/greetings";

type TimeKey = keyof typeof GREETING_SUBTEXT

const getGreeting = (name: string): { timeKey: TimeKey; greeting: string } => {
  const h = new Date().getHours()

  if (h >= 5 && h < 12)
    return { timeKey: "morning", greeting: `Good Morning, ${name}` }

  if (h >= 12 && h < 16)
    return { timeKey: "afternoon", greeting: `Good Afternoon, ${name}` }

  if (h >= 16 && h < 19)
    return { timeKey: "evening", greeting: `Good Evening, ${name}` }

  if (h >= 19 && h < 23)
    return { timeKey: "night", greeting: `Good Evening, ${name}` }

  if (h >= 23 || h < 2)
    return { timeKey: "lateNight", greeting: `Still awake, ${name}?` }

  return { timeKey: "night", greeting: `Good Night, ${name}` }
}

export const getRandomSubtext = (timeKey: TimeKey): string => {
  const list = GREETING_SUBTEXT[timeKey]
  return list[Math.floor(Math.random() * list.length)]
}

export const getGreetingWithSubtext = (name: string) => {
  const { timeKey, greeting } = getGreeting(name)
  const subtext = getRandomSubtext(timeKey)
  return { greeting, subtext, timeKey }
}