import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WelcomeScreen} from '../screens/landingScreens/WelcomeScreen';
import {LoginScreen} from '../screens/landingScreens/LoginScreen';
import {ForgotPasswordScreen} from '../screens/landingScreens/ForgotPasswordScreen';
import {LandingStackParamList} from './types';

const Stack = createNativeStackNavigator<LandingStackParamList>();

export const LandingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};
