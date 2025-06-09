import React, {useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LandingStackParamList} from '../navigation/types';
import {Input} from '../components/Input';
import {Button} from '../components/Button';
import {Card} from '../components/Card';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<LandingStackParamList, 'Login'>;
};

export const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
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
        console.log('Login:', {email, password});
        // Navigate to Dashboard or show error
      }, 1500);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-6 justify-center animate-in">
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-foreground">Welcome Back</Text>
          <Text className="text-muted-foreground mt-2 text-center">
            Sign in to your account to continue
          </Text>
        </View>

        <Card className="p-6">
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

          <TouchableOpacity className="self-end mb-4">
            <Text className="text-sm text-primary">Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            label="Login"
            onPress={handleLogin}
            isLoading={isLoading}
            fullWidth
            size="lg"
          />
        </Card>

        <View className="flex-row justify-center mt-6">
          <Text className="text-muted-foreground">Don't have an account? </Text>
          <TouchableOpacity>
            <Text className="text-primary font-medium">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
