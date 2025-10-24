import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import CustomTextInput from '../components/custom-text-input';

const { width } = Dimensions.get('window');

const tags = [
  { id: 1, tag: 'All' },
  { id: 2, tag: 'Novels' },
  { id: 3, tag: 'Self Love' },
  { id: 4, tag: 'Science' },
  { id: 5, tag: 'Romantic' },
  { id: 6, tag: 'Angry' },
];

const Category = () => {
  const navigation = useNavigation();
  const searchHeight = useSharedValue(0);
  const [selectedTag, setSelectedTag] = useState('All');

  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(searchHeight.value, {
      duration: 350,
      easing: Easing.out(Easing.ease),
    }),
    opacity: withTiming(searchHeight.value > 0 ? 1 : 0, {
      duration: 350,
      easing: Easing.out(Easing.ease),
    }),
  }));

  const toggleSearch = () => {
    searchHeight.value = searchHeight.value === 0 ? 60 : 0;
  };

  const handleTagPress = (tag) => {
    setSelectedTag(tag);
    console.log('Tag pressed:', tag);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#FFFFFF',
          paddingVertical: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleSearch}>
            <Ionicons name='search' size={25} color='black' />
          </TouchableOpacity>

          <Text style={styles.title}>Category</Text>

          <TouchableOpacity>
            <View style={{ position: 'relative' }}>
              <Ionicons name='notifications-outline' size={25} color='black' />
              <View style={styles.redDot} />
            </View>
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            {
              overflow: 'hidden',
              paddingHorizontal: 20,
              marginBottom: 20,
            },
            animatedStyle,
          ]}
        >
          <CustomTextInput placeholder='Search...' />
        </Animated.View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagsContainer}
        >
          {tags.map((item, index) => {
            const isSelected = selectedTag === item.tag;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.tag]}
                onPress={() => handleTagPress(item.tag)}
              >
                <Text
                  style={[
                    styles.tagText,
                    {
                      color: isSelected ? 'black' : 'gray',
                      fontWeight: isSelected ? 'bold' : '500',
                    },
                  ]}
                >
                  {item.tag}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
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
  tagsContainer: {
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 2,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
