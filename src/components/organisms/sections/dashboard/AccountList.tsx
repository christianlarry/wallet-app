import { StyleSheet, View } from "react-native"
import Section from "../../../molecules/Section"
import { useRouter } from "expo-router"
import { useStore } from "../../../../store/useStore"
import { globalStyles } from "../../../../constants/globalStyles"
import { SPACING } from "../../../../constants/themes"
import AccountCard from "../../cards/AccountCard"
import AddAccountCard from "../../cards/AddAccountCard"
import { Account } from "../../../../types"
import { FlashList } from "@shopify/flash-list"

const AccountList = () => {

  const router = useRouter()
  const { accounts, isBalanceVisible } = useStore()

  const handleCreateNewAccount = () => {
    router.push("/add-account")
  }

  const handleAccountPress = (account: Account) => {
    // TODO: Navigate to account detail screen
    console.log('Account pressed:', account.name)
  }

  return (
    <Section
      heading={{
        title: "Your Accounts",
        action: {
          label: "+ Add Account",
          onPress: handleCreateNewAccount
        }
      }}
    >

      <View style={globalStyles.fullWidthBleed}>
        <FlashList
          data={accounts}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={() => (
            <AddAccountCard onPress={handleCreateNewAccount} />
          )}
          renderItem={({ item }) => (
            <AccountCard 
              account={item} 
              onPress={() => handleAccountPress(item)}
              balanceVisible={isBalanceVisible}
            />
          )}
          style={styles.accountList}
        />
      </View>

    </Section>
  )
}

const styles = StyleSheet.create({
  accountList: {
    flexGrow: 0
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm, // Memberi ruang untuk shadow
  }
})

export default AccountList