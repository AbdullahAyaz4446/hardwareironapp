import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../components/custom-text-input';
import { FlashList } from '@shopify/flash-list';

const { width } = Dimensions.get('window');

const tags = [
  { id: 1, tag: 'All' },
  { id: 2, tag: 'Novels' },
  { id: 3, tag: 'Self Love' },
  { id: 4, tag: 'Science' },
  { id: 5, tag: 'Romantic' },
  { id: 6, tag: 'Angry' },
];

const initialImages = [
  {
    id: '1',
    image: require('../../assets/slider1.png'),
    title: 'The Kite Runner',
    price: '$14.99',
  },
  {
    id: '2',
    image: require('../../assets/slider1.png'),
    title: 'Atomic Habits',
    price: '$12.49',
  },
  {
    id: '3',
    image: require('../../assets/slider1.png'),
    title: 'Rich Dad Poor Dad',
    price: '$9.99',
  },
  {
    id: '4',
    image: require('../../assets/slider1.png'),
    title: 'Ikigai',
    price: '$10.99',
  },
  {
    id: '5',
    image: require('../../assets/slider1.png'),
    title: 'Ikigai',
    price: '$10.99',
  },
  {
    id: '6',
    image: require('../../assets/slider1.png'),
    title: 'Ikigai',
    price: '$10.99',
  },
  {
    id: '7',
    image: require('../../assets/slider1.png'),
    title: 'Ikigai',
    price: '$10.99',
  },
  {
    id: '8',
    image: require('../../assets/slider1.png'),
    title: 'Ikigai',
    price: '$10.99',
  },
  {
    id: '9',
    image: require('../../assets/slider1.png'),
    title: 'Ikigai',
    price: '$10.99',
  },
  {
    id: '10',
    image: require('../../assets/slider1.png'),
    title: 'Ikigai last',
    price: '$10.99',
  },
];

const Category = () => {
  const navigation = useNavigation();
  const searchHeight = useSharedValue(0);
  const [selectedTag, setSelectedTag] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const [popularImages, setPopularImages] = useState(initialImages);

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
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const showList = ({ item }) => (
    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Products');
        }}
        style={{ width: '90%', margin: 10 }}
      >
        <Image source={item.image} style={styles.bookImage} />
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookPrice}>{item.price}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={25} color='black' />
        </TouchableOpacity>

        <Text style={styles.title}>Category</Text>

        <TouchableOpacity onPress={toggleSearch}>
          <Ionicons name='search' size={25} color='black' />
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

      <FlashList
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={80}
        data={tags}
        contentContainerStyle={{
          height: 50,
          alignItems: 'center',
          paddingHorizontal: 10,
        }}
        renderItem={({ item }) => {
          const isSelected = selectedTag === item.tag;
          return (
            <TouchableOpacity
              style={{
                paddingHorizontal: 15,
              }}
              onPress={() => handleTagPress(item.tag)}
            >
              <Text
                style={{
                  paddingVertical: 10,
                  fontSize: 16,
                  color: isSelected ? 'black' : 'gray',
                  fontWeight: isSelected ? 'bold' : '500',
                }}
              >
                {item.tag}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <FlashList data={popularImages} numColumns={2} renderItem={showList} />
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
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  bookImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    resizeMode: 'cover',
    padding: 2,
  },
  bookTitle: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  bookPrice: {
    color: '#54408C',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
