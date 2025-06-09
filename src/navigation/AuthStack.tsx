import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DrawerNavigator} from './DrawerNavigator';
import {AuthStackParamList} from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MainTabs" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};
