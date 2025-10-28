import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { FlashList } from '@shopify/flash-list';
import ActionSheet from 'react-native-actions-sheet';
import CustomTextInput from '../components/custom-text-input';
import CustomButton from '../components/button';

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
    description:
      'A heartbreaking story of friendship and redemption set in Afghanistan.',
  },
  {
    id: '2',
    image: require('../../assets/slider1.png'),
    title: 'Atomic Habits',
    description:
      'A guide to building good habits and breaking bad ones through small changes.',
  },
  {
    id: '3',
    image: require('../../assets/slider1.png'),
    title: 'Rich Dad Poor Dad',
    description:
      'Lessons on financial independence and mindset from two contrasting father figures.',
  },
  {
    id: '4',
    image: require('../../assets/slider1.png'),
    title: 'Ikigai',
    description:
      'The Japanese secret to a long and happy life through purpose and balance.',
  },
];

const Products = () => {
  const navigation = useNavigation();
  const actionSheetRef = useRef(null);

  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [lastPressed, setLastPressed] = useState(null);

  const searchHeight = useSharedValue(0);

  const handleTagPress = (tag) => {
    setSelectedTag(tag);
  };

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

  const increment = () => {
    setLastPressed('increment');
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setLastPressed('decrement');
      setQuantity((prev) => prev - 1);
    }
  };

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setIsFavorite(false);
    setQuantity(1);
    actionSheetRef.current?.show();
  };

  const renderTag = ({ item }) => {
    const isSelected = selectedTag === item.tag;
    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 20 }}
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
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => openProductDetails(item)}
    >
      <Image source={item.image} style={styles.bookImage} />
      <View style={{ marginLeft: 15, flex: 1 }}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={25} color='black' />
        </TouchableOpacity>
        <Text style={styles.title}>Products</Text>
        <TouchableOpacity onPress={toggleSearch}>
          <Ionicons name='search' size={25} color='black' />
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          { overflow: 'hidden', paddingHorizontal: 20, marginBottom: 10 },
          animatedStyle,
        ]}
      >
        <CustomTextInput placeholder='Search...' />
      </Animated.View>

      <FlashList
        horizontal
        data={tags}
        renderItem={renderTag}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: 10,
        }}
      />

      <FlashList
        data={initialImages}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={80}
        contentContainerStyle={{ padding: 20 }}
      />

      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled
        defaultOverlayOpacity={0.5}
        containerStyle={{
          flex: 1,
          padding: 20,
          backgroundColor: '#F5F5F5',
        }}
      >
        {selectedProduct && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={selectedProduct.image}
              style={{
                width: '100%',
                height: Dimensions.get('screen').height / 2.5,
                borderRadius: 20,
              }}
              resizeMode='contain'
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 15,
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {selectedProduct.title}
              </Text>

              <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={30}
                  color={isFavorite ? '#54408C' : '#000'}
                />
              </TouchableOpacity>
            </View>

            <Text style={{ color: '#A6A6A6', paddingVertical: 10 }}>
              {selectedProduct.description}
            </Text>

            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>
              Review
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginBottom: 20,
                alignItems: 'center',
              }}
            >
              {[...Array(4)].map((_, i) => (
                <Ionicons key={i} name='star' size={28} color='#54408C' />
              ))}
              <Ionicons name='star' size={28} color='#000' />
              <Text style={{ fontWeight: 'bold', paddingHorizontal: 10 }}>
                (4.0)
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginBottom: 20,
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FAFAFA',
                  borderRadius: 10,
                  paddingHorizontal: 5,
                  marginRight: 10,
                }}
              >
                <TouchableOpacity
                  onPress={decrement}
                  style={{
                    backgroundColor:
                      lastPressed === 'decrement' ? '#54408C' : '#ccc',
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}
                  >
                    -
                  </Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  {quantity}
                </Text>

                <TouchableOpacity
                  onPress={increment}
                  style={{
                    backgroundColor:
                      lastPressed === 'increment' ? '#54408C' : '#ccc',
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: '#54408C',
                }}
              >
                ${(3.9 * quantity).toFixed(2)}
              </Text>
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <CustomButton
                style={{
                  padding: 20,
                  borderRadius: 60,
                  width: '65%',
                }}
                title='Continue Shopping'
                textStyle={{ fontWeight: 'bold' }}
              />
              <CustomButton
                onPress={() => navigation.navigate('ConformationOrder')}
                style={{
                  padding: 20,
                  borderRadius: 60,
                  width: '30%',
                  backgroundColor: '#FAF9FD',
                }}
                title='View Cart'
                textStyle={{ fontWeight: 'bold', color: '#54408C' }}
              />
            </View>
          </ScrollView>
        )}
      </ActionSheet>
    </SafeAreaView>
  );
};

export default Products;

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
  card: {
    borderRadius: 15,
    paddingVertical: 10,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    resizeMode: 'cover',
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  bookDescription: {
    marginTop: 5,
    color: '#555',
    fontSize: 14,
  },
});
