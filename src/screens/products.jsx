import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import { FlashList } from '@shopify/flash-list';

import { useEffect, useRef, useState } from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { SafeAreaView } from 'react-native-safe-area-context';

import ProductDetailsSheet from '../components/activeSheet';

import CustomTextInput from '../components/custom-text-input';

import { allCategory, baseUrl, productById } from '../apis/server';

const Products = ({ route }) => {
  const navigation = useNavigation();

  const actionSheetRef = useRef(null);

  const [selectedTag, setSelectedTag] = useState('All');

  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const categoryId = route.params?.categoryId;

  const [searchText, setSearchText] = useState('');
  6;

  const searchHeight = useSharedValue(0);

  const [tags, setTags] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const handleTagPress = (tag) => {
    if (tag.name === 'All') {
      setSelectedTag(tag.name);

      getAllProducts();

      return;
    }

    setSelectedTag(tag.name);

    getAllProducts(tag.id);
  };

  const filteredProducts = products.filter((item) =>
    (item.name || item.title || '')

      .toLowerCase()

      .includes(searchText.toLowerCase())
  );

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

  const getAllProducts = async (id) => {
    try {
      setIsLoading(true);
      const data = await productById(id);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllCategories = async () => {
    const data = await allCategory();

    setTags([...data, { id: '0', name: 'All' }]);
  };

  useEffect(() => {
    if (categoryId) {
      getAllProducts(categoryId);
    } else {
      getAllCategories();
      getAllProducts('0');
    }
  }, [categoryId]);

  const renderTag = ({ item }) => {
    const isSelected = selectedTag === item.name;

    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 20 }}
        onPress={() => handleTagPress(item)}
      >
        <Text
          style={{
            paddingVertical: 10,

            fontSize: 16,

            color: isSelected ? 'black' : 'gray',

            fontWeight: isSelected ? 'bold' : '500',
          }}
        >
          {item.name}
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
        <CustomTextInput placeholder='Search...' onChangeText={setSearchText} />
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

      {!isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='black' />
          <Text style={styles.loadingText}>Loading Products...</Text>
        </View>
      ) : (
        <FlashList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={80}
          contentContainerStyle={{ padding: 20 }}
        />
      )}

      <ProductDetailsSheet
        ref={actionSheetRef}
        selectedProduct={selectedProduct}
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

  loadingContainer: {
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
