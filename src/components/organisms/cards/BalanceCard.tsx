import { Pressable, StyleSheet, View } from "react-native"
import Card from "../../molecules/Card"
import AppText from "../../atoms/AppText"
import { useStore } from "../../../store/useStore"
import { SPACING } from "../../../constants/themes"
import { formatRupiah } from "../../../utils/currencyFormatter"
import Icon from "../../atoms/Icon"
import { Ionicons } from "@expo/vector-icons"
import IconButton from "../../atoms/IconButton"
import { useState } from "react"
import { Button } from "../../atoms/Button"
import { useNavigation } from "@react-navigation/native"

const BalanceCard = () => {

  const {totalNetWorth} = useStore()
  const navigation = useNavigation<any>()
  
  const [isVisible,setIsVisible] = useState<boolean>(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const handleAddTransactionBtnPress = ()=>{
    navigation.navigate("AddTransaction")
  }

  return (
    <Card>

      <View style={styles.contentWrapper}>
        <AppText variant='body' color='mutedForeground'>Your balance</AppText>
        
        <Pressable style={styles.balanceWrapper} onPress={()=>toggleVisibility()}>
          <AppText variant='header' style={styles.balanceText}>
            {isVisible ? formatRupiah(totalNetWorth) : '••••••••'}
          </AppText>
          
          <IconButton variant="ghost" onPress={() => toggleVisibility()}>
            <Icon>
              <Ionicons name={isVisible ? "eye-off-outline" : "eye-outline"}/>
            </Icon>
          </IconButton>
        </Pressable>

        <Button
          title="Add Transaction"
          onPress={handleAddTransactionBtnPress}
        />
        
      </View>

    </Card>
  )
}

const styles = StyleSheet.create({
  contentWrapper: {
    flexDirection: 'column',
    gap: SPACING.xs
  },
  balanceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  balanceText: {
    flex: 1
  }
})

export default BalanceCard