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
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Bar from '../components/bar';
import CustomButton from '../components/button';
import CustomTextInput from '../components/custom-text-input';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../apis/server';
import { Ionicons } from '@expo/vector-icons';
import { setSignup } from '../redux/slices/userSlice';
import dummyPic from '../../assets/man.png';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.user && user?.user?.email) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Tab' }],
      });
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
        setLoader(true);
        const result = await logIn(email.toLowerCase(), password);
        if (result.loginSuccess) {
          dispatch(setSignup(result.user));
          navigation.reset({
            index: 0,
            routes: [{ name: 'Tab' }],
          });
        } else {
          setAlertModalVisible(true);
          setTimeout(() => setAlertModalVisible(false), 1000);
        }
      } catch (error) {
        console.error('Login error:', error);
      } finally {
        setLoader(false);
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
      } else {
        setAlertModalVisible(true);
        setTimeout(() => setAlertModalVisible(false), 1000);
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
          title={loader ? 'Logining....' : 'Login'}
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
        <Modal
          transparent
          visible={alertModalVisible}
          animationType='fade'
          onRequestClose={() => setSuccessModalVisible(false)}
        >
          <Pressable
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.3)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setAlertModalVisible(false)}
          >
            <View
              style={{
                backgroundColor: '#fff',
                padding: 25,
                borderRadius: 15,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
                width: '50%',
              }}
            >
              <Ionicons name='close-circle' size={50} color='red' />

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#54408C',
                  marginTop: 10,
                }}
              >
                Login Failed!
              </Text>
            </View>
          </Pressable>
        </Modal>
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
