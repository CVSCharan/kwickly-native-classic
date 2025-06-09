import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useThemeStore} from '../store/useThemeStore';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LandingStackParamList} from '../navigation/types';
import {Button} from '../components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<LandingStackParamList, 'Welcome'>;
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  const {theme, toggleTheme} = useThemeStore();

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logos/kwickly-light-bold-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={[styles.subtitle, {color: theme.mutedForeground}]}>
            Restaurant POS Admin
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="Get Started"
            onPress={() => navigation.navigate('Login')}
            variant="primary"
            size="lg"
            fullWidth
          />

          <Button
            label="Toggle Theme"
            onPress={toggleTheme}
            variant="outline"
            size="md"
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    width: 120,
    height: 120,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 350,
    gap: 16,
  },
});
