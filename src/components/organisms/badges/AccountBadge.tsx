import { StyleSheet, View } from "react-native";
import Icon from "../../atoms/Icon";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/themes";

type VariantType = 'default' | 'outline';

interface AccountBadgeProps {
  type: string;
  colors: string;
  variant?: VariantType;
}

const AccountBadge = ({ type, colors, variant = 'default' }: AccountBadgeProps) => {
  return (
    <View style={[
      styles.iconBadge, 
      { backgroundColor: colors },
      variant === 'outline' && styles.outline
      ]}>
      <Icon size={18} color={variant === 'outline' ? "primary" : "white"}>
        <Ionicons name={type as any} />
      </Icon>
    </View>
  )
}

const styles = StyleSheet.create({
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  outline: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: 'transparent'
  }
})

export default AccountBadge;