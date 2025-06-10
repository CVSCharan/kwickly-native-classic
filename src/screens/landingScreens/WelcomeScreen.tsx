import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useThemeStore} from '../../store/useThemeStore';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LandingStackParamList} from '../../navigation/types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeAssets} from '../../hooks/useThemeAssets';
import {useOrientationLock} from '../../hooks/useOrientationLock';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<LandingStackParamList, 'Welcome'>;
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  useOrientationLock();
  const {theme} = useThemeStore();
  const {logo} = useThemeAssets();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [navigation]);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
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
  },
  logoContainer: {
    width: 200,
    height: 120,
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Poppins',
  },
});
