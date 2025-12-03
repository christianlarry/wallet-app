import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { DashboardScreen } from '../screens/DashboardScreen';
import { AddTransactionScreen } from '../screens/AddTransactionScreen';
import { AddAccountScreen } from '../screens/AddAccountScreen';
import { COLORS } from '../constants/themes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
              headerTintColor: COLORS.primary,
              headerTitleStyle: { fontWeight: 'bold' }
          }}
        >
          <Stack.Screen 
              name="Dashboard" 
              component={DashboardScreen} 
              options={{ headerShown: false }} 
          />
          <Stack.Screen 
              name="AddTransaction" 
              component={AddTransactionScreen} 
              options={{ title: 'Tambah Transaksi' }} 
          />
          <Stack.Screen 
              name="AddAccount" 
              component={AddAccountScreen} 
              options={{ title: 'Tambah Akun Baru' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
};