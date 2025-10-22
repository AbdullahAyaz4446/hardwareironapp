import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const CustomButton = ({ style, title, onPress, textStyle, disable }) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: '#54408C',
          borderRadius: 12,
          marginBottom: 20,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disable}
    >
      <Text
        style={[
          { textAlign: 'center', fontSize: 16, color: 'white' },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
