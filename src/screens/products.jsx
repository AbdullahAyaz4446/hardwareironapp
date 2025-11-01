import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductDetailsSheet from '../components/activeSheet';
import CustomTextInput from '../components/custom-text-input';
import { baseUrl, productById } from '../apis/server';

const tags = [
  { id: 1, tag: 'All' },
  { id: 2, tag: 'Novels' },
  { id: 3, tag: 'Self Love' },
  { id: 4, tag: 'Science' },
  { id: 5, tag: 'Romantic' },
];

const initialImages = [
  {
    id: '1',
    image: require('../../assets/slider1.png'),
    title: 'The Kite Runner',
    description: 'A heartbreaking story of friendship and redemption.',
    quantity: 1,
  },
  {
    id: '2',
    image: require('../../assets/slider1.png'),
    title: 'Atomic Habits',
    description: 'A guide to building habits and breaking bad ones.',
    quantity: 1,
  },
  {
    id: '3',
    image: require('../../assets/slider1.png'),
    title: 'Rich Dad Poor Dad',
    description: 'Lessons on financial independence and mindset.',
    quantity: 1,
  },
  {
    id: '4',
    image: require('../../assets/slider1.png'),
    title: 'Ikigai',
    description: 'The Japanese secret to a long and happy life.',
    quantity: 1,
  },
];

const Products = ({ route }) => {
  const navigation = useNavigation();
  const actionSheetRef = useRef(null);
  const [selectedTag, setSelectedTag] = useState('All');
  const [products, setProducts] = useState(initialImages);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const categoryId = route.params.categoryId;

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

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    actionSheetRef.current?.show();
  };

  const updateQuantity = (id, newQty) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: newQty } : p))
    );
  };

  const getAllProducts = async () => {
    const data = await productById(categoryId);
    setProducts(data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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

  const renderProduct = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => openProductDetails(item)}
      >
        <Image
          source={{ uri: baseUrl + '/' + item.image }}
          style={styles.bookImage}
        />
        <View style={{ marginLeft: 15, flex: 1 }}>
          <Text style={styles.bookTitle}>{item.name}</Text>
          <Text style={styles.bookDescription}>{item.Descripation}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={80}
        contentContainerStyle={{ padding: 20 }}
      />

      <ProductDetailsSheet
        ref={actionSheetRef}
        selectedProduct={selectedProduct}
        updateQuantity={updateQuantity}
      />
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
