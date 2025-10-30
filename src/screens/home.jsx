import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import {
  Dimensions,
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
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductDetailsSheet from '../components/activeSheet';
import CustomButton from '../components/button';
import CustomTextInput from '../components/custom-text-input';
import ScrollViewHorizontal from '../components/scrollbar-horixental';

const { width } = Dimensions.get('window');

const data = [
  { id: 1, image: require('../../assets/slider1.png') },
  { id: 2, image: require('../../assets/slider2.png') },
  { id: 3, image: require('../../assets/slider3.png') },
];

const initialImages = [
  {
    id: '1',
    image: require('../../assets/slider1.png'),
    title: 'The Kite Runner',
    description:
      'A heartbreaking story of friendship and redemption set in Afghanistan.',
    price: '200.9$',
  },
  {
    id: '2',
    image: require('../../assets/slider1.png'),
    title: 'Atomic Habits',
    description:
      'A guide to building good habits and breaking bad ones through small changes.',
    price: '100.9$',
  },
  {
    id: '3',
    image: require('../../assets/slider1.png'),
    title: 'Rich Dad Poor Dad',
    description:
      'Lessons on financial independence and mindset from two contrasting father figures.',
    price: '20.1$',
  },
  {
    id: '4',
    image: require('../../assets/slider1.png'),
    title: 'Ikigai',
    description:
      'The Japanese secret to a long and happy life through purpose and balance.',
    price: '19.3$',
  },
];

const popularBrands = [
  {
    id: 1,
    image: require('../../assets/slider1.png'),
    title: 'Abdullah Ayaz',
  },
  {
    id: 2,
    image: require('../../assets/slider1.png'),
    title: 'Zaki',
  },
  {
    id: 3,
    image: require('../../assets/slider1.png'),
    title: 'Misbha',
  },
  {
    id: 4,
    image: require('../../assets/slider1.png'),
    title: 'Ammmar',
  },
];

const Home = () => {
  const navigation = useNavigation();
  const actionSheetRef = useRef(null);
  const ref = useRef(null);
  const progress = useSharedValue(0);
  const searchHeight = useSharedValue(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const openModal = (item) => {
    setSelectedProduct(item);
    actionSheetRef.current?.setModalVisible(true);
  };

  const onPressPagination = (index) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ count: index, animated: true });
    }
  };
  const toggleSearch = () => {
    searchHeight.value = searchHeight.value === 0 ? 60 : 0;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleSearch}>
            <Ionicons name='search' size={25} color='black' />
          </TouchableOpacity>
          <Text style={styles.title}>Home</Text>
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

        <Carousel
          ref={ref}
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

        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 20,
            paddingHorizontal: 20,
          }}
        >
          Top 5 products of Week
        </Text>

        <ScrollViewHorizontal
          data={initialImages}
          containerStyle={{ marginTop: 10 }}
          imageStyle={{ borderRadius: 15 }}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          priceStyle={{ color: '#54408C', fontSize: 12, fontWeight: 'bold' }}
          onPress={(item) => openModal(item)}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingTop: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Category</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Category')}>
            <Text
              style={{ fontSize: 18, fontWeight: 'bold', color: '#54408C' }}
            >
              See all
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollViewHorizontal
          data={popularBrands}
          containerStyle={{ marginTop: 10 }}
          imageStyle={{
            width: width / 3,
            height: width / 3,
            borderRadius: 100,
          }}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          priceStyle={{ color: '#A6A6A6', fontSize: 12, fontWeight: 'bold' }}
        />
      </ScrollView>
      <ProductDetailsSheet
        ref={actionSheetRef}
        selectedProduct={selectedProduct}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: { fontWeight: 'bold', fontSize: 20 },
  redDot: {
    position: 'absolute',
    right: 2,
    top: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
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
});
