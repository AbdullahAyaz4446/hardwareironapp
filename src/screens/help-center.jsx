import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Linking,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const HelpCenter = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [email] = useState('abdullahayaz@example.com');
  const [phone] = useState('+92 300 1234567');

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${email}`);
  };

  const handlePhonePress = () => {
    const cleanedPhone = phone.replace(/\s/g, '');
    Linking.openURL(`tel:${cleanedPhone}`);
  };

  return (
    <>
      <StatusBar style='light' backgroundColor='#54408C' />

      <View style={[styles.topContainer, { paddingTop: insets.top + 10 }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back' size={25} color='white' />
          </TouchableOpacity>

          <Text style={styles.title}>HelpCenter</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.heading}>Help Center</Text>
        <Text style={styles.subText}>Tell us how we can help 👋</Text>
        <Text style={styles.subText}>
          Chapter are standing by for service & support!
        </Text>
      </View>

      {/* Bottom Section */}
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <ScrollView
          contentContainerStyle={styles.bottomContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contactCard}>
            <Text style={styles.cardTitle}>Get in Touch</Text>

            <TouchableOpacity
              style={styles.contactRow}
              onPress={handleEmailPress}
            >
              <Ionicons name='mail-outline' size={22} color='#54408C' />
              <Text style={styles.contactText}>{email}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactRow}
              onPress={handlePhonePress}
            >
              <Ionicons name='call-outline' size={22} color='#54408C' />
              <Text style={styles.contactText}>{phone}</Text>
            </TouchableOpacity>

            <Text style={styles.supportNote}>
              Our team typically responds within 24 hours.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  topContainer: {
    flex: 0.4,
    backgroundColor: '#54408C',
    paddingHorizontal: 20,
  },
  bottomContainer: {
    flexGrow: 1.5,
    padding: 20,
    alignItems: 'center',
  },
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
    color: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  subText: {
    textAlign: 'center',
    color: 'white',
  },
  contactCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0EDFF',
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  contactText: {
    color: '#54408C',
    fontSize: 16,
    marginLeft: 10,
  },
  supportNote: {
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
    marginTop: 15,
  },
});
