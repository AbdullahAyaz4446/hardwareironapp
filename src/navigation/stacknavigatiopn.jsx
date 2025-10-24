import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Login from '../screens/login';
import OnBording1 from '../screens/onbording';
import OnBording2 from '../screens/onbording2';
import OnBording3 from '../screens/onbording3';
import Signup from '../screens/signup';
import OtpVerificationOption from '../screens/verification-options';

import OtpVerificationOptionForgotpassword from '../screens/verification-options-forgot-password';
import OtpVerification from '../screens/otp-verfication';
import PhoneNumberVerification from '../screens/phone-number-verification';
import SuccessVerification from '../screens/success-verification';
import ResetPassword from '../screens/reset-password';
import Home from '../screens/home';
import SuccessVerificationPasswordChange from '../screens/success-verifiication-password-change';
import TabNavigatiopn from './tabnavigatiopn';

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
        <Stack.Screen name='Tab' component={TabNavigatiopn} />
        <Stack.Screen
          name='OtpVerificationOption'
          component={OtpVerificationOption}
        />
        <Stack.Screen
          name='OtpVerificationOptionForgotpassword'
          component={OtpVerificationOptionForgotpassword}
        />
        <Stack.Screen name='OtpVerification' component={OtpVerification} />
        <Stack.Screen
          name='PhoneNumberVerification'
          component={PhoneNumberVerification}
        />
        <Stack.Screen
          name='SuccessVerification'
          component={SuccessVerification}
        />
        <Stack.Screen name='ResetPassword' component={ResetPassword} />
        <Stack.Screen
          name='SuccessVerificationPasswordChange'
          component={SuccessVerificationPasswordChange}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
