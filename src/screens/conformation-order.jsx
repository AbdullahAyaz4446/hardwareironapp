import React, { useMemo, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import ActionSheet from 'react-native-actions-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../apis/server';
import { resetCart, setCart } from '../redux/slices/userSlice';
import easyPaisa20 from '../../assets/20.png';
import easyPaisa32 from '../../assets/32.png';
import easyPaisa48 from '../../assets/48.png';
import easyPaisa64 from '../../assets/64.png';
import easyPaisa128 from '../../assets/128.png';
import jazzcash20 from '../../assets/jazzcash20.png';
import jazzcash32 from '../../assets/jazzcash32.png';
import jazzcash48 from '../../assets/jazzcash48.png';
import jazzcash64 from '../../assets/jazzcash64.png';
import jazzcash128 from '../../assets/jazzcash128.png';

const ConformationOrder = () => {
  const navigation = useNavigation();
  const actionSheetRef = useRef(null);
  const actionSheetPaymentRef = useRef(null);
  const actionSheetDateRef = useRef(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [tomorrowDate, setTomorrowDate] = useState('');
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState(null);
  const cartItem = useSelector((state) => state.user.cart);
  const dispatch = useDispatch();
  const totalPrice = cartItem.reduce(
    (sum, item) => sum + parseFloat(item.price) * (item.quantity || 1),
    0
  );
  const screenWidth = Dimensions.get('window').width;
  let easyPaisaIcon;
  let jazzCashIcon;

  if (screenWidth < 360) {
    easyPaisaIcon = easyPaisa20;
    jazzCashIcon = jazzcash20;
  } else if (screenWidth < 480) {
    easyPaisaIcon = easyPaisa32;
    jazzCashIcon = jazzcash32;
  } else if (screenWidth < 720) {
    easyPaisaIcon = easyPaisa48;
    jazzCashIcon = jazzcash48;
  } else if (screenWidth < 1024) {
    easyPaisaIcon = easyPaisa64;
    jazzCashIcon = jazzcash64;
  } else {
    easyPaisaIcon = easyPaisa128;
    jazzCashIcon = jazzcash128;
  }

  useMemo(() => {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    const options = { day: 'numeric', month: 'short' };
    const formattedToday = now.toLocaleDateString('en-GB', options);
    const formattedTomorrow = tomorrow.toLocaleDateString('en-GB', options);
    setCurrentDate(formattedToday);
    setTomorrowDate(formattedTomorrow);
  }, []);

  const handleDateChange = (event, date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const openModal = () => {
    if (actionSheetRef.current) actionSheetRef.current?.setModalVisible(true);
  };

  const openPaymentModal = () => {
    try {
      if (actionSheetPaymentRef.current)
        actionSheetPaymentRef.current?.setModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const openDateModal = () => {
    try {
      if (actionSheetDateRef.current)
        actionSheetDateRef.current?.setModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const shipping = 2;
  const finalTotal = (totalPrice + shipping).toFixed(2);

  const handlePlaceOrder = () => {
    try {
      // createOrder();
      dispatch(resetCart());
      navigation.reset({
        index: 0,
        routes: [{ name: 'OrderRecevingRating' }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleTrashItem = (id) => {
    try {
      let data = [...cartItem];
      if (data) {
        const index = data.findIndex((x) => x.id == id);
        if (index != -1) {
          data.splice(index, 1);
          dispatch(setCart(data));
          return;
        }
      } else {
        dispatch(setCart(data));
      }
      return;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={25} color='black' />
        </TouchableOpacity>
        <Text style={styles.title}>Cart</Text>

        {/* <TouchableOpacity>
          <View style={{ position: 'relative' }}>
            <Ionicons name='notifications-outline' size={25} color='black' />
            <View style={styles.redDot} />
          </View>
        </TouchableOpacity> */}
        <View style={{ width: 24 }} />
      </View>

      {cartItem.length == 0 ? (
        <View style={styles.emptyCartContainer}>
          <Ionicons name='cart-outline' size={100} color='#C4C4C4' />
          <Text style={styles.emptyCartText}>No items in the cart</Text>
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: '#FFFFFF',
              paddingTop: 20,
              paddingHorizontal: 20,
            }}
            showsVerticalScrollIndicator={false}
          >
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
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                      paddingBottom: 5,
                    }}
                  >
                    Utama Street No.20
                  </Text>
                  <Text style={{ color: '#A6A6A6', paddingBottom: 10 }}>
                    Dumbo Street No.20, Dumbo, New York 10001, United States
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#C4C4C4',
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
                  Summary
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 20,
                  }}
                >
                  <Text>Total Price</Text>
                  <Text>Rs.{totalPrice.toFixed(2)}/-</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 20,
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
                    paddingTop: 20,
                  }}
                >
                  <Text style={{ fontWeight: 'bold' }}>Total Payment</Text>
                  <Text style={{ fontWeight: 'bold' }}>Rs.{finalTotal}/-</Text>
                </View>
              </View>
              <View style={{ borderWidth: 0.5, borderColor: '#C4C4C4' }} />
              <TouchableOpacity
                onPress={openModal}
                style={{
                  padding: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontWeight: 'bold', color: '#54408C' }}>
                  See details
                </Text>
                <Ionicons name='chevron-forward' size={20} color='#54408C' />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={openDateModal}
              style={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#C4C4C4',
                marginBottom: 20,
                padding: 20,
                marginTop: 20,
              }}
            >
              <Text
                style={{ paddingBottom: 10, fontSize: 18, fontWeight: 'bold' }}
              >
                Date and time
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      backgroundColor: '#FAF9FD',
                      borderRadius: 20,
                      padding: 5,
                      marginRight: 10,
                    }}
                  >
                    <Ionicons name='calendar' size={25} color='#54408C' />
                  </View>
                  <View>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>
                      Date & time
                    </Text>
                    <Text style={{ color: '#A6A6A6' }}>
                      Choose date and time
                    </Text>
                  </View>
                </View>
                <Ionicons name='chevron-forward' size={20} color='black' />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openPaymentModal}
              style={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#C4C4C4',
                padding: 20,
              }}
            >
              <Text
                style={{ paddingBottom: 10, fontSize: 18, fontWeight: 'bold' }}
              >
                Payment
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      backgroundColor: '#FAF9FD',
                      borderRadius: 20,
                      padding: 5,
                      marginRight: 10,
                    }}
                  >
                    <Ionicons name='card' size={25} color='#54408C' />
                  </View>
                  <View>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>
                      Payment
                    </Text>
                    <Text style={{ color: '#A6A6A6' }}>
                      Choose your payment
                    </Text>
                  </View>
                </View>
                <Ionicons name='chevron-forward' size={20} color='black' />
              </View>
            </TouchableOpacity>
          </ScrollView>

          <CustomButton
            style={{
              padding: 20,
              fontWeight: 'bold',
              borderRadius: 60,
              marginHorizontal: 15,
              backgroundColor: '#54408C',
              marginTop: 20,
            }}
            title='Place Order'
            onPress={handlePlaceOrder}
            textStyle={{
              fontWeight: 'bold',
              color: '#FFFFFF',
            }}
          />

          <ActionSheet
            ref={actionSheetRef}
            gestureEnabled
            defaultOverlayOpacity={0.5}
            containerStyle={{
              padding: 20,
            }}
          >
            <ScrollView>
              <Text
                style={{ fontWeight: 'bold', fontSize: 18, paddingBottom: 20 }}
              >
                Payment Details
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 20,
                  borderColor: '#C4C4C4',
                }}
              >
                <View style={{ padding: 20 }}>
                  <FlatList
                    data={cartItem}
                    keyExtractor={(item) => item.id}
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
                        <View style={{ flexDirection: 'row' }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flex: 1,
                            }}
                          >
                            <Text style={{ fontSize: 16 }}>{item.name}</Text>
                            <Text style={{ fontSize: 16 }}>
                              Rs.
                              {(item.price * (item.quantity || 1)).toFixed(2)}
                              /-
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => handleTrashItem(item.id)}
                          >
                            <Ionicons name='trash' size={18} color='red' />
                          </TouchableOpacity>
                        </View>

                        <View
                          style={{
                            marginTop: 8,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text>Quantity</Text>
                          <Text style={{ fontWeight: 'bold' }}>
                            x{item.quantity}
                          </Text>
                        </View>
                      </View>
                    )}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 20,
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
                      paddingTop: 20,
                    }}
                  >
                    <Text style={{ fontWeight: 'bold' }}>Total Payment</Text>
                    <Text style={{ fontWeight: 'bold' }}>
                      Rs.{finalTotal}/-
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </ActionSheet>

          <ActionSheet
            ref={actionSheetDateRef}
            gestureEnabled
            defaultOverlayOpacity={0.5}
            containerStyle={{
              padding: 20,
            }}
          >
            <ScrollView>
              <Text
                style={{ fontWeight: 'bold', fontSize: 18, paddingBottom: 20 }}
              >
                Delivery date
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => setSelectedDeliveryDate('today')}
                  style={{
                    width: '30%',
                    borderWidth: 1,
                    padding: 20,
                    borderRadius: 20,
                    borderColor:
                      selectedDeliveryDate === 'today' ? '#54408C' : '#C4C4C4',
                  }}
                >
                  <Text style={{ textAlign: 'center' }}>Today</Text>
                  <Text style={{ textAlign: 'center' }}>{currentDate}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedDeliveryDate('tomorrow')}
                  style={{
                    width: '30%',
                    borderWidth: 1,
                    padding: 20,
                    borderRadius: 20,
                    borderColor:
                      selectedDeliveryDate === 'tomorrow'
                        ? '#54408C'
                        : '#C4C4C4',
                  }}
                >
                  <Text style={{ textAlign: 'center' }}>Tomorrow</Text>
                  <Text style={{ textAlign: 'center' }}>{tomorrowDate}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowPicker(true);
                    setSelectedDeliveryDate('custom');
                  }}
                  style={{
                    paddingHorizontal: 30,
                    width: '30%',
                    borderWidth: 1,
                    padding: 20,
                    borderRadius: 20,
                    borderColor:
                      selectedDeliveryDate === 'custom' ? '#54408C' : '#C4C4C4',
                  }}
                >
                  <Text style={{ textAlign: 'center' }}>Pick a date</Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  paddingVertical: 20,
                }}
              >
                Delivery Time
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}
              >
                <TouchableOpacity
                  onPress={() => setSelectedDeliveryTime('10-11')}
                  style={{
                    width: '40%',
                    borderWidth: 1,
                    padding: 20,
                    borderRadius: 20,
                    borderColor:
                      selectedDeliveryTime === '10-11' ? '#54408C' : '#C4C4C4',
                  }}
                >
                  <Text style={{ textAlign: 'center' }}>Between</Text>
                  <Text style={{ textAlign: 'center' }}>10PM : 11PM</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedDeliveryTime('11-12')}
                  style={{
                    width: '40%',
                    borderWidth: 1,
                    padding: 20,
                    borderRadius: 20,
                    borderColor:
                      selectedDeliveryTime === '11-12' ? '#54408C' : '#C4C4C4',
                  }}
                >
                  <Text style={{ textAlign: 'center' }}>Between</Text>
                  <Text style={{ textAlign: 'center' }}>11PM : 12PM</Text>
                </TouchableOpacity>
              </View>
              <CustomButton
                style={{
                  padding: 20,
                  fontWeight: 'bold',
                  borderRadius: 60,
                  marginBottom: 0,
                  marginTop: 20,
                }}
                title='Confirm'
                textStyle={{ fontWeight: 'bold' }}
                onPress={() => {
                  actionSheetDateRef.current?.setModalVisible(false);
                }}
              />
            </ScrollView>
          </ActionSheet>

          <ActionSheet
            ref={actionSheetPaymentRef}
            gestureEnabled
            defaultOverlayOpacity={0.5}
            containerStyle={{
              padding: 20,
            }}
          >
            <ScrollView>
              <Text
                style={{ fontWeight: 'bold', fontSize: 18, paddingBottom: 20 }}
              >
                Your Payments
              </Text>

              <TouchableOpacity
                onPress={() => setSelectedPayment('easypaisa')}
                style={{
                  borderWidth: 1,
                  borderRadius: 20,
                  borderColor:
                    selectedPayment === 'easypaisa' ? '#54408C' : '#C4C4C4',
                  marginBottom: 20,
                  padding: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        backgroundColor: '#FAF9FD',
                        borderRadius: 60,
                        padding: 5,
                        marginRight: 10,
                      }}
                    >
                      <Image
                        source={easyPaisaIcon}
                        style={{
                          width: 25,
                          height: 25,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color:
                          selectedPayment === 'easypaisa' ? '#54408C' : 'black',
                      }}
                    >
                      EasyPaisa
                    </Text>
                  </View>
                  <Ionicons
                    name={
                      selectedPayment === 'easypaisa'
                        ? 'checkmark-circle'
                        : 'chevron-forward'
                    }
                    size={22}
                    color={
                      selectedPayment === 'easypaisa' ? '#54408C' : 'black'
                    }
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectedPayment('jazzcash')}
                style={{
                  borderWidth: 1,
                  borderRadius: 20,
                  borderColor:
                    selectedPayment === 'jazzcash' ? '#54408C' : '#C4C4C4',
                  marginBottom: 20,
                  padding: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        backgroundColor: '#FAF9FD',
                        borderRadius: 60,
                        padding: 5,
                        marginRight: 10,
                      }}
                    >
                      <Image
                        source={jazzCashIcon}
                        style={{
                          width: 25,
                          height: 25,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color:
                          selectedPayment === 'jazzcash' ? '#54408C' : 'black',
                      }}
                    >
                      JazzCash
                    </Text>
                  </View>
                  <Ionicons
                    name={
                      selectedPayment === 'jazzcash'
                        ? 'checkmark-circle'
                        : 'chevron-forward'
                    }
                    size={22}
                    color={selectedPayment === 'jazzcash' ? '#54408C' : 'black'}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectedPayment('card')}
                style={{
                  borderWidth: 1,
                  borderRadius: 20,
                  borderColor:
                    selectedPayment === 'card' ? '#54408C' : '#C4C4C4',
                  marginBottom: 20,
                  padding: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        backgroundColor: '#FAF9FD',
                        borderRadius: 60,
                        padding: 5,
                        marginRight: 10,
                      }}
                    >
                      <Ionicons name='card-outline' size={25} color='#54408C' />
                    </View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: selectedPayment === 'card' ? '#54408C' : 'black',
                      }}
                    >
                      Debit / Credit Card
                    </Text>
                  </View>
                  <Ionicons
                    name={
                      selectedPayment === 'card'
                        ? 'checkmark-circle'
                        : 'chevron-forward'
                    }
                    size={22}
                    color={selectedPayment === 'card' ? '#54408C' : 'black'}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectedPayment('cash')}
                style={{
                  borderWidth: 1,
                  borderRadius: 20,
                  borderColor:
                    selectedPayment === 'cash' ? '#54408C' : '#C4C4C4',
                  marginBottom: 20,
                  padding: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        backgroundColor: '#FAF9FD',
                        borderRadius: 60,
                        padding: 5,
                        marginRight: 10,
                      }}
                    >
                      <Ionicons
                        name='bicycle-outline'
                        size={25}
                        color='#54408C'
                      />
                    </View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: selectedPayment === 'cash' ? '#54408C' : 'black',
                      }}
                    >
                      Cash on Delivery
                    </Text>
                  </View>
                  <Ionicons
                    name={
                      selectedPayment === 'cash'
                        ? 'checkmark-circle'
                        : 'chevron-forward'
                    }
                    size={22}
                    color={selectedPayment === 'cash' ? '#54408C' : 'black'}
                  />
                </View>
              </TouchableOpacity>
            </ScrollView>
          </ActionSheet>

          {showPicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode='date'
              display='default'
              onChange={handleDateChange}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default ConformationOrder;

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
  redDot: {
    position: 'absolute',
    right: 2,
    top: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
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
