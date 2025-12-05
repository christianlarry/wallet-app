import { View, ViewProps } from "react-native"
import { globalStyles } from "../../constants/globalStyles"

interface MainProps extends Pick<ViewProps, 'style' | 'children'> { }

const Main = ({
  children,
  style
}: MainProps) => {
  return (
    <View style={[globalStyles.contentWrapper, style]}>
      {children}
    </View>
  )
}

export default Main