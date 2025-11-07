import React from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { baseUrl } from '../apis/server';
import Skeleton from 'react-native-reanimated-skeleton';

const { width } = Dimensions.get('window');

const ScrollViewHorizontal = ({
  data = [],
  containerStyle,
  imageStyle,
  titleStyle,
  priceStyle,
  onPress,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.scrollContainer, containerStyle]}
    >
      {data.map((item, index) => (
        <Skeleton isLoading={true}>
          <TouchableOpacity
            key={item.id}
            style={[styles.card, index === 0 && { marginLeft: 20 }]}
            onPress={() => onPress?.(item)}
          >
            <Image
              source={{ uri: baseUrl + '/' + item.image }}
              style={[styles.image, imageStyle]}
              resizeMode='cover'
            />

            {item.name ? (
              <Text style={[styles.title, titleStyle]} numberOfLines={1}>
                {item.name}
              </Text>
            ) : null}

            {item.price ? (
              <Text style={[styles.price, priceStyle]} numberOfLines={1}>
                {item.price}
              </Text>
            ) : null}
          </TouchableOpacity>
        </Skeleton>
      ))}
    </ScrollView>
  );
};

export default ScrollViewHorizontal;

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 20,
  },
  card: {
    marginRight: 20,
  },
  image: {
    width: width / 3,
    height: width / 2.5,
    borderRadius: 100,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 14,
  },
  price: {
    color: 'gray',
    fontSize: 13,
    textAlign: 'left',
  },
});
