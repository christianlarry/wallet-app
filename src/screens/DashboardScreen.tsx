import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store/useStore';
import { COLORS, SPACING } from '../constants/themes';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../constants/globalStyles';
import BalanceCard from '../components/organisms/cards/BalanceCard';
import DashboardHeader from '../components/organisms/sections/dashboard/DashboardHeader';
import AccountList from '../components/organisms/sections/dashboard/AccountList';
import TransactionHistory from '../components/organisms/sections/dashboard/TransactionHistory';

export const DashboardScreen = () => {
  const { loadData } = useStore();
  const navigation = useNavigation<any>();
  
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Kita ganti nama state agar lebih akurat: "Jarak Y posisi Balance Card"
  const [stickyThreshold, setStickyThreshold] = useState(0); 

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={globalStyles.screenContainer} edges={['top', 'left', 'right']}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]} // BalanceCard is at index 1
        contentContainerStyle={[globalStyles.scrollContainer,styles.scrollContent]}
        showsVerticalScrollIndicator={false}
      >
        {/* Index 0: Header */}
        <DashboardHeader />

        {/* Index 1: Sticky Balance Card */}
        {/* 
            Kita bungkus dengan View biasa untuk menangkap onLayout.
            Event onLayout akan memberikan koordinat {x, y, width, height}
            relatif terhadap parent scrollview content container.
            
            Nilai e.nativeEvent.layout.y adalah JARAK PASTI dari paling atas
            sampai elemen ini dimulai. Ini otomatis menghitung padding parent,
            tinggi header di atasnya, dan gap diantaranya.
        */}
        <View 
            onLayout={(e) => {
                setStickyThreshold(e.nativeEvent.layout.y);
            }}
            // Penting: ZIndex agar view ini tetap di atas saat sticky (kadang diperlukan di Android)
            style={{ zIndex: 1 }} 
        >
            <BalanceCard 
                scrollY={scrollY} 
                stickyThreshold={stickyThreshold} 
            />
        </View>

        {/* Index 2: Account List */}
        <AccountList/>

        {/* Index 3: Transaction History */}
        <TransactionHistory/>

      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: -SPACING.sm,
    marginTop: SPACING.sm,
    paddingBottom: SPACING.md
  }
});
