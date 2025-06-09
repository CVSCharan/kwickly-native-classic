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
    gap: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins',
    marginTop: 2,
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  gridCard: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 16,
  },
  gridCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  gridTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  gridValue: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    marginTop: 8,
  },
  gridLabel: {
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  orderItem: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orderIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  orderSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  menuItem: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemName: {
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  menuItemPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});
