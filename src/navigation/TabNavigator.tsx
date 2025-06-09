import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {DashboardScreen} from '../screens/authScreens/DashboardScreen';
import {SettingsScreen} from '../screens/authScreens/SettingsScreen';
import {OrdersScreen} from '../screens/authScreens/OrdersScreen';
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
          height: Platform.OS === 'ios' ? 84 : 56,
          paddingBottom: Platform.OS === 'ios' ? 24 : 4,
          paddingTop: 4,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.mutedForeground,
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 11,
          marginTop: -4,
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
