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

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'Preparing':
        return 'time-outline';
      case 'Ready':
        return 'checkmark-circle-outline';
      case 'Delivered':
        return 'checkmark-done-outline';
      case 'Cancelled':
        return 'close-circle-outline';
      default:
        return 'help-circle-outline';
    }
  };

  const renderOrderItem = (order: Order) => (
    <Card key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderHeaderLeft}>
          <View 
            style={[
              styles.orderIconContainer, 
              {backgroundColor: getStatusColor(order.status) + '15'}
            ]}>
            <Icon name={getStatusIcon(order.status)} size={20} color={getStatusColor(order.status)} />
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
          <Text style={[styles.statusText, {color: getStatusColor(order.status)}]}>
            {order.status}
          </Text>
        </View>
      </View>

      <View style={[styles.orderDetails, {borderTopColor: theme.border}]}>
        <View style={styles.detailRow}>
          <View style={styles.detailLabelContainer}>
            <Icon name="restaurant-outline" size={16} color={theme.mutedForeground} />
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
            <Icon name="list-outline" size={16} color={theme.mutedForeground} />
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
            <Icon name="cash-outline" size={16} color={theme.mutedForeground} />
            <Text style={[styles.detailLabel, {color: theme.mutedForeground}]}>
              Total
            </Text>
          </View>
          <Text style={[styles.detailValue, {color: theme.primary}]}>
            ${order.total.toFixed(2)}
          </Text>
        </View>
      </View>
      
      <View style={[styles.orderActions, {borderTopColor: theme.border}]}>
        <TouchableOpacity 
          style={[styles.actionButton, {borderColor: theme.border}]}
          onPress={() => {}}
        >
          <Icon name="eye-outline" size={18} color={theme.foreground} />
          <Text style={[styles.actionText, {color: theme.foreground}]}>View Details</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, {borderColor: theme.border, backgroundColor: theme.primary + '10'}]}
          onPress={() => {}}
        >
          <Icon name="print-outline" size={18} color={theme.primary} />
          <Text style={[styles.actionText, {color: theme.primary}]}>Print Receipt</Text>
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
      <View style={[styles.header, {borderBottomColor: theme.border}]}>
        <Text style={[styles.title, {color: theme.foreground}]}>Orders</Text>
        <Text style={[styles.subtitle, {color: theme.mutedForeground}]}>
          Manage your restaurant orders
        </Text>
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
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close-circle-outline" size={20} color={theme.mutedForeground} />
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
          <Icon name="receipt-outline" size={60} color={theme.mutedForeground} />
          <Text style={[styles.emptyText, {color: theme.foreground}]}>No orders found</Text>
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
  header: {
    padding: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 24,
    marginTop: 16,
    marginBottom: 16,
    padding: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1.5,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterChipText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.3,
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
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: 'Poppins',
    marginTop: 8,
  },
  orderCard: {
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    padding: 0,
    overflow: 'hidden',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  orderHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orderIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.5,
  },
  orderTime: {
    fontSize: 14,
    fontFamily: 'Poppins',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.5,
  },
  orderDetails: {
    padding: 16,
    borderTopWidth: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 15,
    fontFamily: 'Poppins',
    letterSpacing: 0.3,
  },
  detailValue: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.3,
  },
  orderActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    padding: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});
