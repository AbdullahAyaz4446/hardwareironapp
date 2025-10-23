import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { SafeAreaView } from 'react-native-safe-area-context';

import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import TopBar from '../components/topBar';
import CustomButton from '../components/button';
import { useSelector } from 'react-redux';

const OtpVerification = () => {
  const navigation = useNavigation();
  const flag = useSelector((state) => state.flag.flag);
  console.log(flag);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBar onPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={100}
          style={{
            flex: 1,
          }}
        >
          <Text style={styles.heading}>Verification</Text>
          <Text style={[styles.subHeading, { paddingBottom: 4 }]}>
            Please enter the code
          </Text>

          <OtpInput
            numberOfDigits={4}
            focusColor='green'
            autoFocus={false}
            hideStick={true}
            placeholder='****'
            blurOnFilled={true}
            disabled={false}
            type='numeric'
            secureTextEntry={false}
            focusStickBlinkingDuration={500}
            onFocus={() => console.log('Focused')}
            onBlur={() => console.log('Blurred')}
            onTextChange={(text) => console.log(text)}
            onFilled={(text) => console.log(`OTP is ${text}`)}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            textProps={{
              accessibilityRole: 'text',
              accessibilityLabel: 'OTP digit',
              allowFontScaling: false,
            }}
            theme={{
              containerStyle: styles.otpContainer,
              focusedPinCodeContainerStyle: styles.activePinCodeContainer,
              pinCodeContainerStyle: {
                width: '23%',
                aspectRatio: 1,
              },
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 20,
            }}
          >
            <Text style={{ color: '#A5A5A5' }}>
              If you didn’t receive a code?{' '}
            </Text>
            <TouchableOpacity>
              <Text
                style={{ color: '#54408C', fontSize: 16, fontWeight: 'bold' }}
              >
                Resend
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'flex-end', flex: 1 }}>
            <CustomButton
              style={styles.button}
              title='Continue'
              textStyle={styles.buttonText}
              onPress={() => {
                if (flag) {
                  navigation.navigate('ResetPassword');
                } else {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'SuccessVerification' }],
                  });
                }
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtpVerification;

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
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    color: '#A6A6A6',
    paddingBottom: 20,
    textAlign: 'center',
  },
  button: {
    padding: 20,
    borderRadius: 60,
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  otpContainer: {
    width: Dimensions.get('screen').width / 1.5,
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  activePinCodeContainer: {
    borderWidth: 1,
    borderColor: '#54408C',
  },
});
