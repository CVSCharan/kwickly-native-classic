import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useThemeStore} from '../store/useThemeStore';
import {useNavigation, DrawerActions} from '@react-navigation/native';

export const MenuButton = () => {
  const {theme} = useThemeStore();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.menuButton, {backgroundColor: theme.background}]}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <Icon name="menu-outline" size={24} color={theme.foreground} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: 48,
    left: 24,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 100,
  },
});
