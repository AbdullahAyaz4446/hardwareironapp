import { useNavigation } from '@react-navigation/native';
import SuccessVerificationComponent from '../components/success-verification-component';

const SuccessVerification = () => {
  const navigation = useNavigation();
  return (
    <SuccessVerificationComponent
      header='Congratulation!'
      subheader='your account is complete, please enjoy the best menu from us.'
      butttonTitle='Get Started'
      onPress={() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }}
    />
  );
};

export default SuccessVerification;
