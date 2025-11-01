import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import CustomButton from '../components/button';
import { createOrder } from '../apis/server';

const Cart = () => {
  const navigation = useNavigation();
  const cartItem = useSelector((state) => state.user.cart);
  const totalPrice = cartItem.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );
  const productList = cartItem.map((item) => item.id).join(',');

  const handlePlaceHolder = () => {
    try {
      createOrder();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: 'transparent',
            padding: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={{ width: 24 }} />
            <Text style={styles.title}>My Cart</Text>

            <TouchableOpacity>
              <View style={{ position: 'relative' }}>
                <Ionicons
                  name='notifications-outline'
                  size={25}
                  color='black'
                />
                <View style={styles.redDot} />
              </View>
            </TouchableOpacity>
          </View>
          {cartItem.length == 0 ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons
                name='cart-outline'
                size={300}
                color='#170606ff'
                style={{
                  opacity: 0.2,
                  zIndex: -1,
                }}
              />
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                  fontWeight: '500',
                }}
              >
                Empty Cart
              </Text>
            </View>
          ) : (
            <View
              style={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#C4C4C4',
                padding: 20,
              }}
            >
              {cartItem.map((item, index) => {
                console.log(item);
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 15,
                    }}
                  >
                    <Text>{item.name}</Text>
                    <Text>{item.price}</Text>
                  </View>
                );
              })}

              <View style={{ borderWidth: 0.5, borderColor: '#C4C4C4' }} />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 20,
                }}
              >
                <Text>Shipping</Text>
                <Text>{100}</Text>
              </View>

              <View style={{ borderWidth: 0.5, borderColor: '#C4C4C4' }} />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 20,
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>Total Payment</Text>
                <Text style={{ fontWeight: 'bold' }}>{totalPrice + 100}</Text>
              </View>
            </View>
          )}
        </ScrollView>
        <CustomButton
          style={{
            padding: 20,
            fontWeight: 'bold',
            borderRadius: 60,
            marginBottom: 0,
            marginHorizontal: 20,
          }}
          title='Place Order'
          textStyle={{ fontWeight: 'bold' }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  redDot: {
    position: 'absolute',
    right: 2,
    top: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
});
