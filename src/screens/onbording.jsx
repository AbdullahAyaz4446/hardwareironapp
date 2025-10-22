import { StyleSheet } from 'react-native';
import React from 'react';
import OnBordingComponents from '../components/onbording-components';
import { useNavigation } from '@react-navigation/native';

const OnBording = () => {
  const navigation = useNavigation();
  return (
    <OnBordingComponents
      image={require('../../assets/welcome1.png')}
      header='Now reading books will be easier'
      paragraph=' Discover new worlds, join a vibrant reading community. Start your reading adventure effortlessly with us.'
      onPressContinouse={() => {
        navigation.navigate('OnBording2');
      }}
      onPressSkip={() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }}
      onPressSignin={() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }}
      activebox1={{ backgroundColor: '#54408C', borderRadius: 10, padding: 10 }}
    />
  );
};

export default OnBording;

const styles = StyleSheet.create({});
