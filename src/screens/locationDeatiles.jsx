import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/button';
import CustomTextInput from '../components/custom-text-input';

const LocationDetailes = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={25} color='black' />
        </TouchableOpacity>

        <Text style={styles.title}>Location</Text>

        <TouchableOpacity>
          <Ionicons name='locate' size={25} color='#54408C' />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <CustomTextInput label='Phone' placeholder='Phone' />
            <CustomTextInput label='Name' placeholder='Name' />
            <CustomTextInput label='Governorate' placeholder='Governorate' />
            <CustomTextInput label='City' placeholder='City' />
            <CustomTextInput label='Block' placeholder='Block' />
            <CustomTextInput
              label='Street name /number'
              placeholder='Street name /number'
            />
            <CustomTextInput
              label='Building name/number'
              placeholder='Building name/number'
            />
            <CustomTextInput
              label='Floor (option)'
              placeholder='Floor (option)'
            />
            <CustomTextInput label='Flat(option)' placeholder='Flat(option)' />
            <CustomTextInput
              label='Avenue (option)'
              placeholder='Avenue (option)'
            />
          </View>
        </ScrollView>
        <View>
          <CustomButton
            style={styles.button}
            title='Continue'
            textStyle={styles.buttonText}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LocationDetailes;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  form: {
    marginTop: 10,
  },
  button: {
    padding: 20,
    borderRadius: 60,
    margin: 20,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
