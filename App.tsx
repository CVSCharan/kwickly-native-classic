/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from './src/theme/ThemeProvider';
import {LandingStack} from './src/navigation/LandingStack';
import {AuthStack} from './src/navigation/AuthStack';

function App(): React.ReactElement {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          {isAuthenticated ? <AuthStack /> : <LandingStack />}
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;
