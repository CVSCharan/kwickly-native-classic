import React from 'react';
import {TouchableOpacity, StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useThemeStore} from '../store/useThemeStore';
import {useNavigation, DrawerActions} from '@react-navigation/native';

export const MenuButton = () => {
  const {theme} = useThemeStore();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        styles.menuButton,
        {
          backgroundColor: theme.background,
          shadowColor: theme.foreground,
        },
      ]}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <Icon name="menu-outline" size={22} color={theme.foreground} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 12,
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
