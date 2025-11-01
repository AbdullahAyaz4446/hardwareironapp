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

import SuccessVerificationPasswordChange from '../screens/success-verifiication-password-change';
import TabNavigatiopn from './tabnavigatiopn';
import MyAccount from '../screens/my-account';

import Category from '../screens/category';
import ConformationOrder from '../screens/conformation-order';
import Location from '../screens/location';
import Products from '../screens/products';
import LocationDetailes from '../screens/locationDeatiles';
import Favorites from '../screens/favorites';
import HelpCenter from '../screens/help-center';
import OrderRecevingRating from '../screens/order-recevinig-rating';
import OrderHistory from '../screens/orderhistory';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  const onBordingFlag = useSelector((state) => state.user.onBording);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={onBordingFlag ? 'Login' : 'OnBording1'}
        screenOptions={{ headerShown: false }}
      >
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
        <Stack.Screen name='MyAccount' component={MyAccount} />
        <Stack.Screen name='Category' component={Category} />
        <Stack.Screen name='ConformationOrder' component={ConformationOrder} />
        <Stack.Screen name='Location' component={Location} />
        <Stack.Screen name='Products' component={Products} />
        <Stack.Screen name='LocationDetailes' component={LocationDetailes} />
        <Stack.Screen name='Favorites' component={Favorites} />
        <Stack.Screen name='HelpCenter' component={HelpCenter} />
        <Stack.Screen
          name='OrderRecevingRating'
          component={OrderRecevingRating}
        />
        <Stack.Screen name='OrderHistory' component={OrderHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
