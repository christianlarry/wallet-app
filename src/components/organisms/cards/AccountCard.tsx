import { StyleSheet, View, Pressable, PressableProps, Text } from "react-native"
import { COLORS, SPACING, FONTS } from "../../../constants/themes"
import { getAccountTypeIcon, getAccountTypeColors } from "../../../constants/accountTypes"
import { formatRupiah } from "../../../utils/currencyFormatter"
import { Account } from "../../../types"
import AppText from "../../atoms/AppText"
import AccountBadge from "../badges/AccountBadge"

interface AccountCardProps extends Pick<PressableProps, 'onPress'> {
  account: Account
  balanceVisible?: boolean
}

const AccountCard = ({ account, balanceVisible = true, onPress }: AccountCardProps) => {
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
      <View style={styles.cardHeader}>
        {/* Account Info */}
        <View style={styles.infoContainer}>
          <AppText variant="body" style={styles.accountName} numberOfLines={1}>
            {name}
          </AppText>
          <AppText variant="caption" color="mutedForeground">
            {type}
          </AppText>
        </View>

        {/* Icon Badge */}
        <AccountBadge
          type={typeIcon}
          colors={typeColors.accent}
        />
      </View>

      {/* Balance */}
      <View style={styles.balanceContainer}>
        <AppText variant="headline" style={styles.balanceText} numberOfLines={1} adjustsFontSizeToFit>
          {balanceVisible ? formatRupiah(balance) : '••••••••'}
        </AppText>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 120,
    borderRadius: 16,
    padding: SPACING.md,
    marginRight: SPACING.md,
    justifyContent: 'space-between',
    // Shadow
    shadowColor: '#535353ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }]
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
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md
  }
})

export default AccountCard
