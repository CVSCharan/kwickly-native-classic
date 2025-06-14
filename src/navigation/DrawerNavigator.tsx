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
import {ProfileScreen} from '../screens/authScreens/ProfileScreen';
import {NotificationsScreen} from '../screens/authScreens/NotificationsScreen';
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

  const renderDrawerItem = (
    label: string,
    icon: string,
    onPress: () => void,
    isActive: boolean = false,
  ) => (
    <TouchableOpacity
      style={[
        styles.drawerItem,
        isActive && {backgroundColor: theme.primary + '15'},
      ]}
      onPress={onPress}>
      <Icon
        name={icon}
        size={wp('5%')}
        color={isActive ? theme.primary : theme.foreground}
      />
      <Text
        style={[
          styles.drawerItemText,
          {color: isActive ? theme.primary : theme.foreground},
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const currentRoute = props.state.routes[props.state.index].name;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : insets.top,
      }}
      style={styles.drawer}>
      <View style={[styles.drawerHeader, {borderBottomColor: theme.border}]}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={[styles.drawerSection, {borderTopColor: theme.border}]}>
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
          {renderDrawerItem(
            'Profile',
            'person-outline',
            () => props.navigation.navigate('Profile'),
            currentRoute === 'Profile',
          )}
          {renderDrawerItem(
            'Notifications',
            'notifications-outline',
            () => props.navigation.navigate('Notifications'),
            currentRoute === 'Notifications',
          )}
        </View>
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
          borderRadius: 12,
          paddingHorizontal: wp('6%'),
          marginHorizontal: wp('3%'),
          marginVertical: hp('0.5%'),
        },
        drawerLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: wp('3.8%'),
          marginLeft: wp('4%'),
          letterSpacing: 0.3,
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
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          drawerItemStyle: {height: 0},
          drawerIcon: ({color}) => (
            <Icon name="person-outline" size={wp('5%')} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
          drawerItemStyle: {height: 0},
          drawerIcon: ({color}) => (
            <Icon name="notifications-outline" size={wp('5%')} color={color} />
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
    paddingBottom: hp('2%'),
    borderBottomWidth: 1.5,
  },
  logoContainer: {
    width: wp('30%'),
    height: wp('10%'),
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
  },
  restaurantName: {
    fontSize: wp('5%'),
    fontFamily: 'Poppins-Bold',
    marginBottom: hp('0.5%'),
    letterSpacing: 0.3,
  },
  restaurantAddress: {
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.2,
  },
  drawerSection: {
    paddingTop: hp('2%'),
    borderTopWidth: 1.5,
    marginBottom: hp('1%'),
  },
  drawerSectionTitle: {
    fontSize: wp('3%'),
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 1.2,
    paddingHorizontal: wp('6%'),
    marginBottom: hp('1%'),
    opacity: 0.8,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('3.5%'),
    paddingHorizontal: wp('6%'),
    marginHorizontal: wp('3%'),
    marginVertical: hp('0.5%'),
    borderRadius: 12,
    gap: wp('4%'),
  },
  drawerItemText: {
    fontSize: wp('3.8%'),
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.3,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('4%'),
    paddingHorizontal: wp('6%'),
    marginTop: 'auto',
    borderTopWidth: 1.5,
    gap: wp('4%'),
  },
  logoutText: {
    fontSize: wp('3.8%'),
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.3,
  },
});
