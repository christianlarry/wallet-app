import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store/useStore';
import { COLORS } from '../constants/themes';
import { useNavigation } from '@react-navigation/native';

export const AddAccountScreen = () => {
  const navigation = useNavigation();
  const { addAccount } = useStore();
  
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [type, setType] = useState('Bank'); // Default type

  const handleSave = () => {
    if (!name) return Alert.alert('Error', 'Nama akun wajib diisi');
    
    const initialBalance = parseFloat(balance) || 0;

    addAccount(name, type, initialBalance);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <View style={styles.content}>
        <Text style={styles.title}>Tambah Akun Baru</Text>
        
        <Text style={styles.label}>Nama Akun</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Contoh: BCA, GoPay, Dana"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Saldo Awal</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="numeric"
          placeholder="0"
          value={balance}
          onChangeText={setBalance}
        />

        <Text style={styles.label}>Tipe Akun</Text>
        <View style={styles.typeContainer}>
          {['Bank', 'E-Wallet', 'Cash', 'Investasi'].map((item) => (
            <TouchableOpacity 
              key={item}
              style={[styles.typeButton, type === item && styles.activeType]}
              onPress={() => setType(item)}
            >
              <Text style={[styles.typeText, type === item && styles.activeTypeText]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Simpan Akun</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, marginBottom: 24 },
  
  label: { fontSize: 16, color: COLORS.muted, marginBottom: 8 },
  input: { 
    backgroundColor: 'white', borderRadius: 10, padding: 14, fontSize: 16,
    marginBottom: 20, borderWidth: 1, borderColor: '#eee'
  },
  
  typeContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 30 },
  typeButton: { 
    paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, 
    backgroundColor: '#e0e0e0', marginBottom: 8
  },
  activeType: { backgroundColor: COLORS.primary },
  typeText: { color: COLORS.primary },
  activeTypeText: { color: 'white', fontWeight: 'bold' },

  saveButton: { 
    backgroundColor: COLORS.secondary, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10
  },
  saveText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});
