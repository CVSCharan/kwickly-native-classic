import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Switch,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useThemeStore} from '../../store/useThemeStore';
import {Card} from '../../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {MenuButton} from '../../components/MenuButton';

type NotificationType = {
  id: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
};

const NOTIFICATION_TYPES: NotificationType[] = [
  {
    id: 'new_orders',
    title: 'New Orders',
    description: 'Get notified when new orders are placed',
    icon: 'cart-outline',
    enabled: true,
  },
  {
    id: 'order_updates',
    title: 'Order Updates',
    description: 'Receive updates on order status changes',
    icon: 'refresh-outline',
    enabled: true,
  },
  {
    id: 'promotions',
    title: 'Promotions',
    description: 'Stay updated with latest offers and deals',
    icon: 'pricetag-outline',
    enabled: false,
  },
  {
    id: 'system',
    title: 'System Notifications',
    description: 'Important updates about your account',
    icon: 'settings-outline',
    enabled: true,
  },
];

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'system' | 'promo';
  read: boolean;
};

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'New Order #1234',
    message: 'A new order has been placed for Table 5',
    time: '2 mins ago',
    type: 'order',
    read: false,
  },
  {
    id: '2',
    title: 'System Update',
    message: 'Your account settings have been updated',
    time: '1 hour ago',
    type: 'system',
    read: true,
  },
  {
    id: '3',
    title: 'Weekend Special!',
    message: 'Get 20% off on all menu items this weekend',
    time: '2 hours ago',
    type: 'promo',
    read: true,
  },
];

export const NotificationsScreen = () => {
  const {theme} = useThemeStore();
  const insets = useSafeAreaInsets();
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const [notificationTypes, setNotificationTypes] =
    useState(NOTIFICATION_TYPES);

  const toggleNotification = (id: string) => {
    setNotificationTypes(prev =>
      prev.map(type =>
        type.id === id ? {...type, enabled: !type.enabled} : type,
      ),
    );
  };

  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'order':
        return 'receipt-outline';
      case 'system':
        return 'information-circle-outline';
      case 'promo':
        return 'gift-outline';
      default:
        return 'notifications-outline';
    }
  };

  const renderSettings = () => (
    <Card style={styles.settingsCard}>
      <Text style={[styles.sectionTitle, {color: theme.foreground}]}>
        Notification Settings
      </Text>
      <View style={styles.settingsContent}>
        {notificationTypes.map(type => (
          <View
            key={type.id}
            style={[styles.settingItem, {borderBottomColor: theme.border}]}>
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.settingIconContainer,
                  {backgroundColor: theme.primary + '15'},
                ]}>
                <Icon name={type.icon} size={wp('5%')} color={theme.primary} />
              </View>
              <View>
                <Text style={[styles.settingTitle, {color: theme.foreground}]}>
                  {type.title}
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    {color: theme.mutedForeground},
                  ]}>
                  {type.description}
                </Text>
              </View>
            </View>
            <Switch
              value={type.enabled}
              onValueChange={() => toggleNotification(type.id)}
              trackColor={{false: theme.border, true: theme.primary + '70'}}
              thumbColor={type.enabled ? theme.primary : theme.mutedForeground}
            />
          </View>
        ))}
      </View>
    </Card>
  );

  const renderNotifications = () => (
    <Card style={styles.notificationsCard}>
      <Text style={[styles.sectionTitle, {color: theme.foreground}]}>
        Recent Notifications
      </Text>
      <View style={styles.notificationsContent}>
        {MOCK_NOTIFICATIONS.map(notification => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationItem,
              {
                borderBottomColor: theme.border,
                backgroundColor: notification.read
                  ? 'transparent'
                  : theme.primary + '08',
              },
            ]}>
            <View
              style={[
                styles.notificationIconContainer,
                {
                  backgroundColor: notification.read
                    ? theme.mutedForeground + '15'
                    : theme.primary + '15',
                },
              ]}>
              <Icon
                name={getNotificationIcon(notification.type)}
                size={wp('5%')}
                color={
                  notification.read ? theme.mutedForeground : theme.primary
                }
              />
            </View>
            <View style={styles.notificationContent}>
              <Text
                style={[
                  styles.notificationTitle,
                  {
                    color: theme.foreground,
                    fontFamily: notification.read
                      ? 'Poppins-Medium'
                      : 'Poppins-SemiBold',
                  },
                ]}>
                {notification.title}
              </Text>
              <Text
                style={[
                  styles.notificationMessage,
                  {color: theme.mutedForeground},
                ]}>
                {notification.message}
              </Text>
              <Text
                style={[
                  styles.notificationTime,
                  {color: theme.mutedForeground},
                ]}>
                {notification.time}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );

  return (
    <>
      <StatusBar
        barStyle={
          theme.foreground === '#ffffff' ? 'light-content' : 'dark-content'
        }
        backgroundColor={theme.background}
        translucent
      />
      <SafeAreaView
        edges={['left', 'right']}
        style={[styles.container, {backgroundColor: theme.background}]}>
        <MenuButton />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollViewContent,
            {
              paddingTop:
                Platform.OS === 'ios'
                  ? insets.top + hp('2%')
                  : statusBarHeight + hp('2%'),
              paddingBottom: insets.bottom + hp('2%'),
            },
          ]}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={[styles.headerTitle, {color: theme.foreground}]}>
                Notifications
              </Text>
              <Text
                style={[styles.headerSubtitle, {color: theme.mutedForeground}]}>
                Manage your notifications
              </Text>
            </View>

            {renderSettings()}
            {renderNotifications()}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    padding: wp('5%'),
    gap: hp('2.5%'),
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('2%'),
  },
  headerTitle: {
    fontSize: wp('7%'),
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.5,
    marginBottom: hp('0.5%'),
  },
  headerSubtitle: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.3,
    opacity: 0.8,
  },
  settingsCard: {
    padding: wp('6%'),
    gap: hp('2%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.3,
    marginBottom: hp('1%'),
  },
  settingsContent: {
    gap: hp('2%'),
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: hp('2%'),
    borderBottomWidth: 1.5,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('4%'),
    flex: 1,
  },
  settingIconContainer: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: wp('3.8%'),
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.2,
    marginBottom: hp('0.2%'),
  },
  settingDescription: {
    fontSize: wp('3.2%'),
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.2,
    opacity: 0.8,
  },
  notificationsCard: {
    padding: wp('6%'),
    gap: hp('2%'),
  },
  notificationsContent: {
    gap: hp('2%'),
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: hp('2%'),
    borderBottomWidth: 1.5,
    gap: wp('4%'),
  },
  notificationIconContainer: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContent: {
    flex: 1,
    gap: hp('0.5%'),
  },
  notificationTitle: {
    fontSize: wp('3.8%'),
    letterSpacing: 0.2,
  },
  notificationMessage: {
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.2,
    opacity: 0.8,
  },
  notificationTime: {
    fontSize: wp('3.2%'),
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.2,
    marginTop: hp('0.5%'),
    opacity: 0.6,
  },
});
