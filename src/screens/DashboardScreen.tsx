import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store/useStore';
import { COLORS } from '../constants/themes';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../constants/globalStyles';
import AppText from '../components/atoms/AppText';
import Card from '../components/molecules/Card';
import BalanceCard from '../components/organisms/cards/BalanceCard';
import IconButton from '../components/atoms/IconButton';
import Icon from '../components/atoms/Icon';
import { Ionicons } from '@expo/vector-icons';
import Section from '../components/molecules/Section';
import DashboardHeader from '../components/organisms/sections/DashboardHeader';

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
      <View style={styles.content}>
        {/* Header */}
        <DashboardHeader />
        
        {/* Header Net Worth */}
        <BalanceCard/>

        <IconButton variant="outline">
          <Icon>
            <Ionicons name="notifications-outline"/>
          </Icon>
        </IconButton>
        
        <Card
          heading={{
            title: 'Transaksi',
            action: { label: 'Semua', onPress: () => console.log('Go to history')}
          }}
        >
          <AppText variant='body'>Stay on top of your finances with our dashboard.</AppText>
        </Card>
        
        <Card>
          <AppText variant='body'>Without Header. Stay on top of your finances with our dashboard.</AppText>
        </Card>

        {/* Daftar Akun */}
        <Text style={styles.sectionTitle}>Akun Saya</Text>
        <View style={styles.accountContainer}>
            <FlatList
            data={accounts}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={() => (
                <TouchableOpacity 
                style={styles.addAccountCard}
                onPress={() => navigation.navigate('AddAccount')}
                >
                <Text style={styles.addAccountText}>+ Akun</Text>
                </TouchableOpacity>
            )}
            renderItem={({ item }) => (
                <View style={styles.accountCard}>
                  <Text style={styles.accountName}>{item.name}</Text>
                  <Text style={styles.accountType}>{item.type}</Text>
                  <Text style={styles.accountBalance}>{formatRupiah(item.balance)}</Text>
                </View>
            )}
            style={styles.accountList}
            />
        </View>

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
      </View>
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