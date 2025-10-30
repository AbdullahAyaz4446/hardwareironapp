import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import CustomTextInput from '../components/custom-text-input';
import CustomButton from '../components/button';

const MyAccount = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('Abdullah Ayaz');
  const [email, setEmail] = useState('abdullahayaz@example.com');
  const [phone, setPhone] = useState('+92 300 1234567');
  const [password, setPassword] = useState('abdullah4446');
  const [profileImage, setProfileImage] = useState(
    require('../../assets/accountImage.png')
  );

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  const handleSave = () => {
    let valid = true;

    if (!name.trim()) {
      setNameError('Full name is required');
      valid = false;
    } else {
      setNameError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    const cleanedPhone = phone.replace(/\D/g, '');
    if (!cleanedPhone) {
      setPhoneError('Phone number is required');
      valid = false;
    } else if (!/^[0-9]{11}$/.test(cleanedPhone)) {
      setPhoneError('Enter a valid 11-digit phone number');
      valid = false;
    } else {
      setPhoneError('');
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

    if (!valid) return;

    Alert.alert(
      'Success',
      'Your account details have been saved successfully!'
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#FFFFFF',
          padding: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back' size={25} color='black' />
          </TouchableOpacity>

          <Text style={styles.title}>My Account</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={profileImage}
            style={styles.profileImage}
            resizeMode='cover'
          />
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.changeImage}>Change Image</Text>
          </TouchableOpacity>
        </View>

        <CustomTextInput
          label='Full Name'
          placeholder='Your full name'
          value={name}
          onChangeText={setName}
          error={nameError}
        />

        <CustomTextInput
          label='Email'
          placeholder='Your email'
          value={email}
          onChangeText={setEmail}
          error={emailError}
        />

        <CustomTextInput
          label='Phone Number'
          placeholder='Your phone number'
          value={phone}
          onChangeText={setPhone}
          error={phoneError}
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

        <CustomButton
          style={{ padding: 20, borderRadius: 60 }}
          title='Save Changes'
          textStyle={{ fontWeight: 'bold' }}
          onPress={handleSave}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: Dimensions.get('screen').width / 3,
    height: Dimensions.get('screen').width / 3,
    borderRadius: Dimensions.get('screen').width / 6,
  },
  changeImage: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#54408C',
  },
});
