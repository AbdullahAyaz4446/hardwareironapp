import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getOrdersDeatiles, orderProductsDetailes } from '../apis/server';
import { useSelector } from 'react-redux';

const OrderHistory = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const [orders, setOrders] = useState([]);

  const fetchOrdersDetails = async () => {
    try {
      const data = await getOrdersDeatiles(user.id);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrdersDetails();
  }, []);

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return 'Pending';
      case 2:
        return 'Processing';
      case 3:
        return 'Delivered';
      case 4:
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const renderItem = ({ item }) => {
    const statusText = getStatusText(item.status);

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('OrderDetailes', {
            id: item.id,
          });
        }}
        style={styles.card}
      >
        <View style={styles.cardContent}>
          <Text style={styles.title}>{`Order #${item.id}`}</Text>
          <Text
            style={[
              styles.status,
              {
                color:
                  statusText === 'Delivered'
                    ? 'green'
                    : statusText === 'Cancelled'
                    ? 'red'
                    : '#54408C',
              },
            ]}
          >
            {statusText}
          </Text>

          <Text style={styles.itemCount}>
            Items: {item.productIds ? item.productIds.split(',').length : 0}
          </Text>

          <Text style={styles.date}>
            Date: {new Date(item.createdAt).toLocaleDateString()}
          </Text>

          <Text style={styles.address}>Address: {item.address}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={28} color='black' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: 28 }} />
      </View>

      <FlashList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        estimatedItemSize={100}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ color: '#999' }}>No orders found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  date: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  address: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  user: {
    fontSize: 13,
    color: '#333',
    marginTop: 2,
  },
  status: {
    fontSize: 13,
    marginTop: 4,
  },
});
