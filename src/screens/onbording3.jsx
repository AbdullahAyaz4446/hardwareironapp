import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import OnBordingComponents from '../components/onbording-components';

const OnBording3 = () => {
  const navigation = useNavigation();
  return (
    <OnBordingComponents
      image={require('../../assets/welcome3.png')}
      header='Start Your Adventure'
      paragraph='Ready to embark on a quest for inspiration and knowledge? Your adventure begins now. Lets go!'
      onPressContinouse={() => {
        try {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        } catch (error) {
          console.error(error);
        }
      }}
      onPressSkip={() => {
        try {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        } catch (error) {
          console.error(error);
        }
      }}
      onPressSignin={() => {
        try {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        } catch (error) {
          console.error(error);
        }
      }}
      activebox3={{ backgroundColor: '#54408C', borderRadius: 10, padding: 5 }}
    />
  );
};

export default OnBording3;

const styles = StyleSheet.create({});
