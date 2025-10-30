import React, { useState } from 'react';
import { Dimensions, Text, View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import TopBar from '../components/topBar';
import CustomButton from '../components/button';
import CustomTextInput from '../components/custom-text-input';

const PhoneNumberVerification = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleContinue = () => {
    if (!phoneNumber.trim()) {
      setPhoneError('Phone number is required');
      return;
    } else if (!/^[0-9]{11}$/.test(phoneNumber)) {
      setPhoneError('Please enter a valid 11-digit phone number');
      return;
    } else {
      setPhoneError('');
      navigation.navigate('OtpVerification');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBar onPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={100}
          style={{ flex: 1 }}
        >
          <Text style={styles.heading}>Phone Number</Text>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={[
                styles.subHeading,
                { paddingBottom: 30, width: '70%', textAlign: 'center' },
              ]}
            >
              Please enter your phone number, so we can more easily deliver your
              order
            </Text>
          </View>

          <CustomTextInput
            label='Phone Number'
            placeholder='Your Phone Number'
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType='phone-pad'
            error={phoneError}
          />

          <View style={{ justifyContent: 'flex-end', flex: 1 }}>
            <CustomButton
              style={styles.button}
              title='Continue'
              textStyle={styles.buttonText}
              onPress={handleContinue}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhoneNumberVerification;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 32,
    color: '#010002',
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    color: '#A6A6A6',
    paddingBottom: 20,
  },
  button: {
    padding: 20,
    borderRadius: 60,
    width: '100%',
    marginTop: 50,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  otpContainer: {
    width: Dimensions.get('screen').width / 1.5,
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  activePinCodeContainer: {
    borderWidth: 1,
    borderColor: '#54408C',
  },
});
