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
import {useThemeStore} from '../../store/useThemeStore';
import {Card} from '../../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList, TabParamList} from '../../navigation/types';
import {formatIndianPrice} from '../../utils/currency';

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
    total: 1499,
    time: '10:30 AM',
  },
  {
    id: 1002,
    table: 2,
    items: 2,
    status: 'Ready',
    total: 899,
    time: '10:45 AM',
  },
  {
    id: 1003,
    table: 3,
    items: 4,
    status: 'Delivered',
    total: 2499,
    time: '11:00 AM',
  },
  {
    id: 1004,
    table: 4,
    items: 1,
    status: 'Cancelled',
    total: 299,
    time: '11:15 AM',
  },
];

export const OrdersScreen: React.FC<OrdersScreenProps> = () => {
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

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'Preparing':
        return 'timer';
      case 'Ready':
        return 'checkmark-circle';
      case 'Delivered':
        return 'checkmark-done';
      case 'Cancelled':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  };

  const renderOrderItem = (order: Order) => (
    <Card key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderHeaderLeft}>
          <View
            style={[
              styles.orderIconContainer,
              {backgroundColor: getStatusColor(order.status) + '15'},
            ]}>
            <Icon
              name={getStatusIcon(order.status)}
              size={20}
              color={getStatusColor(order.status)}
            />
          </View>
          <View>
            <Text style={[styles.orderId, {color: theme.foreground}]}>
              Order #{order.id}
            </Text>
            <Text style={[styles.orderTime, {color: theme.mutedForeground}]}>
              {order.time}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: getStatusColor(order.status) + '15'},
          ]}>
          <Text
            style={[styles.statusText, {color: getStatusColor(order.status)}]}>
            {order.status}
          </Text>
        </View>
      </View>

      <View style={[styles.orderDetails, {borderTopColor: theme.border}]}>
        <View style={styles.detailRow}>
          <View style={styles.detailLabelContainer}>
            <Icon name="restaurant" size={16} color={theme.mutedForeground} />
            <Text style={[styles.detailLabel, {color: theme.mutedForeground}]}>
              Table
            </Text>
          </View>
          <Text style={[styles.detailValue, {color: theme.foreground}]}>
            {order.table}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <View style={styles.detailLabelContainer}>
            <Icon name="list" size={16} color={theme.mutedForeground} />
            <Text style={[styles.detailLabel, {color: theme.mutedForeground}]}>
              Items
            </Text>
          </View>
          <Text style={[styles.detailValue, {color: theme.foreground}]}>
            {order.items}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <View style={styles.detailLabelContainer}>
            <Icon name="cash" size={16} color={theme.mutedForeground} />
            <Text style={[styles.detailLabel, {color: theme.mutedForeground}]}>
              Total
            </Text>
          </View>
          <Text style={[styles.detailValue, {color: theme.primary}]}>
            {formatIndianPrice(order.total)}
          </Text>
        </View>
      </View>

      <View style={[styles.orderActions, {borderTopColor: theme.border}]}>
        <TouchableOpacity
          style={[styles.actionButton, {borderColor: theme.border}]}
          onPress={() => {}}>
          <Icon name="eye" size={18} color={theme.foreground} />
          <Text style={[styles.actionText, {color: theme.foreground}]}>
            View Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            {borderColor: theme.border, backgroundColor: theme.primary + '10'},
          ]}
          onPress={() => {}}>
          <Icon name="print" size={18} color={theme.primary} />
          <Text style={[styles.actionText, {color: theme.primary}]}>
            Print Receipt
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  const renderStatusFilter = (status: OrderStatus | 'All') => {
    const isSelected = selectedStatus === status;
    const getFilterIcon = () => {
      if (status === 'All') return 'apps-outline';
      return getStatusIcon(status as OrderStatus);
    };

    return (
      <TouchableOpacity
        key={status}
        style={[
          styles.filterChip,
          {
            backgroundColor: isSelected ? theme.primary : theme.card,
            borderColor: isSelected ? theme.primary : theme.border,
          },
        ]}
        onPress={() => setSelectedStatus(status)}>
        <Icon
          name={getFilterIcon()}
          size={16}
          color={isSelected ? theme.primaryForeground : theme.mutedForeground}
        />
        <Text
          style={[
            styles.filterChipText,
            {
              color: isSelected ? theme.primaryForeground : theme.foreground,
            },
          ]}>
          {status}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={[styles.searchContainer, {backgroundColor: theme.card}]}>
        <Icon name="search" size={20} color={theme.mutedForeground} />
        <TextInput
          style={[styles.searchInput, {color: theme.foreground}]}
          placeholder="Search orders..."
          placeholderTextColor={theme.mutedForeground}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close-circle" size={20} color={theme.mutedForeground} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filterContainer}>
          {(
            ['All', 'Preparing', 'Ready', 'Delivered', 'Cancelled'] as const
          ).map(status => renderStatusFilter(status))}
        </View>
      </ScrollView>

      {filteredOrders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon
            name="receipt-outline"
            size={60}
            color={theme.mutedForeground}
          />
          <Text style={[styles.emptyText, {color: theme.foreground}]}>
            No orders found
          </Text>
          <Text style={[styles.emptySubtext, {color: theme.mutedForeground}]}>
            Try changing your search or filter
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.ordersList}>
          {filteredOrders.map(order => renderOrderItem(order))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 24,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1, // Added border to replace shadow
    // Shadow removed
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 14,
    marginRight: 14,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.4,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 14,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1.5,
    gap: 10,
    // Shadow removed
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  filterChipText: {
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.6,
  },
  ordersList: {
    flex: 1,
    padding: 24,
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginTop: 24,
    letterSpacing: 0.4,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginTop: 10,
    letterSpacing: 0.3,
    opacity: 0.8,
    textAlign: 'center',
  },
  orderCard: {
    marginBottom: 24,
    borderRadius: 20,
    borderWidth: 1, // Added border to replace shadow
    // Shadow removed
    padding: 0,
    overflow: 'hidden',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  orderHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  orderIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow removed
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  orderId: {
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  orderTime: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.3,
    opacity: 0.8,
  },
  statusBadge: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.6,
  },
  orderDetails: {
    padding: 24,
    borderTopWidth: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.4,
    opacity: 0.9,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.4,
  },
  orderActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    padding: 18,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    marginHorizontal: 8,
  },
  actionText: {
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.4,
  },
});
