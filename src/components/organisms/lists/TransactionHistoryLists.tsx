
import { Transaction } from "../../../types"
import TransactionHistoryItem from "../list-items/TransactionHistoryItem"
import { FlatList } from "react-native"

interface TransactionHistoryListsProps {
  transactions: Transaction[]
}

const TransactionHistoryLists = ({
  transactions = []
}: TransactionHistoryListsProps) => {
  return (
    <FlatList
      scrollEnabled={false}
      data={transactions}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <TransactionHistoryItem item={item} last={index === transactions.length - 1} />
      )}
    />
  )
}

export default TransactionHistoryLists