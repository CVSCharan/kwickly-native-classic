import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {DashboardScreen} from '../screens/authScreens/DashboardScreen';
import {OrdersScreen} from '../screens/authScreens/OrdersScreen';
import {SettingsScreen} from '../screens/authScreens/SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {useThemeStore} from '../store/useThemeStore';
import {useThemeAssets} from '../hooks/useThemeAssets';
import {useAuthStore} from '../store/useAuthStore';

const Drawer = createDrawerNavigator();
const {width} = Dimensions.get('window');

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

      <View style={styles.drawerSection}>
        <Text
          style={[styles.drawerSectionTitle, {color: theme.mutedForeground}]}>
          MAIN MENU
        </Text>
        <DrawerItemList {...props} />
      </View>

      <View style={[styles.drawerSection, {borderTopColor: theme.border}]}>
        <Text
          style={[styles.drawerSectionTitle, {color: theme.mutedForeground}]}>
          ACCOUNT
        </Text>
        <TouchableOpacity style={styles.drawerItem} onPress={() => {}}>
          <Icon name="person-outline" size={22} color={theme.foreground} />
          <Text style={[styles.drawerItemText, {color: theme.foreground}]}>
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => {}}>
          <Icon
            name="notifications-outline"
            size={22}
            color={theme.foreground}
          />
          <Text style={[styles.drawerItemText, {color: theme.foreground}]}>
            Notifications
          </Text>
        </TouchableOpacity>
      </View>

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
          width: Math.min(width * 0.85, 360),
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
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          drawerIcon: ({color, size}) => (
            <Icon name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: 'Orders',
          drawerIcon: ({color, size}) => (
            <Icon name="receipt-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          drawerIcon: ({color, size}) => (
            <Icon name="settings-outline" size={size} color={color} />
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
  drawerSection: {
    paddingTop: 16,
    borderTopWidth: 1,
  },
  drawerSectionTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 1.2,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingLeft: 24,
  },
  drawerItemText: {
    marginLeft: 32,
    fontSize: 15,
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
