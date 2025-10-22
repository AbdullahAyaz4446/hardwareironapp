import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SuccessVerificationComponent from '../components/success-verification-component';

const SuccessVerifcation = () => {
  return (
    <SuccessVerificationComponent
      header='Congratulation!'
      subheader='your account is complete, please enjoy the best menu from us.'
    />
  );
};

export default SuccessVerifcation;

const styles = StyleSheet.create({});
