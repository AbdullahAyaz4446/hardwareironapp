import {
  Dimensions,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import CustomButton from '../components/button';
import { Ionicons } from '@expo/vector-icons';

const OrderRecevingRating = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          backgroundColor: '#FFFFFF',
        }}
      >
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={100}
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <ImageBackground
            source={require('../../assets/success.png')}
            style={{
              width: Dimensions.get('screen').width / 3,
              aspectRatio: 1,
              alignSelf: 'center',
            }}
          />

          <Text style={styles.title}>You Received The Order!</Text>
          <Text style={styles.orderId}>Order #2930541</Text>

          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackHeading}>Tell us your feedback 🙌</Text>
            <Text style={styles.feedbackText}>
              Lorem ipsum dolor sit amet consectetur. Dignissim magna vitae.
            </Text>

            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Ionicons
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={35}
                    color={star <= rating ? 'gold' : 'gray'}
                    style={styles.starIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.writeText}>Write something for us!</Text>
          </View>

          <CustomButton
            style={{ padding: 20, fontWeight: 'bold', borderRadius: 60 }}
            title='Done'
            textStyle={{ fontWeight: 'bold' }}
            onPress={() => {
              navigation.navigate('Tab');
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderRecevingRating;

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: '#010002ff',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 20,
  },
  orderId: {
    textAlign: 'center',
    color: '#A6A6A6',
  },
  feedbackBox: {
    backgroundColor: '#CABCEF',
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  feedbackHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedbackText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  starIcon: {
    marginHorizontal: 5,
  },
  writeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
