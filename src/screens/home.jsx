import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Pressable,
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
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import ProductDetailsSheet from '../components/activeSheet';
import CustomButton from '../components/button';
import CustomTextInput from '../components/custom-text-input';
import ScrollViewHorizontal from '../components/scrollbar-horixental';
import { allCategory, baseUrl, topFiveProducts } from '../apis/server';
import { FlashList } from '@shopify/flash-list';
import Skeleton from 'react-native-reanimated-skeleton';
const { width } = Dimensions.get('window');

const data = [
  { id: 1, image: require('../../assets/slider1.png') },
  { id: 2, image: require('../../assets/slider2.png') },
  { id: 3, image: require('../../assets/slider3.png') },
];

const Home = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const carouselRef = useRef(null);
  const progress = useSharedValue(0);
  const searchHeight = useSharedValue(0);
  const [popularImages, setPopularImages] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const actionSheetRef = useRef(null);
  const [top5Products, setTop5Products] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 New state for loader

  const getAllCategories = async () => {
    try {
      setLoading(true);
      const data = await allCategory();
      const topFive = await topFiveProducts();
      setPopularImages(data);
      setTop5Products(topFive);
    } catch (err) {
      console.log('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

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

  const onPressPagination = (index) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ count: index, animated: true });
    }
  };

  const toggleSearch = () => {
    searchHeight.value = searchHeight.value === 0 ? 60 : 0;
  };

  const filteredCategories = popularImages.filter((item) =>
    item.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await getAllCategories();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const openModal = (item) => {
    setSelectedProduct(item);
    actionSheetRef.current?.setModalVisible(true);
  };

  const showList = ({ item }) => {
    return (
      <Skeleton
        isLoading={true}
        style={{ justifyContent: 'space-between', flexDirection: 'row' }}
      >
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
      </Skeleton>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {loading && (
        <BlurView
          intensity={100}
          tint='light'
          style={[{ paddingTop: insets.top }, styles.blurContainer]}
        >
          <ActivityIndicator size='large' color='black' />
          <Text style={styles.loadingText}>Loading...</Text>
        </BlurView>
      )}

      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSearch}>
          <Ionicons name='search' size={25} color='black' />
        </TouchableOpacity>

        <Text style={styles.title}>Home</Text>

        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Ionicons name='ellipsis-horizontal' size={25} color='black' />
        </TouchableOpacity>
      </View>

      <ScrollView>
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
          <CustomTextInput
            placeholder='Search...'
            onChangeText={setSearchText}
          />
        </Animated.View>

        <Carousel
          ref={carouselRef}
          width={width}
          height={width / 2}
          data={data}
          onProgressChange={progress}
          mode='parallax'
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
            parallaxAdjacentItemScale: 0.8,
          }}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <View style={{ width: '40%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  Special Offer
                </Text>
                <Text style={{ textAlign: 'left', paddingBottom: 10 }}>
                  Discount 25%
                </Text>
                <CustomButton
                  style={{ width: '55%', padding: 10, borderRadius: 20 }}
                  title='Order Now'
                  onPress={() => navigation.navigate('Products')}
                />
              </View>
              <View style={{ width: '60%' }}>
                <Image source={item.image} style={styles.image} />
              </View>
            </View>
          )}
        />

        <Pagination.Basic
          progress={progress}
          data={data}
          dotStyle={{
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: 50,
            width: 8,
            height: 8,
          }}
          containerStyle={{
            gap: 5,
            marginTop: 10,
            alignSelf: 'center',
          }}
          onPress={onPressPagination}
        />

        <Text style={styles.sectionTitle}>Top 5 products of Week</Text>

        <ScrollViewHorizontal
          data={top5Products}
          containerStyle={{ marginTop: 10 }}
          imageStyle={{ borderRadius: 15 }}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          priceStyle={{ color: '#54408C', fontSize: 12, fontWeight: 'bold' }}
          onPress={(item) => openModal(item)}
        />

        <ProductDetailsSheet
          ref={actionSheetRef}
          selectedProduct={selectedProduct}
        />

        <Text style={styles.sectionTitle}>Categorys</Text>

        <FlashList
          data={filteredCategories}
          numColumns={2}
          renderItem={showList}
          refreshing={refreshing}
          onRefresh={onRefresh}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
        />

        <Modal
          transparent
          visible={modalVisible}
          animationType='fade'
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' }}
            onPress={() => setModalVisible(false)}
          >
            <Pressable style={styles.dropdown} onPress={() => {}}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.dropdownItem}>Messages</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.dropdownItem}>Need Help?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.dropdownItem}>Feedback</Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  blurContainer: {
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  loadingText: {
    marginTop: 10,
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingVertical: 20,
  },
  title: { fontWeight: 'bold', fontSize: 20 },
  slide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E5E5E5',
    paddingLeft: 30,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  dropdown: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 160,
  },
  dropdownItem: {
    paddingVertical: 8,
    fontSize: 18,
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
});
