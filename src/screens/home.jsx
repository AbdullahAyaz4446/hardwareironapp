import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import CustomButton from '../components/button';
import ScrollViewHorizontal from '../components/scrollbar-horixental';
import CustomTextInput from '../components/custom-text-input';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const data = [
  { id: 1, image: require('../../assets/slider1.png') },
  { id: 2, image: require('../../assets/slider2.png') },
  { id: 3, image: require('../../assets/slider3.png') },
];

const popularImages = [
  {
    id: 1,
    image: require('../../assets/slider1.png'),
    title: 'The Kite Runner',
    price: '$14.99',
  },
  {
    id: 2,
    image: require('../../assets/slider1.png'),
    title: 'Atomic Habits',
    price: '$12.49',
  },
  {
    id: 3,
    image: require('../../assets/slider1.png'),
    title: 'Rich Dad Poor Dad',
    price: '$9.99',
  },
  {
    id: 4,
    image: require('../../assets/slider1.png'),
    title: 'Ikigai',
    price: '$10.99',
  },
];

const popularBrands = [
  {
    id: 1,
    image: require('../../assets/slider1.png'),
    title: 'Abdullah Ayaz',
    price: 'Coder',
  },
  {
    id: 2,
    image: require('../../assets/slider1.png'),
    title: 'Zaki',
    price: 'Coder',
  },
  {
    id: 3,
    image: require('../../assets/slider1.png'),
    title: 'Misbha',
    price: 'Backend',
  },
  {
    id: 4,
    image: require('../../assets/slider1.png'),
    title: 'Ammmar',
    price: 'Graphic Designer',
  },
];

const Home = () => {
  const navigation = useNavigation();
  const ref = useRef(null);
  const searchHeight = useSharedValue(0);
  const progress = useSharedValue(0);

  const translateY = useSharedValue(height);
  const isVisible = useSharedValue(false);

  const openModal = () => {
    isVisible.value = true;
    translateY.value = withTiming(0, { duration: 700 });
  };

  // const panGesture = Gesture.Pan()
  //   .activeOffsetY([-10, 10]) // iOS compatibility
  //   .failOffsetX([-10, 10]) // Prevent conflict with horizontal gestures
  //   .onStart(() => {
  //     translateY.value = translateY.value;
  //   })
  //   .onUpdate((e) => {
  //     if (e.translationY > 0) {
  //       translateY.value = e.translationY;
  //     }
  //   })
  //   .onEnd((e) => {
  //     if (e.translationY > height / 2) {
  //       translateY.value = withTiming(height, { duration: 300 }, (finished) => {
  //         if (finished) {
  //           isVisible.value = false;
  //         }
  //       });
  //     } else {
  //       translateY.value = withTiming(0, { duration: 300 });
  //     }
  //   });
  const panGesture = Gesture.Pan()
    .minDistance(5) // Minimum distance before gesture activates
    .activeOffsetY([-20, 20]) // Increase the activation range
    .onBegin(() => {
      translateY.value = translateY.value;
    })
    .onUpdate((e) => {
      if (e.translationY > -50) {
        translateY.value = Math.max(0, e.translationY);
      }
    })
    .onEnd((e) => {
      const shouldClose = e.translationY > 150 || e.velocityY > 500;

      if (shouldClose) {
        translateY.value = withTiming(height, { duration: 300 }, (finished) => {
          if (finished) {
            isVisible.value = false;
          }
        });
      } else {
        translateY.value = withTiming(0, { duration: 300 });
      }
    });

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    display: isVisible.value ? 'flex' : 'none',
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isVisible.value ? 1 : 0, { duration: 300 }),
    pointerEvents: isVisible.value ? 'auto' : 'none',
    display: isVisible.value ? 'flex' : 'none',
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(searchHeight.value, { duration: 300 }),
    opacity: withTiming(searchHeight.value > 0 ? 1 : 0, { duration: 300 }),
  }));

  const toggleSearch = () => {
    searchHeight.value = searchHeight.value === 0 ? 60 : 0;
  };

  const onPressPagination = (index) => {
    if (ref.current) {
      ref.current.scrollTo({
        count: index - progress.value,
        animated: true,
      });
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            <Text style={styles.title}>Home</Text>
            <TouchableOpacity>
              <View style={{ position: 'relative' }}>
                <Ionicons
                  name='notifications-outline'
                  size={25}
                  color='black'
                />
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
            <CustomTextInput placeholder='Search' />
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
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                    Special Offer
                  </Text>
                  <Text style={{ textAlign: 'left', paddingBottom: 10 }}>
                    Discount 25%
                  </Text>
                  <CustomButton
                    style={{ width: '50%', padding: 10, borderRadius: 20 }}
                    title='Order Now'
                  />
                </View>
                <Image source={item.image} style={styles.image} />
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
            data={popularImages}
            containerStyle={{ marginTop: 10 }}
            imageStyle={{ borderRadius: 15 }}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            priceStyle={{ color: '#54408C', fontSize: 12, fontWeight: 'bold' }}
            onPress={openModal}
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
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#54408C',
                }}
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

        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
            },
            backdropStyle,
          ]}
        ></Animated.View>

        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '100%',
                backgroundColor: '#fff',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 20,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                paddingTop: 40,
              },
              modalStyle,
            ]}
          >
            <View
              style={{
                width: 60, // Wider
                height: 6,
                backgroundColor: '#ccc',
                borderRadius: 5,
                marginBottom: 20,
                justifyContent: 'flex-end',
              }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#333',
                marginBottom: 20,
              }}
            >
              This is a simple modal 👋
            </Text>
          </Animated.View>
        </GestureDetector>
      </SafeAreaView>
    </GestureHandlerRootView>
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
  slide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E5E5E5',
    paddingLeft: 30,
    borderRadius: 20,
  },
  image: {
    width: width / 2.2,
    height: '100%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});
