import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '../components/button';
import CustomTextInput from '../components/custom-text-input';
import TopBar from '../components/topBar';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

const Signup = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <TopBar
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          backgroundColor: '#FFFFFF',
        }}
      >
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={100}
          style={{
            flex: 1,
          }}
        >
          <View style={{ paddingVertical: 20 }}>
            <Text
              style={{ fontSize: 24, paddingBottom: 10, fontWeight: 'bold' }}
            >
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
          />
          <CustomTextInput
            label='Email'
            placeholder='Your email'
            value={email}
            onChangeText={setEmail}
          />
          <CustomTextInput
            label='Password'
            placeholder='Your password'
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <CustomButton
            style={{ padding: 20, fontWeight: 'bold', borderRadius: 60 }}
            title='Register'
            textStyle={{ fontWeight: 'bold' }}
            onPress={() => {
              navigation.navigate('VerificationOption');
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#A5A5A5' }}>Have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}
            >
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
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({});
