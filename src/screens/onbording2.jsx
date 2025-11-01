import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import OnBordingComponents from '../components/onbording-components';
import { useDispatch } from 'react-redux';
import { setOnBording } from '../redux/slices/userSlice';

const OnBording2 = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <OnBordingComponents
      image={require('../../assets/welcome2.png')}
      header='Your Bookish Soulmate Awaits'
      paragraph='Let us be your guide to the perfect read. Discover books tailored to your tastes for a truly rewarding experience.'
      onPressContinouse={() => {
        navigation.navigate('OnBording3');
      }}
      onPressSkip={() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
        disptach(setOnBording(true));
      }}
      onPressSignin={() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
        disptach(setOnBording(true));
      }}
      activebox2={{ backgroundColor: '#54408C', borderRadius: 10, padding: 5 }}
    />
  );
};

export default OnBording2;

const styles = StyleSheet.create({});
