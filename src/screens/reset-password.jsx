import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import CustomButton from '../components/button';
import TopBar from '../components/topBar';
import CustomTextInput from '../components/custom-text-input';

const ResetPassword = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const handleSubmit = () => {
    let valid = true;

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!cpassword.trim()) {
      setConfirmError('Confirm Password is required');
      valid = false;
    } else if (password !== cpassword) {
      setConfirmError('Passwords do not match');
      valid = false;
    } else {
      setConfirmError('');
    }

    if (!valid) return;

    navigation.reset({
      index: 0,
      routes: [{ name: 'SuccessVerificationPasswordChange' }],
    });
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
          <Text style={styles.heading}>New Password</Text>
          <Text style={styles.subHeading}>
            Create your new password, so you can login to your account.
          </Text>

          <CustomTextInput
            label='New Password'
            placeholder='Your password'
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            showEyeIcon={true}
            error={passwordError}
          />

          <CustomTextInput
            label='Confirm Password'
            placeholder='Confirm password'
            secureTextEntry={true}
            value={cpassword}
            onChangeText={setCpassword}
            showEyeIcon={true}
            error={confirmError}
          />

          <View style={styles.buttonContainer}>
            <CustomButton
              style={styles.button}
              title='Continue'
              textStyle={styles.buttonText}
              onPress={handleSubmit}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;

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
