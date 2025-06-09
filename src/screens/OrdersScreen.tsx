import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeStore} from '../store/useThemeStore';
import {Card} from '../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList, TabParamList} from '../navigation/types';

type OrdersScreenProps = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, 'Orders'>,
    NativeStackNavigationProp<AuthStackParamList>
  >;
};

type OrderStatus = 'Preparing' | 'Ready' | 'Delivered' | 'Cancelled';

interface Order {
  id: number;
  table: number;
  items: number;
  status: OrderStatus;
  total: number;
  time: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: 1001,
    table: 1,
    items: 3,
    status: 'Preparing',
    total: 45.97,
    time: '10:30 AM',
  },
  {
    id: 1002,
    table: 2,
    items: 2,
    status: 'Ready',
    total: 27.98,
    time: '10:45 AM',
  },
  {
    id: 1003,
    table: 3,
    items: 4,
    status: 'Delivered',
    total: 89.96,
    time: '11:00 AM',
  },
  {
    id: 1004,
    table: 4,
    items: 1,
    status: 'Cancelled',
    total: 12.99,
    time: '11:15 AM',
  },
];

export const OrdersScreen: React.FC<OrdersScreenProps> = ({navigation}) => {
  const {theme} = useThemeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'All'>(
    'All',
  );

  const filteredOrders = MOCK_ORDERS.filter(order => {
    const matchesSearch =
      searchQuery === '' ||
      order.id.toString().includes(searchQuery) ||
      order.table.toString().includes(searchQuery);
    const matchesStatus =
      selectedStatus === 'All' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Preparing':
        return '#f59e0b';
      case 'Ready':
        return '#10b981';
      case 'Delivered':
        return '#6366f1';
      case 'Cancelled':
        return theme.destructive;
      default:
        return theme.mutedForeground;
    }
  };

  const renderOrderItem = (order: Order) => (
    <Card key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={[styles.orderId, {color: theme.foreground}]}>
            Order #{order.id}
          </Text>
          <Text style={[styles.orderTime, {color: theme.mutedForeground}]}>
            {order.time}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: getStatusColor(order.status)},
          ]}>
          <Text style={[styles.statusText, {color: '#ffffff'}]}>
            {order.status}
          </Text>
        </View>
      </View>

      <View style={[styles.orderDetails, {borderTopColor: theme.border}]}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, {color: theme.mutedForeground}]}>
            Table
          </Text>
          <Text style={[styles.detailValue, {color: theme.foreground}]}>
            {order.table}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, {color: theme.mutedForeground}]}>
            Items
          </Text>
          <Text style={[styles.detailValue, {color: theme.foreground}]}>
            {order.items}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, {color: theme.mutedForeground}]}>
            Total
          </Text>
          <Text style={[styles.detailValue, {color: theme.primary}]}>
            ${order.total.toFixed(2)}
          </Text>
        </View>
      </View>
    </Card>
  );

  const renderStatusFilter = (status: OrderStatus | 'All') => (
    <TouchableOpacity
      key={status}
      style={[
        styles.filterChip,
        {
          backgroundColor:
            selectedStatus === status ? theme.primary : theme.background,
          borderColor: theme.border,
        },
      ]}
      onPress={() => setSelectedStatus(status)}>
      <Text
        style={[
          styles.filterChipText,
          {
            color:
              selectedStatus === status
                ? theme.primaryForeground
                : theme.foreground,
          },
        ]}>
        {status}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.header}>
        <Text style={[styles.title, {color: theme.foreground}]}>Orders</Text>
      </View>

      <View style={[styles.searchContainer, {backgroundColor: theme.card}]}>
        <Icon name="search-outline" size={20} color={theme.mutedForeground} />
        <TextInput
          style={[styles.searchInput, {color: theme.foreground}]}
          placeholder="Search orders..."
          placeholderTextColor={theme.mutedForeground}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filterContainer}>
          {(
            ['All', 'Preparing', 'Ready', 'Delivered', 'Cancelled'] as const
          ).map(status => renderStatusFilter(status))}
        </View>
      </ScrollView>

      <ScrollView style={styles.ordersList}>
        {filteredOrders.map(order => renderOrderItem(order))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 0,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 24,
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  ordersList: {
    flex: 1,
    padding: 24,
    paddingTop: 16,
  },
  orderCard: {
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderId: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  orderTime: {
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  orderDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});
