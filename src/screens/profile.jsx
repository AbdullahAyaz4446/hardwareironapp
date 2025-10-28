import React from 'react';
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

const Profile = () => {
  const navigation = useNavigation();
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
                width: Dimensions.get('screen').width / 7,
                height: Dimensions.get('screen').width / 7,
                borderRadius: 50,
                marginRight: 10,
              }}
            >
              <Image
                source={require('../../assets/accountImage.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 50,
                }}
                resizeMode='cover'
              />
            </TouchableOpacity>

            <View>
              <Text>Abdullah</Text>
              <Text>(+1) 234 567 890</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>Logout</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MyAccount');
          }}
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
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                borderRadius: 40,
                padding: 10,
                backgroundColor: '#FAF9FD',
                marginRight: 10,
              }}
            >
              <Ionicons name='person' size={20} color='#54408C' />
            </View>
            <Text style={{ fontSize: 16 }}>My Account</Text>
          </View>
          <Ionicons name='chevron-forward' size={20} color='black' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Location');
          }}
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
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                borderRadius: 40,
                padding: 10,
                backgroundColor: '#FAF9FD',
                marginRight: 10,
              }}
            >
              <Ionicons name='location' size={20} color='#54408C' />
            </View>
            <Text style={{ fontSize: 16 }}>Address</Text>
          </View>
          <Ionicons name='chevron-forward' size={20} color='black' />
        </TouchableOpacity>
        {/* 
        <TouchableOpacity
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
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                borderRadius: 40,
                padding: 10,
                backgroundColor: '#FAF9FD',
                marginRight: 10,
              }}
            >
              <Ionicons name='flame' size={25} color='#54408C' />
            </View>
            <Text style={{ fontSize: 16 }}>Offers & Promos</Text>
          </View>
          <Ionicons name='chevron-forward' size={20} color='black' />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Favorites');
          }}
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
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                borderRadius: 40,
                padding: 10,
                backgroundColor: '#FAF9FD',
                marginRight: 10,
              }}
            >
              <Ionicons name='heart' size={20} color='#54408C' />
            </View>
            <Text style={{ fontSize: 16 }}>Your Favorites</Text>
          </View>
          <Ionicons name='chevron-forward' size={20} color='black' />
        </TouchableOpacity>
        {/* <TouchableOpacity
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
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                borderRadius: 40,
                padding: 10,
                backgroundColor: '#FAF9FD',
                marginRight: 10,
              }}
            >
              <Ionicons name='document-text' size={20} color='#54408C' />
            </View>
            <Text style={{ fontSize: 16 }}>Order History</Text>
          </View>
          <Ionicons name='chevron-forward' size={20} color='black' />
        </TouchableOpacity> */}
        {/* <TouchableOpacity
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
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                borderRadius: 40,
                padding: 10,
                backgroundColor: '#FAF9FD',
                marginRight: 10,
              }}
            >
              <Ionicons name='chatbubble' size={20} color='#54408C' />
            </View>
            <Text style={{ fontSize: 16 }}>Help Center</Text>
          </View>
          <Ionicons name='chevron-forward' size={20} color='black' />
        </TouchableOpacity> */}
      </ScrollView>
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
  redDot: {
    position: 'absolute',
    right: 2,
    top: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
});
