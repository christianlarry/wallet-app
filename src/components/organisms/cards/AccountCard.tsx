import { StyleSheet, View, Pressable, PressableProps, Text } from "react-native"
import { COLORS, SPACING, FONTS } from "../../../constants/themes"
import { getAccountTypeIcon, getAccountTypeColors } from "../../../constants/accountTypes"
import { formatRupiah } from "../../../utils/currencyFormatter"
import { Account } from "../../../types"
import AppText from "../../atoms/AppText"
import Icon from "../../atoms/Icon"
import { Ionicons } from "@expo/vector-icons"

interface AccountCardProps extends Pick<PressableProps, 'onPress'> {
  account: Account
}

const AccountCard = ({ account, onPress }: AccountCardProps) => {
  const { name, type, balance } = account
  const typeColors = getAccountTypeColors(type)
  const typeIcon = getAccountTypeIcon(type)

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: typeColors.bg },
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      {/* Icon Badge */}
      <View style={[styles.iconBadge, { backgroundColor: typeColors.accent }]}>
        <Icon size={18} color="white">
          <Ionicons name={typeIcon as any} />
        </Icon>
      </View>

      {/* Account Info */}
      <View style={styles.infoContainer}>
        <AppText variant="body" style={styles.accountName} numberOfLines={1}>
          {name}
        </AppText>
        <AppText variant="caption" color="mutedForeground">
          {type}
        </AppText>
      </View>

      {/* Balance */}
      <View style={styles.balanceContainer}>
        <AppText variant="headline" style={styles.balanceText} numberOfLines={1} adjustsFontSizeToFit>
          {formatRupiah(balance)}
        </AppText>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 120,
    borderRadius: 16,
    padding: SPACING.md,
    marginRight: SPACING.sm,
    justifyContent: 'space-between',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }]
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    gap: 2
  },
  accountName: {
    fontFamily: FONTS.family.sg_semibold
  },
  balanceContainer: {
    marginTop: 'auto'
  },
  balanceText: {
    fontFamily: FONTS.family.sg_bold,
    color: COLORS.primary
  }
})

export default AccountCard
