import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const CustomTextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor='#A6A6A6'
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#0f0e10ff',
    paddingBottom: 6,
    fontWeight: 'bold',
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 14,
    padding: 15,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#F9F9F9',
  },
});
