import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeStore} from '../store/useThemeStore';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {AuthStackParamList, TabParamList} from '../navigation/types';

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

  const renderStatItem = (value: string | number, label: string) => (
    <View style={styles.statItem}>
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
      <View>
        <Text style={[styles.orderTitle, {color: theme.cardForeground}]}>
          Order #{order.id}
        </Text>
        <Text style={[styles.orderSubtitle, {color: theme.mutedForeground}]}>
          Table {order.table} • {order.items} items
        </Text>
      </View>
      <View style={[styles.statusBadge, {backgroundColor: theme.accent}]}>
        <Text style={[styles.statusText, {color: theme.accentForeground}]}>
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
      <Text style={[styles.menuItemName, {color: theme.cardForeground}]}>
        {item.name}
      </Text>
      <Text style={[styles.menuItemPrice, {color: theme.primary}]}>
        ${item.price.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, {color: theme.foreground}]}>
              Dashboard
            </Text>
            <Button
              label="Settings"
              onPress={() => navigation.navigate('Settings')}
              variant="secondary"
              size="sm"
            />
          </View>

          <Card title="Quick Stats">
            <View style={styles.statsContainer}>
              {renderStatItem(150, 'Orders Today')}
              {renderStatItem('$2,450', 'Revenue')}
              {renderStatItem(45, 'Active Tables')}
            </View>
          </Card>

          <View style={styles.gridContainer}>
            <Card style={styles.gridCard} variant="glass">
              <Text style={[styles.gridTitle, {color: theme.cardForeground}]}>
                Orders
              </Text>
              <Text style={[styles.gridValue, {color: theme.primary}]}>24</Text>
              <Text style={[styles.gridLabel, {color: theme.mutedForeground}]}>
                Pending
              </Text>
            </Card>
            <Card style={styles.gridCard} variant="glass">
              <Text style={[styles.gridTitle, {color: theme.cardForeground}]}>
                Tables
              </Text>
              <Text style={[styles.gridValue, {color: theme.secondary}]}>
                12
              </Text>
              <Text style={[styles.gridLabel, {color: theme.mutedForeground}]}>
                Available
              </Text>
            </Card>
          </View>

          <Card title="Recent Orders">
            {[
              {id: 1001, table: 1, items: 2, status: 'Preparing'},
              {id: 1002, table: 2, items: 2, status: 'Ready'},
              {id: 1003, table: 3, items: 2, status: 'Delivered'},
            ].map((order, index, array) => (
              <View
                key={order.id}
                style={[
                  styles.orderItem,
                  index !== array.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.border,
                  },
                ]}>
                {renderOrderItem(order)}
              </View>
            ))}
          </Card>

          <Card title="Popular Items">
            {[
              {name: 'Chicken Burger', price: 12.99},
              {name: 'Caesar Salad', price: 9.99},
              {name: 'Margherita Pizza', price: 14.99},
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  gridCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  gridTitle: {
    fontSize: 18,
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
  orderTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  orderSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  menuItem: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
