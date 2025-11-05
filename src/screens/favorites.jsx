import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../apis/server';
import { setFavourite } from '../redux/slices/userSlice';
import ProductDetailsSheet from '../components/activeSheet';

const Favorites = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const fvrtData = useSelector((state) => state.user.Favorites);
  const actionSheetRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleFavourite = (item) => {
    try {
      let updatedFavorites = [...fvrtData];
      const index = updatedFavorites.findIndex((fav) => fav.id === item.id);
      if (index !== -1) {
        updatedFavorites.splice(index, 1);
      } else {
        updatedFavorites.push(item);
      }
      dispatch(setFavourite(updatedFavorites));
    } catch (error) {
      console.error('Error handling favorite:', error);
    }
  };

  const openProductDetails = (product) => {
    setSelectedProduct(product);

    actionSheetRef.current?.show();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => openProductDetails(item)}
      style={styles.card}
    >
      <Image
        source={{ uri: `${baseUrl}/${item.image}` }}
        style={styles.image}
        resizeMode='cover'
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>Rs.{item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.heartIcon}
        onPress={() => handleFavourite(item)}
      >
        <Ionicons
          name={
            fvrtData.some((fav) => fav.id === item.id)
              ? 'heart'
              : 'heart-outline'
          }
          size={24}
          color={
            fvrtData.some((fav) => fav.id === item.id) ? '#54408C' : '#000'
          }
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={28} color='black' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={{ width: 28 }} />
      </View>
      {fvrtData.length == 0 ? (
        <View style={styles.emptyCartContainer}>
          <Ionicons name='heart-dislike-outline' size={100} color='#C4C4C4' />
          <Text style={styles.emptyCartText}>No Favorites items here</Text>
        </View>
      ) : (
        <FlashList
          data={fvrtData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
          estimatedItemSize={100}
          showsVerticalScrollIndicator={false}
        />
      )}

      <ProductDetailsSheet
        ref={actionSheetRef}
        selectedProduct={selectedProduct}
      />
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
    padding: 20,
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
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A6A6A6',
  },
});
