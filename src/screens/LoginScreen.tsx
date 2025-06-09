import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LandingStackParamList} from '../navigation/types';
import {Input} from '../components/Input';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {useThemeStore} from '../store/useThemeStore';
import {useAuthStore} from '../store/useAuthStore';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<LandingStackParamList, 'Login'>;
};

// Test credentials (you can remove these in production)
const TEST_CREDENTIALS = {
  email: 'test@example.com',
  password: 'password123',
};

export const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const theme = useThemeStore(state => state.theme);
  const setAuthenticated = useAuthStore(state => state.setAuthenticated);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const validate = () => {
    const newErrors: {email?: string; password?: string} = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validate()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);

        // Check if test credentials are used
        if (
          email === TEST_CREDENTIALS.email &&
          password === TEST_CREDENTIALS.password
        ) {
          console.log('Login successful with test credentials');
          setAuthenticated(true); // This will trigger the switch to AuthStack
        } else {
          console.log('Login attempt:', {email, password});
          // Here you would typically show an error for invalid credentials
          console.log('Invalid credentials');
        }
      }, 1500);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logos/kwickly-light-bold-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.subtitle, {color: theme.mutedForeground}]}>
            Sign in to your account to continue
          </Text>
        </View>

        <Card style={styles.card}>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.email}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={[styles.forgotPasswordText, {color: theme.primary}]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <Button
            label="Login"
            onPress={handleLogin}
            isLoading={isLoading}
            fullWidth
            size="lg"
          />
        </Card>

        <View style={styles.footer}>
          <Text style={[styles.footerText, {color: theme.mutedForeground}]}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
            <Text style={[styles.signUpText, {color: theme.primary}]}>
              Sign Up
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
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 160,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  card: {
    padding: 24,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Poppins',
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
  signUpText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
});
