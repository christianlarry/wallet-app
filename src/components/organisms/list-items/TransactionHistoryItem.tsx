import { StyleSheet, View } from "react-native"
import AppText from "../../atoms/AppText"
import { Transaction } from "../../../types"
import { formatRupiah } from "../../../utils/currencyFormatter"
import { COLORS, SPACING } from "../../../constants/themes"
import IconButton from "../../atoms/IconButton"
import Icon from "../../atoms/Icon"
import { Ionicons } from "@expo/vector-icons"
import { useStore } from "../../../store/useStore"
import { useCallback, useMemo } from "react"
import { getAccountTypeColors, getAccountTypeIcon } from "../../../constants/accountTypes"
import AccountBadge from "../badges/AccountBadge"

interface TransactionHistoryItemProps{
  item: Transaction
  last?: boolean
}

const TransactionHistoryItem = ({ item, last=false }: TransactionHistoryItemProps) => {

  const {accounts} = useStore()

  const account = accounts.find(acc => acc.id === item.account_id)

  const accountBadge = useMemo(():{ typeIcon: string, color: string } => {

    if(!account) return { typeIcon: 'wallet-outline', color: COLORS.primary }
    const typeColors = getAccountTypeColors(account.type)
    const typeIcon = getAccountTypeIcon(account.type)

    return { typeIcon, color: typeColors.accent }
  }, [accounts, item.account_id])

  return (
    <View style={styles.itemContainer}>
      <AccountBadge
        variant="outline"
        type={accountBadge.typeIcon}
        colors={accountBadge.color}
      />

      <View style={styles.itemRightBox}>
        <View style={styles.itemWrapper}>
          <View style={styles.itemLeft}>
            <AppText>{item.note || 'Tanpa Catatan'}</AppText>
            <AppText variant="caption">{new Date(item.date).toLocaleDateString()}</AppText>
          </View>
          <View style={styles.itemRight}>  
            <AppText 
              adjustsFontSizeToFit 
              numberOfLines={1} 
              style={styles.amountText}
              color={item.type === 'INCOME' ? 'success' : 'error'}
            >
              {item.type === 'INCOME' ? '+' : '-'} {formatRupiah(item.amount)}
            </AppText>
            <AppText
              variant="caption"
            >
              {account ? account.name : 'Akun Tidak Ditemukan'}
            </AppText>
          </View>
        </View>

        {!last && <View style={styles.itemSeperator} />}
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    gap: SPACING.sm+2
  },
  itemWrapper: {
    flexDirection: 'row',
    gap: SPACING.md,
    justifyContent: 'space-between'
  },

  itemRightBox:{
    flex: 1
  },

  itemSeperator:{
    height: 1.5,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm+5
  },

  itemLeft:{
    flex: 1,
    gap: SPACING.xs
  },
  itemRight:{
    maxWidth: '40%',
    gap: SPACING.xs,
    alignItems: 'flex-end',
    alignSelf: 'flex-end'
  },
  amountText: {
    textAlign: 'right',
  }
})

export default TransactionHistoryItem