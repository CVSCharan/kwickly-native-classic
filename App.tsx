/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useColorScheme} from 'react-native';
import {LandingStack} from './src/navigation/LandingStack';
import {AuthStack} from './src/navigation/AuthStack';
import {useThemeStore} from './src/store/useThemeStore';
import {useAuthStore} from './src/store/useAuthStore';

function App(): React.ReactElement {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const systemColorScheme = useColorScheme();
  const setTheme = useThemeStore(state => state.setTheme);

  // Handle system theme changes
  useEffect(() => {
    setTheme(systemColorScheme === 'dark');
  }, [systemColorScheme, setTheme]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? <AuthStack /> : <LandingStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
