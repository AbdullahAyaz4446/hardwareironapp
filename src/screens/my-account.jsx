import React, { useState, useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import { baseUrl } from '../apis/server';

const MyAccount = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(
    require('../../assets/accountImage.png')
  );

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.fullname || '');
      setEmail(user.email || '');
      setPhone(user.phoneNumber || '');
      if (user.image && typeof user.image === 'string') {
        setProfileImage({ uri: user.image });
      }
    }
  }, [user]);

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

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={
                user.image == 'N/A'
                  ? require('../../assets/man.png')
                  : { uri: baseUrl + user.image }
              }
              style={styles.profileImage}
              resizeMode='cover'
            />
          </View>
          <TouchableOpacity
            onPress={pickImage}
            style={styles.changeImageButton}
          >
            <Text style={styles.changeImageText}>Change Image</Text>
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
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 15,
    alignSelf: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  changeImageButton: {
    alignSelf: 'center',
  },
  changeImageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#54408C',
  },
});
