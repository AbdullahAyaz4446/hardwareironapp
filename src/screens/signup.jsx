import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../components/button';
import CustomTextInput from '../components/custom-text-input';
import TopBar from '../components/topBar';
import { setSignup } from '../redux/slices/userSlice';

const Signup = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const submitData = () => {
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{11}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    if (!name.trim()) {
      setNameError('Name is required');
      valid = false;
    } else setNameError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    } else setEmailError('');

    if (!phoneNumber.trim()) {
      setPhoneError('Phone number is required');
      valid = false;
    } else if (!phoneRegex.test(phoneNumber)) {
      setPhoneError('Please enter a valid 11-digit phone number');
      valid = false;
    } else setPhoneError('');

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 6 characters and include both letters and numbers'
      );
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    dispatch(
      setSignup({
        name,
        email,
        phone: phoneNumber,
        password,
      })
    );
    navigation.navigate('OtpVerificationOption');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <TopBar onPress={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          backgroundColor: '#FFFFFF',
        }}
      >
        <View style={{ paddingVertical: 20 }}>
          <Text style={{ fontSize: 24, paddingBottom: 10, fontWeight: 'bold' }}>
            Sign Up
          </Text>
          <Text style={{ fontSize: 16, color: '#A5A5A5' }}>
            Create account and choose favorite menu
          </Text>
        </View>

        <CustomTextInput
          label='Name'
          placeholder='Your name'
          value={name}
          onChangeText={setName}
          error={nameError}
        />

        <CustomTextInput
          label='Email'
          placeholder='Your email'
          value={email}
          onChangeText={setEmail}
          error={emailError}
        />

        <CustomTextInput
          label='Phone Number'
          placeholder='Your phone number'
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          error={phoneError}
          keyboardType='numeric'
        />

        <CustomTextInput
          label='Password'
          placeholder='Your password'
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          showEyeIcon={true}
          error={passwordError}
        />

        <CustomButton
          style={{ padding: 20, fontWeight: 'bold', borderRadius: 60 }}
          title='Register'
          textStyle={{ fontWeight: 'bold' }}
          onPress={submitData}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#A5A5A5' }}>Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{ color: '#54408C', fontSize: 16, fontWeight: 'bold' }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            color: '#A6A6A6',
            textAlign: 'center',
            paddingTop: 40,
            fontWeight: 'bold',
          }}
        >
          By clicking Register, you agree to our
        </Text>
        <Text
          style={{
            color: '#54408C',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Terms and Data Policy.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({});
