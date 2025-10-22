import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import OtpVerificationOptionComponent from '../components/opt-verification-option';

const ForgotPassword = () => {
  return (
    <OtpVerificationOptionComponent
      header='Forgot Password'
      subHeader='Select which contact details should we use to reset your password'
    />
  );
};

export default ForgotPassword;
