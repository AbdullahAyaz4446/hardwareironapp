import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/button';

const LocationScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const actionSheetRef = useRef(null);
  const [selectedAddress, setSelectedAddress] = useState('Home');

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       Alert.alert('Permission Denied', 'Please allow location access.');
  //       setLoading(false);
  //       return;
  //     }

  //     let loc = await Location.getCurrentPositionAsync({});
  //     setLocation(loc);
  //     setLoading(false);
  //   })();
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      actionSheetRef.current?.show();
    }, 500);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={25} color='black' />
        </TouchableOpacity>

        <Text style={styles.title}>Location</Text>

        {/* <TouchableOpacity>
          <View style={{ position: 'relative' }}>
            <Ionicons name='notifications-outline' size={25} color='black' />
            <View style={styles.redDot} />
          </View>
        </TouchableOpacity> */}
        <View style={{ width: 24 }} />
      </View>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size='large' color='#000000ff' />
          <Text style={{ marginTop: 10 }}>Fetching your location...</Text>
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: 'transparent',
              padding: 20,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ position: 'relative' }}>
              {/* <MapView
            style={styles.map}
            showsUserLocation={true}
            region={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title='You are here'
            />
          </MapView> */}
            </View>
            <Text style={{ padding: 20, fontSize: 20, fontWeight: 'bold' }}>
              Detail Address
            </Text>
            <View
              style={{
                borderRadius: 20,
                borderColor: '#C4C4C4',
                padding: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LocationDetailes');
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#FAF9FD',
                    borderRadius: 20,
                    padding: 5,
                    marginRight: 10,
                  }}
                >
                  <Ionicons name='location' size={25} color='#54408C' />
                </View>

                <View style={{ width: '85%' }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                      paddingBottom: 5,
                    }}
                  >
                    Utama Street No.20
                  </Text>
                  <Text style={{ color: '#A6A6A6', paddingBottom: 10 }}>
                    Dumbo Street No.20, Dumbo, New York 10001, United States
                  </Text>
                </View>
              </TouchableOpacity>
              <CustomButton
                onPress={() => {
                  navigation.navigate('LocationDetailes');
                }}
                style={{
                  padding: 20,
                  fontWeight: 'bold',
                  borderRadius: 60,
                  width: '50%',
                  marginBottom: 0,
                  backgroundColor: '#FAF9FD',
                }}
                title='Add Location'
                textStyle={{ fontWeight: 'bold', color: '#54408C' }}
              />
            </View>

            <View style={{ borderWidth: 1, borderColor: '#E8E8E8' }} />
            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingTop: 20 }}>
              Save Address As
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 20,
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => setSelectedAddress('Home')}
                style={{
                  padding: 20,
                  backgroundColor: '#FAF9FD',
                  marginRight: 10,
                  borderRadius: 40,
                }}
              >
                <Text
                  style={{
                    color: selectedAddress === 'Home' ? '#54408C' : '#A6A6A6',
                    fontWeight: 'bold',
                  }}
                >
                  Home
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectedAddress('Office')}
                style={{
                  padding: 20,
                  backgroundColor: '#FAF9FD',
                  borderRadius: 40,
                }}
              >
                <Text
                  style={{
                    color: selectedAddress === 'Office' ? '#54408C' : '#A6A6A6',
                    fontWeight: 'bold',
                  }}
                >
                  Office
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <CustomButton
            style={{
              padding: 20,
              fontWeight: 'bold',
              borderRadius: 60,
              marginHorizontal: 20,
            }}
            title='Confirmation'
            textStyle={{ fontWeight: 'bold' }}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
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
  map: {
    width: '100%',
    height: 400,
    borderRadius: 15,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
