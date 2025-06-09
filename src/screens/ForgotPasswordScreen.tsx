import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LandingStackParamList} from '../navigation/types';
import {Input} from '../components/Input';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {useThemeStore} from '../store/useThemeStore';
import {useThemeAssets} from '../hooks/useThemeAssets';
import Icon from 'react-native-vector-icons/Ionicons';

type ForgotPasswordScreenProps = {
  navigation: NativeStackNavigationProp<
    LandingStackParamList,
    'ForgotPassword'
  >;
};

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const theme = useThemeStore(state => state.theme);
  const {logo} = useThemeAssets();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demo purposes, we'll just show success
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to send reset instructions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color={theme.foreground} />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          </View>
          <Text style={[styles.title, {color: theme.foreground}]}>
            Reset Password
          </Text>
          <Text style={[styles.subtitle, {color: theme.mutedForeground}]}>
            Enter your email address and we'll send you instructions to reset
            your password.
          </Text>
        </View>

        {!isSuccess ? (
          <Card style={styles.card}>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={text => {
                setEmail(text);
                setError('');
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              error={error}
            />

            <Button
              label="Send Reset Instructions"
              onPress={handleResetPassword}
              isLoading={isLoading}
              fullWidth
              size="lg"
            />
          </Card>
        ) : (
          <Card style={styles.card}>
            <View style={styles.successContainer}>
              <View
                style={[styles.successIcon, {backgroundColor: theme.primary}]}>
                <Icon name="mail-outline" size={32} color="#ffffff" />
              </View>
              <Text style={[styles.successTitle, {color: theme.foreground}]}>
                Check Your Email
              </Text>
              <Text
                style={[styles.successMessage, {color: theme.mutedForeground}]}>
                We've sent password reset instructions to your email address.
              </Text>
              <Button
                label="Back to Login"
                onPress={() => navigation.navigate('Login')}
                variant="secondary"
                fullWidth
                size="lg"
              />
            </View>
          </Card>
        )}

        <View style={styles.footer}>
          <Text style={[styles.footerText, {color: theme.mutedForeground}]}>
            Remember your password?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.loginText, {color: theme.primary}]}>
              Login
            </Text>
          </TouchableOpacity>
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
    padding: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 120,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginHorizontal: 24,
  },
  card: {
    padding: 24,
  },
  successContainer: {
    alignItems: 'center',
    padding: 16,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
});
