import { useNavigation } from '@react-navigation/native';
import SuccessVerificationComponent from '../components/success-verification-component';

const SuccessVerificationPasswordChange = () => {
  const navigation = useNavigation();
  return (
    <SuccessVerificationComponent
      header='Password Changed!'
      subheader='Password changed successfully, you can login again with a new password'
      butttonTitle='Login'
      onPress={() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }}
    />
  );
};

export default SuccessVerificationPasswordChange;
