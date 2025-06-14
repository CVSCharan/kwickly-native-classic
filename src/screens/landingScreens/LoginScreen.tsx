import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LandingStackParamList} from '../../navigation/types';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import {Card} from '../../components/Card';
import {useThemeStore} from '../../store/useThemeStore';
import {useAuthStore} from '../../store/useAuthStore';
import {useThemeAssets} from '../../hooks/useThemeAssets';
import {useOrientationLock} from '../../hooks/useOrientationLock';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<LandingStackParamList, 'Login'>;
};

export const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  useOrientationLock();
  const theme = useThemeStore(state => state.theme);
  const login = useAuthStore(state => state.login);
  const {logo} = useThemeAssets();
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

  const handleLogin = async () => {
    if (validate()) {
      try {
        setIsLoading(true);
        await login(email, password);
      } catch (error) {
        Alert.alert(
          'Login Failed',
          error instanceof Error ? error.message : 'Invalid credentials',
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
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

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}>
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

          <View style={styles.dividerContainer}>
            <View style={[styles.divider, {backgroundColor: theme.border}]} />
            <Text style={[styles.dividerText, {color: theme.mutedForeground}]}>
              or
            </Text>
            <View style={[styles.divider, {backgroundColor: theme.border}]} />
          </View>

          <TouchableOpacity
            style={[styles.googleButton, {borderColor: theme.border}]}
            onPress={() => {
              /* Google auth logic here */
            }}>
            <Icon name="logo-google" size={24} color={theme.foreground} />
            <Text style={[styles.googleButtonText, {color: theme.foreground}]}>
              Continue with Google
            </Text>
          </TouchableOpacity>
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
    marginBottom: 16,
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
    letterSpacing: 0.3,
  },
  card: {
    padding: 24,
    gap: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    letterSpacing: 0.2,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Poppins',
    letterSpacing: 0.2,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    gap: 12,
  },

  googleButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    letterSpacing: 0.2,
  },
  signUpText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.2,
  },
});
