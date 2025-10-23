import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import CustomButton from '../components/button';
import TopBar from '../components/topBar';
import { useDispatch } from 'react-redux';
import { setFlag } from '../redux/slices/flagSlice';

const OtpVerificationOptionForgotpassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBar onPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={100}
          style={{
            flex: 1,
          }}
        >
          <Text style={styles.heading}>Forgot Password</Text>
          <Text style={styles.subHeading}>
            Select which contact details should we use to reset your password
          </Text>

          <View style={styles.optionRow}>
            <TouchableOpacity
              style={[
                styles.optionBox,
                selectedOption === 'email' && {
                  borderColor: '#54408C',
                  borderWidth: 1,
                },
              ]}
              onPress={() => setSelectedOption('email')}
            >
              <Ionicons
                name='mail'
                size={25}
                color='black'
                style={{ paddingBottom: 20 }}
              />
              <Text>Email</Text>
              <Text>Send to your email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionBox,
                selectedOption === 'phone' && {
                  borderColor: '#54408C',
                  borderWidth: 1,
                },
              ]}
              onPress={() => setSelectedOption('phone')}
            >
              <Ionicons
                name='call-sharp'
                size={25}
                color='black'
                style={{ paddingBottom: 20 }}
              />
              <Text>Phone Number</Text>
              <Text>Send to your phone</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              style={styles.button}
              title='Continue'
              textStyle={styles.buttonText}
              disable={selectedOption === null}
              onPress={() => {
                if (selectedOption == 'email') {
                  navigation.navigate('OtpVerification');
                  dispatch(setFlag(true));
                } else {
                  navigation.navigate('PhoneNumberVerification');
                  dispatch(setFlag(true));
                }
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtpVerificationOptionForgotpassword;

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
  },
  subHeading: {
    fontSize: 16,
    color: '#A6A6A6',
    paddingBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  optionBox: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderRadius: 15,
    marginHorizontal: 5,
    padding: 20,
    paddingVertical: 40,
    width: '45%',
    aspectRatio: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    padding: 20,
    borderRadius: 60,
    width: '100%',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
