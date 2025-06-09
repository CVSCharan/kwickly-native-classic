import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {TabNavigator} from './TabNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import {useThemeStore} from '../store/useThemeStore';
import {useThemeAssets} from '../hooks/useThemeAssets';
import {useAuthStore} from '../store/useAuthStore';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {theme} = useThemeStore();
  const {logo} = useThemeAssets();
  const logout = useAuthStore(state => state.logout);

  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: theme.background}}>
      <View style={[styles.drawerHeader, {borderBottomColor: theme.border}]}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
        <Text style={[styles.restaurantName, {color: theme.foreground}]}>
          Kwickly Restaurant
        </Text>
        <Text
          style={[styles.restaurantAddress, {color: theme.mutedForeground}]}>
          123 Main Street, City
        </Text>
      </View>

      <DrawerItemList {...props} />

      <TouchableOpacity
        style={[styles.logoutButton, {borderTopColor: theme.border}]}
        onPress={logout}>
        <Icon name="log-out-outline" size={22} color={theme.destructive} />
        <Text style={[styles.logoutText, {color: theme.destructive}]}>
          Logout
        </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export const DrawerNavigator = () => {
  const {theme} = useThemeStore();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        },
        headerTintColor: theme.foreground,
        headerTitleStyle: {
          fontFamily: 'Poppins-SemiBold',
          fontSize: 18,
        },
        drawerStyle: {
          backgroundColor: theme.background,
          width: 320,
        },
        drawerActiveBackgroundColor: theme.primary + '15',
        drawerActiveTintColor: theme.primary,
        drawerInactiveTintColor: theme.foreground,
        drawerLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 15,
          marginLeft: -16,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{
          title: 'Dashboard',
          drawerIcon: ({color, size}) => (
            <Icon name="grid-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 24,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  logoContainer: {
    width: 120,
    height: 80,
    marginBottom: 16,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  restaurantName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  restaurantAddress: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 'auto',
    borderTopWidth: 1,
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});
