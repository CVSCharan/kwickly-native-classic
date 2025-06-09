import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {DashboardScreen} from '../screens/DashboardScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {OrdersScreen} from '../screens/OrdersScreen';
import {useThemeStore} from '../store/useThemeStore';
import {Platform} from 'react-native';

export type TabParamList = {
  Dashboard: undefined;
  Orders: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const renderTabIcon =
  (name: string) =>
  ({color, size}: {color: string; size: number}) =>
    <Icon name={name} size={size} color={color} />;

export const TabNavigator = () => {
  const {theme} = useThemeStore();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.mutedForeground,
        tabBarLabelStyle: {
          fontFamily: 'Poppins',
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: renderTabIcon('grid-outline'),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: renderTabIcon('receipt-outline'),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: renderTabIcon('settings-outline'),
        }}
      />
    </Tab.Navigator>
  );
};
