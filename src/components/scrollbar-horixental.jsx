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
        <TouchableOpacity
          key={item.id}
          style={[styles.card, index === 0 && { marginLeft: 20 }]}
          onPress={onPress}
        >
          <Image
            source={item.image}
            style={[styles.image, imageStyle]}
            resizeMode='cover'
          />

          {item.title ? (
            <Text style={[styles.title, titleStyle]} numberOfLines={1}>
              {item.title}
            </Text>
          ) : null}

          {item.price ? (
            <Text style={[styles.price, priceStyle]} numberOfLines={1}>
              {item.price}
            </Text>
          ) : null}
        </TouchableOpacity>
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
    borderRadius: 20,
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
