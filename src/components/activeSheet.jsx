import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import CustomButton from './button';

const ProductDetailsSheet = React.forwardRef(
  ({ selectedProduct, updateQuantity }, ref) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [lastPressed, setLastPressed] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
      if (selectedProduct) setQuantity(selectedProduct.quantity || 1);
    }, [selectedProduct]);

    const increment = () => {
      const newQty = quantity + 1;
      setLastPressed('increment');
      setQuantity(newQty);
      if (updateQuantity === 'function') {
        updateQuantity(selectedProduct.id, newQty);
      }
    };

    const decrement = () => {
      if (quantity > 1) {
        const newQty = quantity - 1;
        setLastPressed('decrement');
        setQuantity(newQty);
        if (updateQuantity === 'function') {
          updateQuantity(selectedProduct.id, newQty);
        }
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
        }}
      >
        {selectedProduct && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={selectedProduct.image}
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
                {selectedProduct.title}
              </Text>

              <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={30}
                  color={isFavorite ? '#54408C' : '#000'}
                />
              </TouchableOpacity>
            </View>

            <Text style={{ color: '#A6A6A6', paddingVertical: 10 }}>
              {selectedProduct.description}
            </Text>

            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>
              Review
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginBottom: 20,
                alignItems: 'center',
              }}
            >
              <Ionicons name='star' size={28} color='#54408C' />
              <Ionicons name='star' size={28} color='#54408C' />
              <Ionicons name='star' size={28} color='#54408C' />
              <Ionicons name='star' size={28} color='#54408C' />
              <Ionicons name='star' size={28} color='#000' />
              <Text style={{ fontWeight: 'bold', paddingHorizontal: 10 }}>
                (4.0)
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
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: '#54408C',
                }}
              >
                ${(3.9 * quantity).toFixed(2)}
              </Text>
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <CustomButton
                style={{
                  padding: 20,
                  borderRadius: 60,
                  width: '65%',
                }}
                title='Continue Shopping'
                textStyle={{ fontWeight: 'bold' }}
              />
              <CustomButton
                onPress={() => navigation.navigate('ConformationOrder')}
                style={{
                  padding: 20,
                  borderRadius: 60,
                  width: '30%',
                  backgroundColor: '#FAF9FD',
                }}
                title='View Cart'
                textStyle={{ fontWeight: 'bold', color: '#54408C' }}
              />
            </View>
          </ScrollView>
        )}
      </ActionSheet>
    );
  }
);

export default ProductDetailsSheet;
