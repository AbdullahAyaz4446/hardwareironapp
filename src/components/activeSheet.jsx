import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, forwardRef } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import CustomButton from './button';
import { baseUrl } from '../apis/server';
import { useDispatch, useSelector } from 'react-redux';
import { setCart, setFavourite } from '../redux/slices/userSlice';
import { ActivityIndicator } from 'react-native';

const ProductDetailsSheet = forwardRef(({ selectedProduct }, ref) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [lastPressed, setLastPressed] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.user.cart);
  const Favorite = useSelector((state) => state.user.Favorites);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      const exists = Favorite.some((x) => x.id === selectedProduct.id);
      setIsFavorite(exists);
      setQuantity(1);
    }
  }, [selectedProduct]);

  const handleFavourite = () => {
    try {
      let updatedFavorites = [...Favorite];
      if (selectedProduct) {
        const index = updatedFavorites.findIndex(
          (x) => x.id === selectedProduct.id
        );
        if (index !== -1) {
          updatedFavorites.splice(index, 1);
          setIsFavorite(false);
        } else {
          updatedFavorites.push(selectedProduct);
          setIsFavorite(true);
        }
        dispatch(setFavourite(updatedFavorites));
      }
    } catch (error) {
      console.error('Error handling favorite:', error);
    }
  };

  const addToCart = () => {
    try {
      let arr = cartItem.map((item) => ({ ...item }));
      const index = arr.findIndex((x) => x.id === selectedProduct.id);
      if (index !== -1) {
        arr[index] = { ...arr[index], quantity };
      } else {
        arr.push({ ...selectedProduct, quantity });
      }
      dispatch(setCart(arr));
      setSuccessModalVisible(true);
      setTimeout(() => setSuccessModalVisible(false), 1500);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const increment = () => {
    setLastPressed('increment');
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setLastPressed('decrement');
      setQuantity(quantity - 1);
    }
  };

  return (
    <ActionSheet
      ref={ref}
      gestureEnabled
      defaultOverlayOpacity={0.5}
      containerStyle={{
        padding: 20,
        backgroundColor: '#F5F5F5',
        flexGrow: 1,
      }}
    >
      {selectedProduct && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 40,
          }}
        >
          <Image
            source={{ uri: baseUrl + '/' + selectedProduct.image }}
            style={{
              width: '100%',
              height: Dimensions.get('screen').height / 2.5,
              borderRadius: 20,
            }}
            resizeMode='contain'
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 15,
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              {selectedProduct.name}
            </Text>

            <TouchableOpacity onPress={handleFavourite}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={30}
                color={isFavorite ? '#54408C' : '#000'}
              />
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 6 }}>
            Product Description
          </Text>
          <Text
            style={{
              color: '#555',
              fontSize: 14,
              lineHeight: 20,
              marginBottom: 12,
            }}
          >
            {selectedProduct.description}
          </Text>

          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 6 }}>
            Benefits
          </Text>
          <View style={{ marginLeft: 10, marginBottom: 12 }}>
            {[
              'Provides strong structural stability for RCC construction',
              'Handles heavy concrete weight without bending or cracking',
              'Rust & weather-resistant for long-term durability',
              'Ribbed surface gives better grip with concrete (no slippage)',
              'Long-lasting material reduces maintenance & replacement cost',
              'Suitable for homes, commercial buildings & general construction',
            ].map((item, index) => (
              <View
                key={index}
                style={{ flexDirection: 'row', marginBottom: 5 }}
              >
                <Ionicons
                  name='checkmark-circle-outline'
                  size={18}
                  color='#4CAF50'
                  style={{ marginRight: 8, marginTop: 2 }}
                />
                <Text style={{ color: '#555', fontSize: 14, flex: 1 }}>
                  {item}
                </Text>
              </View>
            ))}
          </View>

          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 6 }}>
            Product Details
          </Text>
          <View style={{ marginLeft: 10, marginBottom: 12 }}>
            <Text style={{ color: '#555', fontSize: 14 }}>
              <Text style={{ fontWeight: 'bold' }}>Material:</Text> Premium
              Carbon Steel{'\n'}
              <Text style={{ fontWeight: 'bold' }}>Grade:</Text> High Tensile
              Strength{'\n'}
              <Text style={{ fontWeight: 'bold' }}>Surface Type:</Text> Ribbed
              for better concrete grip
            </Text>
          </View>

          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 6 }}>
            More Details
          </Text>
          <View style={{ marginLeft: 10, marginBottom: 20 }}>
            <Text style={{ color: '#555', fontSize: 14 }}>
              <Text style={{ fontWeight: 'bold' }}>Usage:</Text> RCC
              Construction (Beams, Columns, Slabs, Foundations){'\n'}
              <Text style={{ fontWeight: 'bold' }}>Available Sizes:</Text> 8mm /
              10mm / 12mm / 16mm / 20mm{'\n'}
              <Text style={{ fontWeight: 'bold' }}>Finish:</Text> Steel Grey
              Industrial Finish{'\n'}
              <Text style={{ fontWeight: 'bold' }}>Durability:</Text> Long Life,
              Corrosion Resistant{'\n'}
              <Text style={{ fontWeight: 'bold' }}>Application:</Text>{' '}
              Residential, Commercial & Industrial Projects
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Ionicons
              name='shield-checkmark-outline'
              size={20}
              color='#4CAF50'
              style={{ marginRight: 6 }}
            />
            <Text style={{ color: '#A6A6A6', paddingVertical: 10 }}>
              10 days easy return
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FAFAFA',
                borderRadius: 10,
                paddingHorizontal: 5,
                marginRight: 10,
              }}
            >
              <TouchableOpacity
                onPress={decrement}
                style={{
                  backgroundColor:
                    lastPressed === 'decrement' && quantity > 1
                      ? '#54408C'
                      : '#ccc',
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}
                >
                  -
                </Text>
              </TouchableOpacity>

              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {quantity}
              </Text>

              <TouchableOpacity
                onPress={increment}
                style={{
                  backgroundColor:
                    lastPressed === 'increment' ? '#54408C' : '#ccc',
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={{ fontWeight: 'bold', fontSize: 16, color: '#54408C' }}
            >
              {(selectedProduct.price * quantity).toFixed(2)}
            </Text>
          </View>

          <Modal
            transparent
            visible={successModalVisible}
            animationType='fade'
            onRequestClose={() => setSuccessModalVisible(false)}
          >
            <Pressable
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.3)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setSuccessModalVisible(false)}
            >
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 25,
                  borderRadius: 15,
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <Ionicons name='checkmark-circle' size={50} color='#54408C' />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#54408C',
                    marginTop: 10,
                  }}
                >
                  Product added successfully!
                </Text>
              </View>
            </Pressable>
          </Modal>
        </ScrollView>
      )}

      <CustomButton
        style={{
          padding: 20,
          borderRadius: 60,
          width: '100%',
        }}
        title='Add To cart'
        textStyle={{ fontWeight: 'bold' }}
        onPress={addToCart}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <CustomButton
          style={{
            padding: 20,
            borderRadius: 60,
            width: '48%',
          }}
          title='Continue Shopping'
          textStyle={{ fontWeight: 'bold' }}
          onPress={() => ref.current?.hide()}
        />
        <CustomButton
          onPress={() => navigation.navigate('ConformationOrder')}
          style={{
            padding: 20,
            borderRadius: 60,
            width: '48%',
            backgroundColor: '#FAF9FD',
          }}
          title='View Cart'
          textStyle={{ fontWeight: 'bold', color: '#54408C' }}
        />
      </View>
    </ActionSheet>
  );
});

export default ProductDetailsSheet;
