import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import OtpVerificationOptionComponent from '../components/opt-verification-option';

const VerificationOption = () => {
  return (
    <OtpVerificationOptionComponent
      header='Verification'
      subHeader='Select which contact details should we use to verify account'
    />
  );
};

export default VerificationOption;

const styles = StyleSheet.create({});
