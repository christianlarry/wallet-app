import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store/useStore';
import { COLORS } from '../constants/themes';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../constants/globalStyles';
import BalanceCard from '../components/organisms/cards/BalanceCard';
import DashboardHeader from '../components/organisms/sections/dashboard/DashboardHeader';
import Main from '../components/templates/Main';
import AccountList from '../components/organisms/sections/dashboard/AccountList';
import TransactionHistory from '../components/organisms/sections/dashboard/TransactionHistory';

export const DashboardScreen = () => {
  const { accounts, totalNetWorth, loadData, transactions } = useStore();
  const navigation = useNavigation<any>();

  useEffect(() => {
    loadData();
  }, []);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR'}).format(num);
  };

  return (
    <SafeAreaView style={globalStyles.screenContainer} edges={['top', 'left', 'right']}>
      <Main>
        {/* Header */}
        <DashboardHeader />
        
        {/* Header Net Worth */}
        <BalanceCard/>

        {/* Section Daftar Akun Kamu */}
        <AccountList/>

        {/* Section Riwayat Transaksi */}
        <TransactionHistory/>

        {/* History Singkat */}
        <Text style={styles.sectionTitle}>Transaksi Terakhir</Text>
        <FlatList
            data={transactions.slice(0, 5)} // Ambil 5 terakhir
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View style={styles.transactionItem}>
                <View>
                    <Text style={styles.txNote}>{item.note || 'Tanpa Catatan'}</Text>
                    <Text style={styles.txDate}>{new Date(item.date).toLocaleDateString()}</Text>
                </View>
                <Text style={[
                    styles.txAmount, 
                    { color: item.type === 'INCOME' ? 'green' : 'red' }
                ]}>
                {item.type === 'INCOME' ? '+' : '-'} {formatRupiah(item.amount)}
                </Text>
            </View>
            )}
        />

        {/* Floating Action Button (FAB) */}
        <TouchableOpacity 
            style={styles.fab}
            onPress={() => navigation.navigate('AddTransaction')}
        >
            <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </Main>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: 20 },
  headerCard: {
    backgroundColor: COLORS.white,
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  label: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 4 },
  netWorth: { color: 'white', fontSize: 32, fontWeight: 'bold' },
  
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginBottom: 12, marginTop: 10 },
  
  accountContainer: { height: 130 },
  accountList: { flexGrow: 0, marginBottom: 20 },
  accountCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    width: 140,
    height: 110,
    justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2
  },
  addAccountCard: {
    backgroundColor: '#e0e0e0',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    width: 80,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addAccountText: { color: COLORS.primary, fontWeight: 'bold' },

  accountName: { fontWeight: 'bold', fontSize: 16, color: COLORS.primary },
  accountType: { fontSize: 12, color: COLORS.muted, marginBottom: 8 },
  accountBalance: { fontSize: 14, fontWeight: '600', color: COLORS.primary },

  transactionItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: 'white', padding: 16, borderRadius: 10, marginBottom: 8
  },
  txNote: { fontSize: 16, color: COLORS.primary },
  txDate: { fontSize: 12, color: COLORS.muted },
  txAmount: { fontWeight: 'bold' },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: { fontSize: 32, color: 'white', marginTop: -4 }
});