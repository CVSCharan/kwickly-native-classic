import React from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LandingStackParamList} from '../navigation/types';
import {Button} from '../components/Button';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<LandingStackParamList, 'Welcome'>;
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  const {toggleTheme} = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center p-6 animate-in">
        <View className="items-center space-y-6 w-full max-w-sm">
          {/* Logo placeholder - replace with your actual logo */}
          <View className="h-24 w-24 rounded-full bg-primary items-center justify-center mb-4">
            <Text className="text-3xl font-bold text-primary-foreground">
              K
            </Text>
          </View>

          <View className="items-center space-y-2">
            <Text className="text-4xl font-bold text-foreground">Kwickly</Text>
            <Text className="text-xl text-muted-foreground text-center">
              Restaurant POS Admin
            </Text>
          </View>

          <View className="w-full space-y-4 mt-8">
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
      </View>
    </SafeAreaView>
  );
};
