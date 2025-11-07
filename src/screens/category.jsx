import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
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
import CustomTextInput from '../components/custom-text-input';
import { FlashList } from '@shopify/flash-list';
import { allCategory, baseUrl } from '../apis/server';

const Category = () => {
  const navigation = useNavigation();
  const searchHeight = useSharedValue(0);
  const [selectedTag, setSelectedTag] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const [popularImages, setPopularImages] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getAllCategories = async () => {
    try {
      setIsLoading(true);
      const data = await allCategory();
      setPopularImages(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const filteredCategories = popularImages.filter((item) =>
    item.name?.toLowerCase().includes(searchText.toLowerCase())
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

  const handleTagPress = (tag) => {
    setSelectedTag(tag);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getAllCategories();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const showList = ({ item }) => {
    return (
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Products', { categoryId: item.id });
          }}
          style={{ width: '90%', margin: 10 }}
        >
          <Image
            source={{ uri: baseUrl + '/' + item.image }}
            style={styles.bookImage}
          />
          <Text style={styles.bookTitle}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
        <CustomTextInput placeholder='Search...' onChangeText={setSearchText} />
      </Animated.View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#007AFF' />
          <Text style={styles.loadingText}>Loading Categories...</Text>
        </View>
      ) : (
        <FlashList
          data={filteredCategories}
          numColumns={2}
          renderItem={showList}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
