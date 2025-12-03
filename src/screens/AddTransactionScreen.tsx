import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store/useStore';
import { COLORS } from '../constants/themes';
import { useNavigation } from '@react-navigation/native';

export const AddTransactionScreen = () => {
  const navigation = useNavigation();
  const { addTransaction, accounts } = useStore();
  
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');

  const handleSave = () => {
    if (!amount) return Alert.alert('Error', 'Masukkan jumlah uang');
    
    // Default ke akun pertama untuk simplicitas MVP
    const defaultAccount = accounts[0]; 
    if (!defaultAccount) return Alert.alert('Error', 'Belum ada akun!');

    addTransaction({
      amount: parseFloat(amount),
      note,
      type,
      date: Date.now(),
      account_id: defaultAccount.id,
    });

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <View style={styles.content}>
        <Text style={styles.label}>Nominal</Text>
        <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            placeholder="0"
            value={amount}
            onChangeText={setAmount}
        />

        <Text style={styles.label}>Catatan</Text>
        <TextInput 
            style={styles.input} 
            placeholder="Beli makan siang..."
            value={note}
            onChangeText={setNote}
        />

        <View style={styles.switchContainer}>
            <TouchableOpacity 
                style={[styles.typeButton, type === 'EXPENSE' && styles.activeExpense]}
                onPress={() => setType('EXPENSE')}
            >
                <Text style={[styles.typeText, type === 'EXPENSE' && styles.activeText]}>Pengeluaran</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.typeButton, type === 'INCOME' && styles.activeIncome]}
                onPress={() => setType('INCOME')}
            >
                <Text style={[styles.typeText, type === 'INCOME' && styles.activeText]}>Pemasukan</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Simpan Transaksi</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  content: { padding: 20 },
  label: { fontSize: 16, color: COLORS.muted, marginBottom: 8 },
  input: { 
    fontSize: 24, borderBottomWidth: 1, borderBottomColor: '#ddd', 
    paddingVertical: 8, marginBottom: 24, fontWeight: 'bold'
  },
  switchContainer: { flexDirection: 'row', marginBottom: 30 },
  typeButton: { 
    flex: 1, padding: 12, alignItems: 'center', borderRadius: 8, 
    backgroundColor: '#f0f0f0', marginHorizontal: 4 
  },
  activeExpense: { backgroundColor: '#ffebee' }, // Merah muda
  activeIncome: { backgroundColor: '#e8f5e9' }, // Hijau muda
  typeText: { fontWeight: '600', color: COLORS.muted },
  activeText: { color: COLORS.primary },
  
  saveButton: { 
    backgroundColor: COLORS.primary, padding: 16, borderRadius: 12, alignItems: 'center' 
  },
  saveText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});