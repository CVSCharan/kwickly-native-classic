import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LandingStackParamList} from '../navigation/types';
import {Button} from '../components/Button';
import {ScreenWrapper} from '../components/layout/ScreenWrapper';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<LandingStackParamList, 'Welcome'>;
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  const {toggleTheme, theme} = useTheme();

  return (
    <ScreenWrapper>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}>
        <View
          style={{alignItems: 'center', gap: 24, width: '100%', maxWidth: 350}}>
          {/* Logo placeholder - replace with your actual logo */}
          <View
            style={{
              height: 96,
              width: 96,
              borderRadius: 48,
              backgroundColor: theme.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
            <Text
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: theme.primaryForeground,
              }}>
              K
            </Text>
          </View>

          <View style={{alignItems: 'center', gap: 8}}>
            <Text
              style={{
                fontSize: 36,
                fontWeight: 'bold',
                color: theme.foreground,
                fontFamily: 'Poppins-Bold',
              }}>
              Kwickly
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: theme.mutedForeground,
                textAlign: 'center',
                fontFamily: 'Poppins',
              }}>
              Restaurant POS Admin
            </Text>
          </View>

          <View style={{width: '100%', gap: 16, marginTop: 32}}>
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
    </ScreenWrapper>
  );
};
