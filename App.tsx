/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaProvider,
  SafeAreaView,
  StatusBar,
} from 'react-native-safe-area-context';
import {ThemeProvider} from './src/theme/ThemeProvider';
import {LandingStack} from './src/navigation/LandingStack';
import {AuthStack} from './src/navigation/AuthStack';

function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ThemeProvider>
      <SafeAreaView className="flex-1 bg-background">
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <SafeAreaProvider>
          <NavigationContainer>
            {isAuthenticated ? <AuthStack /> : <LandingStack />}
          </NavigationContainer>
        </SafeAreaProvider>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
