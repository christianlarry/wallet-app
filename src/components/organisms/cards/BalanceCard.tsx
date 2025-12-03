import { StyleSheet, View } from "react-native"
import Card from "../../molecules/Card"
import AppText from "../../atoms/AppText"
import { useStore } from "../../../store/useStore"
import { SPACING } from "../../../constants/themes"
import { formatRupiah } from "../../../utils/currencyFormatter"

const BalanceCard = () => {

  const {totalNetWorth} = useStore()

  return (
    <Card>

      <View style={styles.contentWrapper}>
        <AppText variant='body' color='mutedForeground'>Your balance</AppText>
        <View>
          <AppText variant='title'>{formatRupiah(totalNetWorth)}</AppText>
        </View>
      </View>

    </Card>
  )
}

const styles = StyleSheet.create({
  contentWrapper: {
    flexDirection: 'column',
    gap: SPACING.xs
  }
})

export default BalanceCard