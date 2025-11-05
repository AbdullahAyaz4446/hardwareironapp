import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ActionSheet from 'react-native-actions-sheet';
import CustomButton from '../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../redux/slices/userSlice';
import { baseUrl } from '../apis/server';

const Profile = () => {
  const navigation = useNavigation();
  const actionSheetRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogoutPress = () => {
    actionSheetRef.current?.show();
  };

  const confirmLogout = () => {
    actionSheetRef.current?.hide();
    dispatch(reset());
    navigation.navigate('Login');
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
        <Text style={styles.title}>Profile</Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 30,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                marginRight: 10,
              }}
            >
              <Image
                source={
                  user.image == 'N/A'
                    ? require('../../assets/man.png')
                    : { uri: baseUrl + user.image }
                }
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 50,
                }}
                resizeMode='cover'
              />
            </TouchableOpacity>

            <View>
              <Text>{user.fullname}</Text>
              <Text>{user.phoneNumber}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleLogoutPress}>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>Logout</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('MyAccount')}
          style={styles.listItem}
        >
          <View style={styles.iconRow}>
            <View style={styles.iconCircle}>
              <Ionicons name='person' size={20} color='#54408C' />
            </View>
            <Text style={styles.itemText}>My Account</Text>
          </View>
          <Ionicons name='chevron-forward' size={20} color='black' />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Location')}
          style={styles.listItem}
        >
          <View style={styles.iconRow}>
            <View style={styles.iconCircle}>
              <Ionicons name='location' size={20} color='#54408C' />
            </View>
            <Text style={styles.itemText}>Address</Text>
          </View>
          <Ionicons name='chevron-forward' size={20} color='black' />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Favorites')}
          style={styles.listItem}
        >
          <View style={styles.iconRow}>
            <View style={styles.iconCircle}>
              <Ionicons name='heart' size={20} color='#54408C' />
            </View>
            <Text style={styles.itemText}>Your Favorites</Text>
          </View>
          <Ionicons name='chevron-forward' size={20} color='black' />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('OrderHistory');
          }}
          style={styles.listItem}
        >
          <View style={styles.iconRow}>
            <View style={styles.iconCircle}>
              <Ionicons name='document-text' size={20} color='#54408C' />
            </View>
            <Text style={styles.itemText}>Order History</Text>
          </View>
          <Ionicons name='chevron-forward' size={20} color='black' />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('HelpCenter');
          }}
          style={styles.listItem}
        >
          <View style={styles.iconRow}>
            <View style={styles.iconCircle}>
              <Ionicons name='chatbubble' size={20} color='#54408C' />
            </View>
            <Text style={styles.itemText}>Help Center</Text>
          </View>
          <Ionicons name='chevron-forward' size={20} color='black' />
        </TouchableOpacity>
      </ScrollView>

      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled
        defaultOverlayOpacity={0.5}
        containerStyle={styles.actionSheetContainer}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Logout</Text>
        <Text style={{ fontSize: 16, paddingVertical: 20 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
        <CustomButton
          style={{ padding: 20, fontWeight: 'bold', borderRadius: 60 }}
          title='Logout'
          textStyle={{ fontWeight: 'bold' }}
          onPress={confirmLogout}
        />
        <CustomButton
          style={{
            padding: 20,
            fontWeight: 'bold',
            borderRadius: 60,
            marginBottom: 0,
            backgroundColor: '#FAF9FD',
          }}
          title='Canncel'
          textStyle={{ fontWeight: 'bold', color: '#54408C' }}
          onPress={() => actionSheetRef.current.hide()}
        />
      </ActionSheet>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 40,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    borderRadius: 40,
    padding: 10,
    backgroundColor: '#FAF9FD',
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
  },
  actionSheetContainer: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
});
