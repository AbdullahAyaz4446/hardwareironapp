import React, { useState } from 'react';
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Bar from '../components/bar';
import CustomButton from '../components/button';
import CustomTextInput from '../components/custom-text-input';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#FFFFFF',
          padding: 20,
        }}
      >
        <View style={{ paddingVertical: 20 }}>
          <Text style={{ fontSize: 24, paddingBottom: 10, fontWeight: 'bold' }}>
            Welcome Back 👋
          </Text>
          <Text style={{ fontSize: 16, color: '#A5A5A5' }}>
            Sign to your account
          </Text>
        </View>

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

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text
            style={{
              color: '#54408C',
              fontSize: 14,
              paddingBottom: 20,
              fontWeight: 'bold',
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <CustomButton
          style={{ padding: 20, fontWeight: 'bold', borderRadius: 60 }}
          title='Login'
          textStyle={{ fontWeight: 'bold' }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#A5A5A5' }}>Don't have a account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}
          >
            <Text
              style={{
                color: '#54408C',
                fontSize: 16,
                fontWeight: 'bold',
                paddingVertical: 2,
                paddingHorizontal: 15,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <Bar />

        <TouchableOpacity
          style={{
            padding: 20,
            fontWeight: 'bold',
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: 60,
            marginBottom: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../assets/google.png')}
            style={{
              width: 20,
              height: 20,
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
          />
          <Text style={{ paddingLeft: 10 }}>Sign in with Google</Text>
        </TouchableOpacity>

        <View style={{ paddingBottom: 40 }}>
          <TouchableOpacity
            style={{
              padding: 20,
              fontWeight: 'bold',
              backgroundColor: 'white',
              borderWidth: 1,
              borderRadius: 60,
              marginBottom: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={require('../../assets/apple.png')}
              style={{
                width: 20,
                height: 20,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />
            <Text style={{ paddingLeft: 10 }}>Sign in with Apple</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
