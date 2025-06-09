import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LandingStackParamList} from '../navigation/types';
import {Button} from '../components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<LandingStackParamList, 'Welcome'>;
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  const {toggleTheme, theme} = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.content}>
        {/* Logo placeholder - replace with your actual logo */}
        <View style={[styles.logo, {backgroundColor: theme.primary}]}>
          <Text style={[styles.logoText, {color: theme.primaryForeground}]}>
            K
          </Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={[styles.title, {color: theme.foreground}]}>Kwickly</Text>
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
  logo: {
    height: 96,
    width: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
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
