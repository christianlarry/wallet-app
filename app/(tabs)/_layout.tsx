import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/themes';
import AppText from '@/components/atoms/AppText';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0, // Hilangkan garis default yang jelek
            height: Platform.OS === 'ios' ? 88 : 70, // Tinggi yang nyaman untuk jari
            paddingBottom: Platform.OS === 'ios' ? 28 : 8,
            paddingTop: 6,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            // Opsional: Buat efek Floating
            // position: 'absolute',
            // bottom: 20,
            // marginHorizontal: 20,
            // borderRadius: 20,
          },
        })
        // animation: "shift"
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          tabBarLabel: ({ children, focused }) => <AppText variant='caption' color={focused ? "primary" : "mutedForeground"}>{children}</AppText>
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
          tabBarLabel: ({ children, focused }) => <AppText variant='caption' color={focused ? "primary" : "mutedForeground"}>{children}</AppText>
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
          tabBarLabel: ({ children, focused }) => <AppText variant='caption' color={focused ? "primary" : "mutedForeground"}>{children}</AppText>
        }}
      />
    </Tabs>
  );
}
