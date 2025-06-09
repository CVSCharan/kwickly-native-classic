import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
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
import {DrawerParamList} from './types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator<DrawerParamList>();
const {width} = Dimensions.get('window');

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {theme} = useThemeStore();
  const {logo} = useThemeAssets();
  const logout = useAuthStore(state => state.logout);
  const insets = useSafeAreaInsets();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : insets.top,
      }}
      style={styles.drawer}>
      <View style={styles.drawerHeader}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
      </View>

      <View style={styles.drawerSection}>
        <Text
          style={[styles.drawerSectionTitle, {color: theme.mutedForeground}]}>
          OPERATIONS
        </Text>
        <DrawerItemList {...props} />
      </View>

      <View style={[styles.drawerSection, {borderTopColor: theme.border}]}>
        <Text
          style={[styles.drawerSectionTitle, {color: theme.mutedForeground}]}>
          ACCOUNT
        </Text>
        <TouchableOpacity style={styles.drawerItem} onPress={() => {}}>
          <Icon
            name="person-outline"
            size={wp('5%')}
            color={theme.foreground}
          />
          <Text style={[styles.drawerItemText, {color: theme.foreground}]}>
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => {}}>
          <Icon
            name="notifications-outline"
            size={wp('5%')}
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
        <Icon
          name="log-out-outline"
          size={wp('5%')}
          color={theme.destructive}
        />
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
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.background,
          width: Math.min(width * 0.85, 360),
        },
        drawerActiveBackgroundColor: theme.primary + '15',
        drawerActiveTintColor: theme.primary,
        drawerInactiveTintColor: theme.foreground,
        drawerItemStyle: {
          borderRadius: wp('2%'),
          paddingHorizontal: wp('2%'),
          marginHorizontal: wp('3%'),
        },
        drawerLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: wp('3.8%'),
          marginLeft: -wp('4%'),
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          drawerIcon: ({color}) => (
            <Icon name="grid-outline" size={wp('5%')} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: 'Orders',
          drawerIcon: ({color}) => (
            <Icon name="receipt-outline" size={wp('5%')} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          drawerIcon: ({color}) => (
            <Icon name="settings-outline" size={wp('5%')} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
  },
  drawerHeader: {
    padding: wp('6%'),
  },
  logoContainer: {
    width: wp('30%'),
    height: wp('10%'),
    marginBottom: hp('1%'),
    marginTop: hp('1%'),
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  restaurantName: {
    fontSize: wp('5%'),
    fontFamily: 'Poppins-Bold',
    marginBottom: hp('0.5%'),
  },
  restaurantAddress: {
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Medium',
  },
  drawerSection: {
    paddingTop: hp('2%'),
    borderTopWidth: 1,
  },
  drawerSectionTitle: {
    fontSize: wp('3%'),
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 1.2,
    paddingHorizontal: wp('6%'),
    marginBottom: hp('1%'),
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('4%'),
    paddingHorizontal: wp('6%'),
    marginHorizontal: wp('3%'),
    borderRadius: wp('2%'),
  },
  drawerItemText: {
    marginLeft: wp('4%'),
    fontSize: wp('3.8%'),
    fontFamily: 'Poppins-Medium',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('4%'),
    paddingHorizontal: wp('6%'),
    marginTop: 'auto',
    borderTopWidth: 1,
  },
  logoutText: {
    marginLeft: wp('4%'),
    fontSize: wp('3.8%'),
    fontFamily: 'Poppins-SemiBold',
  },
});
