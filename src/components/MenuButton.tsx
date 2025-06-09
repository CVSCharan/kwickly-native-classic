import React from 'react';
import {TouchableOpacity, StyleSheet, Platform, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useThemeStore} from '../store/useThemeStore';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const MenuButton = () => {
  const {theme} = useThemeStore();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

  return (
    <TouchableOpacity
      style={[
        styles.menuButton,
        {
          backgroundColor: theme.background,
          shadowColor: theme.foreground,
          top:
            Platform.OS === 'ios'
              ? insets.top + hp('2%')
              : statusBarHeight + hp('2%'),
        },
      ]}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <Icon name="menu-outline" size={wp('5.5%')} color={theme.foreground} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    left: wp('5%'),
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('2.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
    zIndex: 100,
  },
});
