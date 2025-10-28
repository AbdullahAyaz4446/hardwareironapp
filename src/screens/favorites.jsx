import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const favoritesData = [
  {
    id: '1',
    title: 'The Kite Runner',
    price: '$14.99',
    image: require('../../assets/slider1.png'),
  },
  {
    id: '2',
    title: 'Atomic Habits',
    price: '$12.49',
    image: require('../../assets/slider1.png'),
  },
  {
    id: '3',
    title: 'Rich Dad Poor Dad',
    price: '$9.99',
    image: require('../../assets/slider1.png'),
  },
];

const Favorites = () => {
  const navigation = useNavigation();
  const [favoriteItems, setFavoriteItems] = useState(
    favoritesData.map((item) => ({ ...item, isFavorite: true }))
  );

  const toggleFavorite = (id) => {
    setFavoriteItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode='cover' />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.heartIcon}
        onPress={() => toggleFavorite(item.id)}
      >
        <Ionicons
          name={item.isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={item.isFavorite ? '#54408C' : '#000'}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back' size={28} color='black' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Favorites</Text>
          <View style={{ width: 28 }} />
        </View>

        <FlashList
          data={favoriteItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
          estimatedItemSize={100}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cardContent: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  price: {
    fontSize: 14,
    color: '#54408C',
    fontWeight: 'bold',
  },
  heartIcon: {
    padding: 5,
  },
});
