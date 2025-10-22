import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import OnBording1 from '../screens/onbording';
import OnBording2 from '../screens/onbording2';
import OnBording3 from '../screens/onbording3';
import Login from '../screens/login';
import Signup from '../screens/signup';

import OtpVerification from '../components/otp-verfication';
import PhoneNumberVerification from '../components/phone-number-verification';

import SuccessVerifcation from '../screens/success-verifcation';
import VerificationOption from '../screens/verification-option';
import ForgotPassword from '../screens/forgot-password';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='OnBording1' component={OnBording1} />
        <Stack.Screen name='OnBording2' component={OnBording2} />
        <Stack.Screen name='OnBording3' component={OnBording3} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen
          name='SuccessVerifcation'
          component={SuccessVerifcation}
        />
        <Stack.Screen
          name='VerificationOption'
          component={VerificationOption}
        />
        <Stack.Screen name='OtpVerification' component={OtpVerification} />
        <Stack.Screen
          name='ForgotVerification'
          component={ForgotVerification}
        />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
