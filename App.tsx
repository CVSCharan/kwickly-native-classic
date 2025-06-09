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

function App(): React.ReactElement {
  const systemColorScheme = useColorScheme();
  const setTheme = useThemeStore(state => state.setTheme);
  const initialize = useAuthStore(state => state.initialize);

  // Handle system theme changes
  useEffect(() => {
    setTheme(systemColorScheme === 'dark');
  }, [systemColorScheme, setTheme]);

  // Initialize auth state
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
