import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Bar from '../components/bar';
import CustomButton from '../components/button';
import CustomTextInput from '../components/custom-text-input';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useSelector } from 'react-redux';
import { logIn } from '../apis/server';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (
      user.user.email == 'Abdullahayaz131@gmail.com' &&
      user.user.password == 'Abdullah4446'
    ) {
      navigation.navigate('Tab');
    }
  }, [user]);

  const handleLogin = async () => {
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      try {
        const result = await logIn(email, password);
        // if (result) {
        //   navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'Tab' }],
        //   });
        // }
        console.log(result);
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  };

  const handleAppleSignIN = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log('Apple login success:', credential);
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        console.log('User canceled Apple Sign-In');
      } else {
        console.error('Apple Sign-In error:', error);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const hasPlayServices = await GoogleSignin.hasPlayServices();
      if (hasPlayServices) {
        await GoogleSignin.signOut();
        const userInfo = await GoogleSignin.signIn();
        console.log('User Info:', userInfo);
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

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
          error={emailError}
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

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('OtpVerificationOptionForgotpassword')
          }
        >
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
          onPress={handleLogin}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#A5A5A5' }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
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
          onPress={handleGoogleSignIn}
          style={styles.socialButton}
        >
          <Image
            source={require('../../assets/google.png')}
            style={styles.socialIcon}
          />
          <Text style={{ paddingLeft: 10 }}>Sign in with Google</Text>
        </TouchableOpacity>
        {Platform.OS === 'ios' && (
          <TouchableOpacity
            onPress={handleAppleSignIN}
            style={[styles.socialButton, { marginBottom: 40 }]}
          >
            <Image
              source={require('../../assets/apple.png')}
              style={styles.socialIcon}
            />
            <Text style={{ paddingLeft: 10 }}>Sign in with Apple</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  socialButton: {
    padding: 20,
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 60,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
