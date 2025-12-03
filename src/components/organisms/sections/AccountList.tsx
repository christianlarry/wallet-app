import { FlatList, StyleSheet, View } from "react-native"
import Section from "../../molecules/Section"
import { useNavigation } from "@react-navigation/native"
import { useStore } from "../../../store/useStore"
import { globalStyles } from "../../../constants/globalStyles"
import { SPACING } from "../../../constants/themes"
import AccountCard from "../cards/AccountCard"
import AddAccountCard from "../cards/AddAccountCard"
import { Account } from "../../../types"

const AccountList = () => {

  const navigation = useNavigation<any>()
  const { accounts } = useStore()

  const handleCreateNewAccount = () => {
    navigation.navigate("AddAccount")
  }

  const handleAccountPress = (account: Account) => {
    // TODO: Navigate to account detail screen
    console.log('Account pressed:', account.name)
  }

  return (
    <Section
      heading={{
        title: "Uang Kamu",
        action: {
          label: "Lihat Semua",
          onPress: handleCreateNewAccount
        }
      }}
    >

      <View style={globalStyles.fullWidthBleed}>
        <FlatList
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
    paddingVertical: SPACING.sm // Memberi ruang untuk shadow
  }
})

export default AccountList