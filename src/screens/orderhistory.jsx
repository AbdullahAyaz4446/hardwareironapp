import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';

const favoritesData = [
  {
    id: '1',
    title: 'Order 1',

    status: 'Delivered',
    item: 2,
    date: 'October 2021',
  },
  {
    id: '2',
    title: 'Order 2',

    status: 'Delivered',
    item: 3,
    date: 'October 2021',
  },
  {
    id: '3',
    title: 'Order 3',

    status: 'Cancelled',
    item: 6,
    date: 'November 2021',
  },
  {
    id: '4',
    title: 'Order 4',
    status: 'Delivered',
    item: 1,
    date: 'November 2021',
  },
  {
    id: '5',
    title: 'Order 5',

    status: 'Pending',
    item: 4,
    date: 'December 2021',
  },
];

const OrderHistory = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text
          style={[
            styles.status,
            {
              color:
                item.status === 'Delivered'
                  ? 'green'
                  : item.status === 'Cancelled'
                  ? 'red'
                  : '#54408C',
            },
          ]}
        >
          {item.status}
        </Text>
        <Text style={styles.itemCount}>Items: {item.item}</Text>
        <Text style={styles.date}>Date: {item.date}</Text>
      </View>
    </View>
  );

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
        data={favoritesData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        estimatedItemSize={100}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
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
  price: {
    fontSize: 14,
    color: '#54408C',
    fontWeight: '600',
    marginTop: 4,
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
  status: {
    fontSize: 13,
    marginTop: 4,
  },
});
