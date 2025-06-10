/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useColorScheme} from 'react-native';
import {useThemeStore} from './src/store/useThemeStore';
import {useAuthStore} from './src/store/useAuthStore';
import {RootNavigator} from './src/navigation/RootNavigator';
import 'react-native-gesture-handler';
import {orientationService} from './src/services/OrientationService';

function App(): React.ReactElement {
  const systemColorScheme = useColorScheme();
  const updateSystemTheme = useThemeStore(state => state.updateSystemTheme);
  const initialize = useAuthStore(state => state.initialize);

  // Handle system theme changes
  useEffect(() => {
    updateSystemTheme(systemColorScheme === 'dark');
  }, [systemColorScheme, updateSystemTheme]);

  // Initialize auth state
  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    // Initialize orientation service
    orientationService.initialize();
  }, []);

  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
