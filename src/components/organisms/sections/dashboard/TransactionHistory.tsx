import { useStore } from "../../../../store/useStore"
import Card from "../../../molecules/Card"
import TransactionHistoryLists from "../../lists/TransactionHistoryLists"

const TransactionHistory = () => {

  const { transactions } = useStore()

  return (
    <Card
      heading={{
        title: 'Last Transactions',
        action: { label: 'See All', onPress: () => console.log('Go to history') }
      }}
    >
      <TransactionHistoryLists transactions={transactions.slice(0,5) } />
    </Card>
  )
}

export default TransactionHistory