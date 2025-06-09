import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeStore} from '../../store/useThemeStore';
import {Card} from '../../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {AuthStackParamList, TabParamList} from '../../navigation/types';

type DashboardScreenProps = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, 'Dashboard'>,
    NativeStackNavigationProp<AuthStackParamList>
  >;
};

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  navigation,
}) => {
  const {theme} = useThemeStore();

  const renderStatItem = (
    value: string | number,
    label: string,
    icon: string,
  ) => (
    <View style={styles.statItem}>
      <View
        style={[
          styles.statIconContainer,
          {backgroundColor: theme.primary + '15'},
        ]}>
        <Icon name={icon} size={22} color={theme.primary} />
      </View>
      <Text style={[styles.statValue, {color: theme.primary}]}>{value}</Text>
      <Text style={[styles.statLabel, {color: theme.mutedForeground}]}>
        {label}
      </Text>
    </View>
  );

  const renderOrderItem = (order: {
    id: number;
    table: number;
    items: number;
    status: string;
  }) => (
    <View style={[styles.orderItem, {borderBottomColor: theme.border}]}>
      <View style={styles.orderItemLeft}>
        <View
          style={[
            styles.orderIconContainer,
            {backgroundColor: theme.secondary + '15'},
          ]}>
          <Icon name="receipt-outline" size={18} color={theme.secondary} />
        </View>
        <View>
          <Text style={[styles.orderTitle, {color: theme.cardForeground}]}>
            Order #{order.id}
          </Text>
          <Text style={[styles.orderSubtitle, {color: theme.mutedForeground}]}>
            Table {order.table} • {order.items} items
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.statusBadge,
          {backgroundColor: getStatusColor(order.status) + '20'},
        ]}>
        <Text
          style={[styles.statusText, {color: getStatusColor(order.status)}]}>
          {order.status}
        </Text>
      </View>
    </View>
  );

  const renderMenuItem = (
    item: {name: string; price: number},
    isLast: boolean,
  ) => (
    <View
      style={[
        styles.menuItem,
        !isLast && {borderBottomWidth: 1, borderBottomColor: theme.border},
      ]}>
      <View style={styles.menuItemLeft}>
        <View
          style={[
            styles.menuIconContainer,
            {backgroundColor: theme.accent + '15'},
          ]}>
          <Icon name="restaurant-outline" size={16} color={theme.accent} />
        </View>
        <Text style={[styles.menuItemName, {color: theme.cardForeground}]}>
          {item.name}
        </Text>
      </View>
      <Text style={[styles.menuItemPrice, {color: theme.primary}]}>
        {formatIndianPrice(item.price)}
      </Text>
    </View>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Preparing':
        return '#f59e0b';
      case 'Ready':
        return '#10b981';
      case 'Delivered':
        return '#6366f1';
      default:
        return theme.primary;
    }
  };

  const formatIndianPrice = (price: number) => {
    return '₹' + price.toLocaleString();
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, {color: theme.foreground}]}>
              Dashboard
            </Text>
            <Text
              style={[styles.headerSubtitle, {color: theme.mutedForeground}]}>
              Manage your store
            </Text>
          </View>
          <Card title="Quick Stats" variant="glass">
            <View style={styles.statsContainer}>
              {renderStatItem(150, 'Orders Today', 'cart-outline')}
              {renderStatItem(
                formatIndianPrice(245000),
                'Revenue',
                'cash-outline',
              )}
              {renderStatItem(45, 'Active Tables', 'grid-outline')}
            </View>
          </Card>

          <View style={styles.gridContainer}>
            <Card style={styles.gridCard} variant="glass">
              <View style={styles.gridCardHeader}>
                <Icon name="time-outline" size={20} color={theme.primary} />
                <Text style={[styles.gridTitle, {color: theme.cardForeground}]}>
                  Pending Orders
                </Text>
              </View>
              <Text style={[styles.gridValue, {color: theme.primary}]}>24</Text>
              <Text style={[styles.gridLabel, {color: theme.mutedForeground}]}>
                Awaiting preparation
              </Text>
            </Card>
            <Card style={styles.gridCard} variant="glass">
              <View style={styles.gridCardHeader}>
                <Icon
                  name="restaurant-outline"
                  size={20}
                  color={theme.secondary}
                />
                <Text style={[styles.gridTitle, {color: theme.cardForeground}]}>
                  Available Tables
                </Text>
              </View>
              <Text style={[styles.gridValue, {color: theme.secondary}]}>
                12
              </Text>
              <Text style={[styles.gridLabel, {color: theme.mutedForeground}]}>
                Ready for seating
              </Text>
            </Card>
          </View>

          <Card
            title="Recent Orders"
            actionLabel="View All"
            onActionPress={() => navigation.navigate('Orders')}>
            {[
              {id: 1001, table: 1, items: 2, status: 'Preparing'},
              {id: 1002, table: 2, items: 2, status: 'Ready'},
              {id: 1003, table: 3, items: 2, status: 'Delivered'},
            ].map((order, index, array) => (
              <View
                key={order.id}
                style={[
                  index !== array.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.border,
                  },
                ]}>
                {renderOrderItem(order)}
              </View>
            ))}
          </Card>

          <Card
            title="Popular Items"
            actionLabel="Menu"
            onActionPress={() => {}}>
            {[
              {name: 'Chicken Burger', price: 299},
              {name: 'Caesar Salad', price: 249},
              {name: 'Margherita Pizza', price: 399},
            ].map((item, index, array) => (
              <View key={item.name}>
                {renderMenuItem(item, index === array.length - 1)}
              </View>
            ))}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingTop: 0,
    gap: 24,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.3,
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
    flex: 1,
  },
  statIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    // Shadow removed
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  statLabel: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    letterSpacing: 0.3,
    opacity: 0.8,
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  gridCard: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 24,
    borderRadius: 20,
  },
  gridCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  gridTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.4,
  },
  gridValue: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  gridLabel: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    marginTop: 6,
    letterSpacing: 0.3,
    opacity: 0.8,
  },
  orderItem: {
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  orderIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow removed
  },
  orderTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  orderSubtitle: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.3,
    opacity: 0.8,
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.6,
  },
  menuItem: {
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow removed
  },
  menuItemName: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.4,
  },
  menuItemPrice: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.4,
  },
});
