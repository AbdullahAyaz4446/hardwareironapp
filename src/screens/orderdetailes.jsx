import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { baseUrl, orderProductsDetailes } from '../apis/server';

const OrderDetailes = ({ route }) => {
  const navigation = useNavigation();
  const id = route.params.id;
  const [orderData, setOrderData] = useState(null);

  const orderStatus = {
    InProcess: 1,
    Packed: 2,
    Dispateched: 3,
    Delivered: 4,
  };

  const getStatusText = (status) => {
    switch (status) {
      case orderStatus.InProcess:
        return 'In Process';
      case orderStatus.Packed:
        return 'Packed';
      case orderStatus.Dispateched:
        return 'Dispatched';
      case orderStatus.Delivered:
        return 'Delivered';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case orderStatus.InProcess:
        return '#FFA500'; // Orange
      case orderStatus.Packed:
        return '#4169E1'; // Royal Blue
      case orderStatus.Dispateched:
        return '#6A5ACD'; // Slate Blue
      case orderStatus.Delivered:
        return '#32CD32'; // Lime Green
      default:
        return '#666666'; // Gray
    }
  };

  useEffect(() => {
    productOrderDetailes(id);
  }, [id]);

  const productOrderDetailes = async (id) => {
    try {
      const data = await orderProductsDetailes(id);
      console.log('order details fetch=========>', data);
      setOrderData(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Calculate total price from products
  const totalPrice =
    orderData?.products?.reduce(
      (sum, item) => sum + parseFloat(item.price) * (item.quantity || 1),
      0
    ) || 0;

  const shipping = 2;
  const finalTotal = (totalPrice + shipping).toFixed(2);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={25} color='black' />
        </TouchableOpacity>
        <Text style={styles.title}>Order Details</Text>
        <View style={{ width: 24 }} />
      </View>

      {orderData ? (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: '#FFFFFF',
            paddingTop: 20,
            paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Order Status Section */}
          <View
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderColor: '#C4C4C4',
              marginBottom: 20,
              padding: 20,
            }}
          >
            <Text
              style={{ paddingBottom: 10, fontSize: 18, fontWeight: 'bold' }}
            >
              Order Status
            </Text>
            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Status:</Text>
              <Text
                style={[
                  styles.orderInfoValue,
                  { color: getStatusColor(orderData.status) },
                ]}
              >
                {getStatusText(orderData.status)}
              </Text>
            </View>
          </View>

          {/* Address Section */}
          <View
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderColor: '#C4C4C4',
              marginBottom: 20,
              padding: 20,
            }}
          >
            <Text
              style={{ paddingBottom: 10, fontSize: 18, fontWeight: 'bold' }}
            >
              Address
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  backgroundColor: '#FAF9FD',
                  borderRadius: 20,
                  padding: 5,
                  marginRight: 10,
                }}
              >
                <Ionicons name='location' size={25} color='#54408C' />
              </View>

              <View style={{ width: '85%' }}>
                <Text style={{ color: '#A6A6A6', paddingBottom: 10 }}>
                  {orderData.address}
                </Text>
              </View>
            </View>
          </View>

          {/* Products Summary Section */}
          <View
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderColor: '#C4C4C4',
              marginBottom: 20,
            }}
          >
            <View style={{ padding: 20 }}>
              <Text
                style={{
                  paddingBottom: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                Products Summary
              </Text>

              {/* Products List */}
              <FlatList
                data={orderData.products}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View
                    style={{
                      marginBottom: 15,
                      borderBottomWidth: 1,
                      borderColor: '#ccc',
                      paddingBottom: 10,
                    }}
                  >
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Image
                        source={{ uri: baseUrl + '/' + item.image }}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 10,
                          marginRight: 15,
                        }}
                        resizeMode='cover'
                      />
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                          {item.name}
                        </Text>
                        <Text style={{ color: '#666', marginTop: 4 }}>
                          {item.description}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 8,
                          }}
                        >
                          <Text>Quantity: {item.quantity || 1}</Text>
                          <Text style={{ fontWeight: 'bold' }}>
                            Rs.{(item.price * (item.quantity || 1)).toFixed(2)}
                            /-
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              />

              {/* Price Breakdown */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}
              >
                <Text>Subtotal</Text>
                <Text>Rs.{totalPrice.toFixed(2)}/-</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}
              >
                <Text>Shipping</Text>
                <Text>Rs.{shipping.toFixed(2)}/-</Text>
              </View>

              <View style={{ borderWidth: 0.5, borderColor: '#C4C4C4' }} />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 15,
                }}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  Total Payment
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  Rs.{finalTotal}/-
                </Text>
              </View>
            </View>
          </View>

          {/* Order Information */}
          <View
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderColor: '#C4C4C4',
              padding: 20,
              marginBottom: 20,
            }}
          >
            <Text
              style={{ paddingBottom: 10, fontSize: 18, fontWeight: 'bold' }}
            >
              Order Information
            </Text>
            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Order ID:</Text>
              <Text style={styles.orderInfoValue}>{orderData.id}</Text>
            </View>
            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Order Date:</Text>
              <Text style={styles.orderInfoValue}>
                {new Date(orderData.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Payment Type:</Text>
              <Text style={styles.orderInfoValue}>
                {orderData.paymentType === 1
                  ? 'Online Payment'
                  : 'Cash on Delivery'}
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name='receipt-outline' size={100} color='#C4C4C4' />
          <Text style={styles.emptyText}>Loading order details...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderDetailes;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A6A6A6',
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  orderInfoLabel: {
    fontWeight: 'bold',
    color: '#666',
  },
  orderInfoValue: {
    color: '#333',
    fontWeight: '500',
  },
});
