import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../constants/colors';
import { MyButton } from '../components/MyButton';

export const HomeScreen = () => {
  const handlePress = () => {
    Alert.alert('Saldo', 'Saldo Anda saat ini adalah Rp 500.000');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.welcomeText}>Selamat Datang di Wallet App</Text>
        <Text style={styles.balanceLabel}>Total Saldo</Text>
        <Text style={styles.balanceValue}>Rp 1.500.000</Text>
      </View>

      <View style={styles.actionContainer}>
        <Text style={styles.sectionTitle}>Aksi Cepat</Text>
        <MyButton title="Cek Detail Saldo" onPress={handlePress} />
        <MyButton title="Top Up" onPress={() => Alert.alert('Info', 'Fitur Top Up segera hadir!')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    paddingTop: 60, // Memberi ruang untuk status bar
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Shadow untuk Android
  },
  welcomeText: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  actionContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
});
